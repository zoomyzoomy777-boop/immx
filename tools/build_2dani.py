"""Build the 2D Animation crowd data.

For every GIF under SRC this writes:
  2Dani/preview/<set>/<name>.webp        small animated WebP, cropped so the character's feet sit on the bottom edge
  2Dani/preview/<set>/<name>.still.webp  first frame of the preview
  2Dani/web/<set>/<name>.webp            the whole animation at 1/4 width and height, shown in the viewer
                                         instead of the original GIF
and writes 2Dani/gallery-data.js for 2danimation.html. The original GIFs are never modified.

Re-run after adding or removing GIFs (unchanged files are skipped):
    python tools/build_2dani.py
"""
import json
import pathlib
import sys
from concurrent.futures import ProcessPoolExecutor, as_completed

from PIL import Image, ImageSequence

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "2Dani" / "รวมงาน-20261015T041223Z-1-001" / "รวมงาน"
PREVIEW = ROOT / "2Dani" / "preview"
WEB = ROOT / "2Dani" / "web"
OUT = ROOT / "2Dani" / "gallery-data.js"
MAX_H, MAX_W = 140, 200  # preview box before cropping
PREVIEW_Q, PREVIEW_A = 50, 50
PREVIEW_STEPS = ((200, 4), (60, 3), (30, 2))  # (frames over, keep every Nth) for the small crowd previews
WEB_SCALE, WEB_Q, WEB_A, WEB_LONG = 1 / 4, 50, 60, 100  # viewer files longer than this keep every 2nd frame
GROUP_SCALE = {"cat": 1 / 2}  # extra shrink on top of WEB_SCALE and the preview box
BIG = 20 * 1024 * 1024   # files above this decode to GBs of frames, so few run at once

# Folder name -> display title.
GROUPS = {
    "cat": "Cat",
    "CTX": "CTX",
    "JMO": "JMO",
    "SJL": "SJL",
    "demo_game_fairy/hero": "Fairy Game · Hero",
    "demo_game_fairy/monster": "Fairy Game · Monster",
    "sound_loop": "Sound Loop",
    "intern": "Intern",
}


def save_anim(frames, durs, dest, quality, alpha):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if len(frames) > 1:
        frames[0].save(dest, "WEBP", save_all=True, append_images=frames[1:], duration=durs,
                       loop=0, quality=quality, alpha_quality=alpha, method=4, minimize_size=True)
    else:
        frames[0].save(dest, "WEBP", quality=quality, alpha_quality=alpha, method=6)


def thin(durs, step):
    """Durations after keeping every `step`-th frame; dropped frames' time goes to the kept one."""
    return [sum(durs[i:i + step]) for i in range(0, len(durs), step)]


def build(key, gif):
    gif = pathlib.Path(gif)
    anim = PREVIEW / key / (gif.stem + ".webp")
    still = PREVIEW / key / (gif.stem + ".still.webp")
    web = WEB / key / (gif.stem + ".webp")
    with Image.open(gif) as im:
        ow, oh = im.size
        n = getattr(im, "n_frames", 1)
        fstep = 2 if n > WEB_LONG else 1
        pstep = next((k for over, k in PREVIEW_STEPS if n > over), 1)
        k = GROUP_SCALE.get(key, 1)
        fsize = (max(1, round(ow * WEB_SCALE * k)), max(1, round(oh * WEB_SCALE * k)))
        s = min(1.0, MAX_H / oh, MAX_W / ow) * k
        psize = (max(1, round(ow * s)), max(1, round(oh * s)))
        fulls, previews, durs = [], [], []
        for i, fr in enumerate(ImageSequence.Iterator(im)):
            durs.append(fr.info.get("duration", 80) or 80)
            if i % fstep and i % pstep:
                continue
            rgba = fr.convert("RGBA")
            if i % fstep == 0:
                fulls.append(rgba.resize(fsize, Image.LANCZOS))
            if i % pstep == 0:
                previews.append(rgba.resize(psize, Image.LANCZOS))
            del rgba
    save_anim(fulls, thin(durs, fstep), web, WEB_Q, WEB_A)
    del fulls
    # union of every frame's opaque area, so the crop never clips a pose
    box = None
    for f in previews:
        b = f.getchannel("A").point(lambda a: 255 if a > 16 else 0).getbbox()
        if b:
            box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
    if box:
        previews = [f.crop(box) for f in previews]
    still.parent.mkdir(parents=True, exist_ok=True)
    previews[0].save(still, "WEBP", quality=70, alpha_quality=60, method=6)
    save_anim(previews, thin(durs, pstep), anim, PREVIEW_Q, PREVIEW_A)
    pw, ph = previews[0].size
    return {
        "name": gif.stem,
        "src": gif.relative_to(ROOT).as_posix(),
        "full": web.relative_to(ROOT).as_posix(),
        "anim": anim.relative_to(ROOT).as_posix(),
        "still": still.relative_to(ROOT).as_posix(),
        "w": ow, "h": oh, "fw": fsize[0], "fh": fsize[1], "pw": pw, "ph": ph, "k": k, "frames": len(durs),
        "size": gif.stat().st_size, "fsize": web.stat().st_size,
    }


def fresh(prev, gif):
    if not prev or "fw" not in prev or prev.get("k", 1) != GROUP_SCALE.get(prev["src"].split("/รวมงาน/", 1)[1].rsplit("/", 1)[0], 1):
        return False
    outs = [ROOT / prev[k] for k in ("full", "anim", "still")]
    return all(p.exists() and p.stat().st_mtime >= gif.stat().st_mtime for p in outs)


def main():
    old = {}
    if OUT.exists():
        txt = OUT.read_text(encoding="utf-8")
        for g in json.loads(txt[txt.index("["):txt.rindex("]") + 1]):
            for it in g["items"]:
                old[it["src"]] = it

    results, todo = {}, []
    for key in GROUPS:
        for gif in (SRC / key).glob("*.gif"):
            rel = gif.relative_to(ROOT).as_posix()
            if fresh(old.get(rel), gif):
                results[rel] = old[rel]
            else:
                todo.append((key, gif))
    print(f"{len(results)} up to date, {len(todo)} to build", flush=True)

    big = [t for t in todo if t[1].stat().st_size > BIG]
    small = [t for t in todo if t[1].stat().st_size <= BIG]
    with ProcessPoolExecutor(2) as bp, ProcessPoolExecutor(10) as sp:
        futs = {bp.submit(build, k, str(g)): (k, g) for k, g in big}
        futs.update({sp.submit(build, k, str(g)): (k, g) for k, g in small})
        for n, f in enumerate(as_completed(futs), 1):
            key, gif = futs[f]
            it = f.result()
            results[it["src"]] = it
            print(f"[{n}/{len(todo)}] {key}/{gif.name}  {mb(it['size'])} -> {mb(it['fsize'])}", flush=True)

    groups = []
    for key, title in GROUPS.items():
        items = sorted((it for it in results.values() if it["src"].split("/รวมงาน/", 1)[1].rsplit("/", 1)[0] == key),
                       key=lambda it: it["name"].lower())
        if items:
            groups.append({"id": key.replace("/", "-").lower(), "title": title, "items": items})
    OUT.write_text(
        "/* generated by tools/build_2dani.py — do not edit */\n"
        "window.ANI_GROUPS = " + json.dumps(groups, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8",
    )
    orig = sum(it["size"] for it in results.values())
    full = sum(it["fsize"] for it in results.values())
    print(f"\n{len(results)} GIFs in {len(groups)} groups -> {OUT}")
    print(f"originals {mb(orig)} -> web {mb(full)} ({full / orig:.0%})")


def mb(b):
    return f"{b / 1048576:.1f} MB"


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
