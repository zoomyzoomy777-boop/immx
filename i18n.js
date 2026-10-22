/* Language switcher (TH / EN / JP) shared by every page.
   Markup opts in with data-i18n="key" (sets innerHTML) and data-i18n-attr="alt:key;aria-label:key".
   Page scripts read strings with window.t(key, {vars}) and re-render on the 'langchange' event. */
(function(){
const DICT = {
  // shared
  'nav.work':       {en:'WORK', th:'ผลงาน', ja:'作品'},
  'nav.rnd':        {en:'R&amp;D', th:'R&amp;D', ja:'R&amp;D'},
  'nav.art':       {en:'ART', th:'งานศิลปะ', ja:'アート'},
  'nav.2d':         {en:'2D ANIMATION', th:'แอนิเมชัน 2D', ja:'2Dアニメーション'},
  'nav.contact':    {en:'CONTACT', th:'ติดต่อ', ja:'お問い合わせ'},
  'contact':        {en:'Contact', th:'ติดต่อ', ja:'お問い合わせ'},
  'lang.label':     {en:'Language', th:'ภาษา', ja:'言語'},

  // home
  'home.by':        {en:'by zoomyyz', th:'โดย zoomyyz', ja:'zoomyyz 作'},
  'home.about':     {en:'We are a new media developer,<br class="br"> creating <em>innovative experiences</em> that redefine<br class="br"> how audiences engage with content.',
                     th:'เราคือผู้พัฒนาสื่อรูปแบบใหม่<br class="br"> ที่สร้างสรรค์<em>ประสบการณ์แปลกใหม่</em><br class="br"> เพื่อเปลี่ยนวิธีที่ผู้ชมมีส่วนร่วมกับคอนเทนต์',
                     ja:'私たちはニューメディアの開発スタジオです。<br class="br">観客とコンテンツの関わり方を塗り替える<br class="br"><em>革新的な体験</em>をつくっています。'},
  'home.kicker':    {en:'Have a world in mind?', th:'มีโลกในจินตนาการอยู่แล้วใช่ไหม?', ja:'描きたい世界はありますか？'},
  'home.cta':       {en:'Let\'s build<br>it together.', th:'มาสร้างมัน<br>ไปด้วยกัน', ja:'一緒に<br>つくりましょう。'},
  'home.studio':    {en:'Studio', th:'สตูดิโอ', ja:'スタジオ'},
  'home.about.link':{en:'About', th:'เกี่ยวกับเรา', ja:'私たちについて'},
  'home.careers':   {en:'Careers', th:'ร่วมงานกับเรา', ja:'採用情報'},
  'home.location':  {en:'Location', th:'ที่ตั้ง', ja:'所在地'},
  'home.city':      {en:'Bangkok, Thailand<br>GMT+7', th:'กรุงเทพฯ ประเทศไทย<br>GMT+7', ja:'タイ・バンコク<br>GMT+7'},
  'home.newproj':   {en:'New projects', th:'โปรเจกต์ใหม่', ja:'新規プロジェクト'},
  'home.copy':      {en:'Copy email', th:'คัดลอกอีเมล', ja:'メールをコピー'},
  'home.copied':    {en:'Copied', th:'คัดลอกแล้ว', ja:'コピーしました'},
  'detail.all':     {en:'← All work', th:'← ผลงานทั้งหมด', ja:'← すべての作品'},
  'detail.next':    {en:'Next project', th:'โปรเจกต์ถัดไป', ja:'次のプロジェクト'},
  'detail.frame':   {en:'{title} frame {n}', th:'{title} ภาพที่ {n}', ja:'{title} フレーム {n}'},

  // case-study facts (home detail + Memories of Sacrifice)
  'fact.project':   {en:'Project', th:'โปรเจกต์', ja:'プロジェクト'},
  'fact.year':      {en:'Year', th:'ปี', ja:'年'},
  'fact.format':    {en:'Format', th:'รูปแบบ', ja:'形式'},
  'fact.engine':    {en:'Engine', th:'เอนจิน', ja:'エンジン'},
  'fact.role':      {en:'Our role', th:'บทบาทของเรา', ja:'担当'},

  // Memories of Sacrifice
  'mos.home':       {en:'← Home', th:'← หน้าแรก', ja:'← ホーム'},
  'mos.format':     {en:'Interactive Mapping', th:'อินเทอร์แอคทีฟแมปปิง', ja:'インタラクティブ・マッピング'},
  'mos.quote':      {en:'“We are one with all things, between the end and the beginning.”',
                     th:'“เราคือหนึ่งเดียวกับสรรพสิ่ง ท่ามกลางจุดจบและจุดเริ่มต้น”',
                     ja:'「私たちは万物とひとつ。終わりと始まりのはざまで。」'},
  'mos.scroll':     {en:'Scroll', th:'เลื่อน', ja:'スクロール'},
  'mos.role':       {en:'Concept, 3D, Rigging, Animation, Unreal', th:'คอนเซปต์, 3D, ริกกิ้ง, แอนิเมชัน, Unreal', ja:'コンセプト、3D、リギング、アニメーション、Unreal'},
  'mos.lead':       {en:'How did this project come about? Much like watching this world drift slowly onward for a very long time, from the past to the present.',
                     th:'หากถามว่าโปรเจ็คนี้เกิดขึ้นได้อย่างไร คงคล้ายกับการที่เราเฝ้ามองโลกใบนี้เคลื่อนตัวไปอย่างช้า ๆ มาเป็นเวลาเนิ่นนาน ตั้งแต่อดีตจนถึงปัจจุบัน',
                     ja:'このプロジェクトはどう生まれたのか。それは、過去から現在まで、長いあいだ世界がゆっくりと動いていくのを見つめてきたことに似ています。'},
  'mos.p1':         {en:'That sparked the idea we wanted to express through the fury of nature, the forest, and all the things that reflect the story of nature and humankind, seen through the eyes of a visitor.',
                     th:'จนจุดประกายความคิดสร้างสรรค์ที่เราอยากถ่ายทอดผ่านความเกรี้ยวกราดของธรรมชาติ ผืนป่า รวมถึงสรรพสิ่งที่คอยสะท้อนเรื่องราวของธรรมชาติกับมนุษย์ในมุมมองผู้มาเยือน',
                     ja:'その思いが、自然の猛威や森、そして自然と人間の物語を映し出す万物を、訪れる者の視点から描きたいという創作の火種になりました。'},
  'mos.p2':         {en:'A spirit zoo where a deer watches in silence: a symbol of death, loneliness and an attachment that never ends. It cannot speak or act. It can only watch, the way the forest and everything in it seems to watch us back.',
                     th:'สวนสัตว์แห่งวิญญาณที่กวางตัวหนึ่งเฝ้ามองอย่างเงียบงัน สัญลักษณ์แห่งความตาย ความโดดเดี่ยว และความผูกพันที่ไม่มีวันสิ้นสุด มันพูดหรือทำสิ่งใดไม่ได้ ทำได้เพียงเฝ้ามอง ดั่งที่ผืนป่าและสรรพสิ่งในนั้นเฝ้ามองเรากลับมา',
                     ja:'鹿が静かに見つめる精霊の動物園。死と孤独、そして終わることのない執着の象徴。鹿は話すことも動くこともできず、ただ見つめるだけ。森とそこに生きるすべてが、私たちを見つめ返すように。'},
  'mos.world':      {en:'The World', th:'โลกของเรื่อง', ja:'世界観'},
  'mos.world.p':    {en:'A cornfield at night, lanterns hung along the path, a campfire and bones left behind, all built in Unreal Engine.',
                     th:'ทุ่งข้าวโพดยามค่ำคืน ตะเกียงที่แขวนเรียงตามทาง กองไฟ และกระดูกที่ถูกทิ้งไว้ สร้างขึ้นทั้งหมดใน Unreal Engine',
                     ja:'夜のトウモロコシ畑、道沿いに吊るされたランタン、焚き火、そして置き去りにされた骨。すべて Unreal Engine で制作しました。'},
  'mos.cap.path':   {en:'The path', th:'เส้นทาง', ja:'小道'},
  'mos.cap.totem':  {en:'Totem', th:'โทเท็ม', ja:'トーテム'},
  'mos.cap.fire':   {en:'The fire', th:'กองไฟ', ja:'焚き火'},
  'mos.cap.found':  {en:'Found footage', th:'ฟุตเทจที่พบ', ja:'ファウンド・フッテージ'},
  'mos.cap.remains':{en:'Remains', th:'ซากที่หลงเหลือ', ja:'遺骸'},
  'mos.cap.offer':  {en:'Offering', th:'เครื่องเซ่น', ja:'供物'},
  'mos.cap.watcher':{en:'The watcher', th:'ผู้เฝ้ามอง', ja:'見つめる者'},
  'mos.cap.harvest':{en:'Harvest', th:'ฤดูเก็บเกี่ยว', ja:'収穫'},
  'mos.alt.lanterns':  {en:'Lantern-lit path through the cornfield at night', th:'ทางเดินที่ตะเกียงส่องสว่างผ่านทุ่งข้าวโพดยามค่ำคืน', ja:'夜のトウモロコシ畑を抜ける、ランタンに照らされた小道'},
  'mos.alt.skullpost': {en:'Antlered skull mounted on a post in the corn', th:'กะโหลกมีเขาที่ติดอยู่บนเสากลางทุ่งข้าวโพด', ja:'トウモロコシ畑の杭に掲げられた角のある頭蓋骨'},
  'mos.alt.fire':      {en:'Campfire with rising smoke and sparks', th:'กองไฟที่มีควันและประกายไฟลอยขึ้น', ja:'煙と火の粉が立ちのぼる焚き火'},
  'mos.alt.crate':     {en:'Wooden crate caught in a flashlight beam', th:'ลังไม้ที่ต้องแสงไฟฉาย', ja:'懐中電灯の光に照らされた木箱'},
  'mos.alt.bones':     {en:'Crate filled with bones under a flashlight', th:'ลังที่เต็มไปด้วยกระดูกใต้แสงไฟฉาย', ja:'懐中電灯に照らされた、骨でいっぱいの木箱'},
  'mos.alt.skullstar': {en:'Ram skull nailed to a wooden star', th:'กะโหลกแกะที่ถูกตอกติดกับดาวไม้', ja:'木の星に打ちつけられた羊の頭蓋骨'},
  'mos.alt.forest':    {en:'Skeletal deer standing in a misty forest', th:'กวางโครงกระดูกยืนอยู่ในป่าหมอก', ja:'霧の森に佇む骨の鹿'},
  'mos.alt.corn':      {en:'Bones and a watering can at the foot of a post in the corn', th:'กระดูกและบัวรดน้ำที่โคนเสากลางทุ่งข้าวโพด', ja:'トウモロコシ畑の杭の根元に置かれた骨とじょうろ'},
  'mos.anim':       {en:'Bringing the deer to life', th:'ปลุกชีวิตให้กวาง', ja:'鹿に命を吹き込む'},
  'mos.anim.p':     {en:'We used AI to pull existing animation assets together and blend them, so the deer feels alive.',
                     th:'ใช้ AI ดึง animation assets ที่มีอยู่มาผสมกัน (blend) เพื่อให้ตัวละครกวางดูมีชีวิต',
                     ja:'既存のアニメーション素材を AI で組み合わせてブレンドし、鹿のキャラクターに生命感を与えました。'},
  'mos.shatter.alt':{en:'Point-cloud deer shattering and falling to the ground', th:'กวางที่ทำจาก point cloud แตกเป็นชิ้นและร่วงลงพื้น', ja:'砕けて地面に崩れ落ちるポイントクラウドの鹿'},
  'mos.shatter.p':  {en:'A physics simulation of an animal model (the deer) made from a point cloud, slowly breaking apart and falling to the ground, shown as a sequence of frames over time.',
                     th:'ผลการจำลองฟิสิกส์ของโมเดลสัตว์ (กวาง) ที่ทำจาก point cloud ซึ่งค่อย ๆ แตกเป็นชิ้นแล้วร่วงลงพื้น แสดงเป็นลำดับเฟรมตามเวลา',
                     ja:'ポイントクラウドで作られた動物モデル（鹿）が少しずつ砕け、地面へ崩れ落ちていく物理シミュレーション。時間順のフレームとして表示しています。'},
  'mos.shatter.tag':{en:'Physics simulation · 15s', th:'การจำลองฟิสิกส์ · 15 วินาที', ja:'物理シミュレーション · 15秒'},
  'mos.blend.tag':  {en:'Unreal · Blend test', th:'Unreal · ทดสอบการเบลนด์', ja:'Unreal · ブレンドテスト'},
  'mos.blend.alt':  {en:'Animation blend test of the skeletal deer in Unreal Engine', th:'การทดสอบเบลนด์แอนิเมชันของกวางโครงกระดูกใน Unreal Engine', ja:'Unreal Engine での骨の鹿のアニメーションブレンドテスト'},
  'mos.blend.cap':  {en:'AI-assisted blending of existing animation assets', th:'การเบลนด์ animation assets ที่มีอยู่ด้วย AI', ja:'AI を活用した既存アニメーション素材のブレンド'},
  'mos.rig.tag':    {en:'Rig', th:'ริก', ja:'リグ'},
  'mos.rig.alt':    {en:'Deer skeleton rig, side and front views', th:'ริกโครงกระดูกกวาง มุมข้างและมุมหน้า', ja:'鹿の骨格リグ（側面・正面）'},
  'mos.rig.cap':    {en:'Quadruped rig, side and front', th:'ริกสัตว์สี่ขา มุมข้างและมุมหน้า', ja:'四足歩行リグ（側面・正面）'},
  'mos.rig.kind':   {en:'Rigging', th:'ริกกิ้ง', ja:'リギング'},
  'mos.poses':      {en:'Pose library · drag to scroll', th:'คลังท่าทาง · ลากเพื่อเลื่อน', ja:'ポーズライブラリ · ドラッグでスクロール'},
  'mos.poses.left': {en:'Scroll poses left', th:'เลื่อนท่าทางไปทางซ้าย', ja:'ポーズを左へスクロール'},
  'mos.poses.right':{en:'Scroll poses right', th:'เลื่อนท่าทางไปทางขวา', ja:'ポーズを右へスクロール'},
  'mos.ident.p':    {en:'Logo explorations, and posters for both the pre-promote and post-promote phases.',
                     th:'สำรวจโลโก้หลายแบบ และโปสเตอร์ทั้งช่วง pre-promote และ post-promote',
                     ja:'さまざまなロゴの検討と、プレ／ポスト両プロモーション期間のポスター。'},
  'mos.logo':       {en:'Logo', th:'โลโก้', ja:'ロゴ'},
  'mos.logo.alt':   {en:'Logo explorations for Memories of Sacrifice', th:'การสำรวจโลโก้หลายแบบของ Memories of Sacrifice', ja:'Memories of Sacrifice のロゴ案'},
  'mos.posters':    {en:'Posters', th:'โปสเตอร์', ja:'ポスター'},
  'mos.posters.alt':{en:'Pre-promote and post-promote posters', th:'โปสเตอร์ช่วง pre-promote และ post-promote', ja:'プレプロモーションとポストプロモーションのポスター'},
  'mos.credits':    {en:'Credits', th:'เครดิต', ja:'クレジット'},
  'mos.team':       {en:'Team Members', th:'ทีมงาน', ja:'チームメンバー'},
  'mos.next':       {en:'Next', th:'ถัดไป', ja:'次へ'},
  'mos.next.title': {en:'2D Animation →', th:'แอนิเมชัน 2D →', ja:'2Dアニメーション →'},

  // 2D animation
  '2d.title':       {en:'2D <em>ANIMATION</em>', th:'แอนิเมชัน <em>2D</em>', ja:'2D<em>アニメーション</em>'},
  '2d.intro':       {en:'Every character from our 2D team, standing together. Hover to meet one, click to watch the full loop.',
                     th:'ตัวละครทุกตัวจากทีม 2D ของเรามายืนรวมกันที่นี่ ชี้เมาส์เพื่อทำความรู้จัก คลิกเพื่อดูลูปแบบเต็ม',
                     ja:'2D チームのキャラクターが勢ぞろい。カーソルを合わせて出会い、クリックでループ全体を再生できます。'},
  '2d.chars':       {en:'{n} characters', th:'ตัวละคร {n} ตัว', ja:'{n} キャラクター'},
  '2d.sets':        {en:'{n} sets', th:'{n} ชุด', ja:'{n} セット'},
  '2d.highlight':   {en:'Highlight', th:'ไฮไลต์', ja:'ハイライト'},
  '2d.everyone':    {en:'Everyone', th:'ทั้งหมด', ja:'すべて'},
  '2d.waking':      {en:'Waking up {done}/{total}', th:'กำลังปลุก {done}/{total}', ja:'起動中 {done}/{total}'},
  '2d.loading':     {en:'Loading · ', th:'กำลังโหลด · ', ja:'読み込み中 · '},
  '2d.hint':        {en:'← → to browse · Esc to close', th:'← → เพื่อเลื่อนดู · Esc เพื่อปิด', ja:'← → で切り替え · Esc で閉じる'},
  '2d.back':        {en:'← Back to Immertech X', th:'← กลับสู่ Immertech X', ja:'← Immertech X に戻る'},
  '2d.open':        {en:'{name}, {group}. Open full animation', th:'{name}, {group} เปิดแอนิเมชันแบบเต็ม', ja:'{name}、{group}。アニメーション全体を開く'},
  '2d.close':       {en:'Close', th:'ปิด', ja:'閉じる'},
  '2d.prev':        {en:'Previous', th:'ก่อนหน้า', ja:'前へ'},
  '2d.next':        {en:'Next', th:'ถัดไป', ja:'次へ'},
  // R&D
  'art.kicker':     {en:'Drawings &amp; Paintings', th:'ภาพวาดและงานเพนต์', ja:'ドローイングとペインティング'},
  'art.title':      {en:'Pieces drawn by hand,<br>between the pixels.', th:'งานที่วาดด้วยมือ<br>ระหว่างพิกเซล', ja:'ピクセルの合間に<br>手で描いた作品。'},
  'art.lede':       {en:'Drawings and paintings first shared on Instagram. Click a piece to see it full size.', th:'ภาพวาดและงานเพนต์ที่เคยลงใน Instagram กดที่รูปเพื่อดูขนาดเต็ม', ja:'Instagram で公開したドローイングとペインティング。クリックすると原寸で見られます。'},
  'art.cta':        {en:'View the gallery', th:'ดูแกลเลอรี', ja:'ギャラリーを見る'},
  'art.from':       {en:'From Instagram', th:'จาก Instagram', ja:'Instagram より'},
  'art.h2':         {en:'Gallery', th:'แกลเลอรี', ja:'ギャラリー'},
  'art.painting':   {en:'Painting', th:'ภาพเพนต์', ja:'ペインティング'},
  'art.drawing':    {en:'Drawing', th:'ภาพวาด', ja:'ドローイング'},
  'art.process':    {en:'▶ Process', th:'▶ ขั้นตอนการวาด', ja:'▶ 制作過程'},
  'art.video':      {en:'▶ Video', th:'▶ วิดีโอ', ja:'▶ 動画'},
  'art.more':       {en:'More on Instagram ↗', th:'ดูเพิ่มเติมใน Instagram ↗', ja:'Instagram でもっと見る ↗'},
  'art.all':        {en:'All', th:'ทั้งหมด', ja:'すべて'},
  'art.paintings':  {en:'Paintings', th:'ภาพเพนต์', ja:'ペインティング'},
  'art.drawings':   {en:'Drawings', th:'ภาพวาด', ja:'ドローイング'},
  'art.works':      {en:'works', th:'ชิ้น', ja:'点'},
  'art.hint':       {en:'Click the piece to see it full size', th:'กดที่รูปเพื่อดูขนาดเต็ม', ja:'クリックで原寸表示'},
  'rnd.kicker':     {en:'Research &amp; Development', th:'งานวิจัยและพัฒนา', ja:'研究開発'},
  'rnd.title':      {en:'Experiments, prototypes<br>and side projects.', th:'งานทดลอง ต้นแบบ<br>และโปรเจกต์เสริม', ja:'実験、プロトタイプ<br>そしてサイドプロジェクト。'},
  'rnd.lede':       {en:'Web builds I make to test ideas: games, studio sites and interactive showcases. Each one opens live in a new tab.', th:'เว็บที่ทำขึ้นเพื่อทดลองไอเดีย ทั้งเกม เว็บสตูดิโอ และโชว์เคสแบบอินเทอร์แอคทีฟ กดเพื่อเปิดของจริงในแท็บใหม่', ja:'アイデアを試すために作ったウェブ作品。ゲーム、スタジオサイト、インタラクティブなショーケース。クリックすると新しいタブで開きます。'},
  'rnd.open':       {en:'Open site', th:'เปิดเว็บ', ja:'サイトを開く'},
  'rnd.mos':        {en:'A spirit zoo built in Unreal Engine, where a skeletal deer watches in silence. Full case study: concept, world, animation and point-cloud simulation.', th:'สวนสัตว์แห่งวิญญาณที่สร้างใน Unreal Engine มีกวางโครงกระดูกเฝ้ามองอยู่อย่างเงียบงัน ดูเคสสตัดี้เต็ม ทั้งคอนเซปต์ โลก แอนิเมชัน และการจำลองพอยต์คลาวด์', ja:'Unreal Engine で作った魂の動物園。骸骨の鹿が静かに見守る。コンセプト、世界、アニメーション、点群シミュレーションまでのケーススタディ。'},
  'rnd.poring':     {en:'Browser auto-battler with Ragnarok Online monsters. Build a team, stack synergies, outlast seven rivals. Educational project.', th:'เกม Auto Battler บนเบราว์เซอร์ ใช้มอนสเตอร์จาก Ragnarok Online จัดทีม สะสมซินเนอร์จี และเอาชนะคู่แข่งอีกเจ็ดคน ทำเพื่อการศึกษา', ja:'ラグナロクオンラインのモンスターで戦うブラウザ版オートバトラー。チームを組み、シナジーを重ね、7人のライバルに勝ち残る。学習用プロジェクト。'},
  'rnd.poring.type':{en:'Game', th:'เกม', ja:'ゲーム'},
  'rnd.immx':       {en:'Portfolio site for Immertech X, with work, 2D animation and contact pages in three languages.', th:'เว็บพอร์ตโฟลิโอของ Immertech X มีหน้าผลงาน แอนิเมชัน 2D และติดต่อ รองรับสามภาษา', ja:'Immertech X のポートフォリオサイト。作品、2Dアニメーション、お問い合わせを3言語で。'},
  'rnd.immx.type':  {en:'Website', th:'เว็บไซต์', ja:'ウェブサイト'},
  'rnd.gfp':        {en:'Studio site for GoldenFryingPan: a cinematic golden landing page and home of its games.', th:'เว็บสตูดิโอ GoldenFryingPan หน้าแรกสีทองสไตล์ภาพยนตร์ และเป็นบ้านของเกมในสตูดิโอ', ja:'GoldenFryingPan のスタジオサイト。金色のシネマティックなトップページと、ゲームの拠点。'},
  'rnd.gfp.type':   {en:'Studio site', th:'เว็บสตูดิโอ', ja:'スタジオサイト'},
  'rnd.realbkk':    {en:'Virtual production showcase for REAL Bangkok: LED volume, in-camera VFX, music videos, ads and live shows, with behind-the-scenes shots.', th:'โชว์เคส Virtual Production ของ REAL Bangkok ทั้ง LED Volume, In-Camera VFX, มิวสิกวิดีโอ โฆษณา และไลฟ์ พร้อมภาพเบื้องหลัง', ja:'REAL Bangkok のバーチャルプロダクション紹介。LEDボリューム、インカメラVFX、MV、広告、ライブ、そして舞台裏。'},
  'rnd.realbkk.type':{en:'Showcase', th:'โชว์เคส', ja:'ショーケース'},
  'rnd.trail':      {en:'WebGL particles that trail the mouse, with live controls and a built-in recorder that exports clean video for compositing.', th:'พาร์ติเคิล WebGL ที่วิ่งตามเมาส์ ปรับแต่งได้สด ๆ และมีตัวบันทึกจอในตัว ส่งออกวิดีโอไปทำ Composite ต่อได้เลย', ja:'マウスを追いかける WebGL パーティクル。ライブで調整でき、コンポジット用の映像をそのまま書き出せる録画機能つき。'},
  'rnd.trail.type': {en:'Tool', th:'เครื่องมือ', ja:'ツール'},

  // particle trail tool
  'pt.back':        {en:'← R&amp;D', th:'← R&amp;D', ja:'← R&amp;D'},
  'pt.hint':        {en:'Move to draw · <kbd>R</kbd> record · <kbd>H</kbd> hide panel · <kbd>C</kbd> clear', th:'ขยับเมาส์เพื่อวาด · <kbd>R</kbd> อัด · <kbd>H</kbd> ซ่อนแผง · <kbd>C</kbd> ล้าง', ja:'動かして描く · <kbd>R</kbd> 録画 · <kbd>H</kbd> パネル非表示 · <kbd>C</kbd> クリア'},
  'pt.start':       {en:'Start recording', th:'เริ่มอัดวิดีโอ', ja:'録画開始'},
  'pt.stop':        {en:'Stop &amp; save', th:'หยุดและบันทึก', ja:'停止して保存'},
  'pt.cancel':      {en:'Cancel countdown', th:'ยกเลิกนับถอยหลัง', ja:'カウントダウン中止'},
  'pt.saved':       {en:'Video saved', th:'บันทึกวิดีโอแล้ว', ja:'動画を保存しました'},
  'pt.norec':       {en:'This browser cannot record the canvas. Try Chrome or Edge.', th:'เบราว์เซอร์นี้อัดแคนวาสไม่ได้ ลองใช้ Chrome หรือ Edge', ja:'このブラウザでは録画できません。Chrome か Edge をお試しください。'},
};

const LANGS = [['th','TH','ไทย'], ['en','EN','English'], ['ja','JP','日本語']];
const CODES = LANGS.map(l => l[0]);
const KEY = 'immx-lang';

function initial(){
  const q = new URLSearchParams(location.search).get('lang');
  if (CODES.includes(q)) return q;
  try { const s = localStorage.getItem(KEY); if (CODES.includes(s)) return s; } catch(e){}
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return CODES.includes(nav) ? nav : 'en';
}
let lang = initial();

function t(key, vars){
  const e = DICT[key];
  let s = e ? (e[lang] ?? e.en) : key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => k in vars ? vars[k] : m);
  return s;
}

function apply(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
  if (sw) {
    sw.btn.textContent = LANGS.find(l => l[0] === lang)[1];
    sw.btn.setAttribute('aria-label', t('lang.label'));
    sw.items.forEach(b => b.setAttribute('aria-checked', b.dataset.lang === lang));
  }
}

function setLang(l){
  if (!CODES.includes(l) || l === lang) return;
  lang = l;
  try { localStorage.setItem(KEY, l); } catch(e){}
  apply();
  dispatchEvent(new CustomEvent('langchange', {detail: {lang}}));
}

/* ---------- styles + fonts for Thai and Japanese ---------- */
const font = document.createElement('link');
font.rel = 'stylesheet';
font.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500&family=Noto+Sans+JP:wght@300;400;500&display=swap';
document.head.appendChild(font);

const css = document.createElement('style');
css.textContent = `
:root{--display:"Michroma","Technovier","Archivo","Noto Sans Thai","Noto Sans JP",system-ui,sans-serif;--body:"Archivo","Noto Sans Thai","Noto Sans JP",system-ui,sans-serif;--mono:"JetBrains Mono","Noto Sans Thai","Noto Sans JP",ui-monospace,Menlo,monospace}
html:lang(th) .mono,html:lang(ja) .mono,html:lang(th) .nav ul a,html:lang(ja) .nav ul a{letter-spacing:.04em}
html:lang(ja){line-break:strict;word-break:auto-phrase}
.nav{gap:16px}
.nav ul{margin-left:auto}
.nav ul a{white-space:nowrap}
.lang{position:relative;flex:none}
.lang > button{display:flex;align-items:center;gap:6px;background:none;border:1px solid var(--line,rgba(255,255,255,.14));border-radius:999px;color:var(--fg,#fff);font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.1em;padding:5px 10px;cursor:pointer;transition:border-color .25s}
.lang > button::after{content:"";width:5px;height:5px;border:solid currentColor;border-width:0 1px 1px 0;transform:translateY(-2px) rotate(45deg);opacity:.7}
.lang > button:hover,.lang > button[aria-expanded="true"]{border-color:var(--magenta,#4cff16)}
.lang ul{position:absolute;right:0;top:calc(100% + 8px);margin:0;padding:4px;list-style:none;display:none;min-width:130px;background:rgba(8,3,20,.96);border:1px solid var(--line,rgba(255,255,255,.14));border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.6)}
.lang ul.open{display:grid}
.lang li button{width:100%;display:flex;justify-content:space-between;gap:12px;background:none;border:0;border-radius:5px;color:var(--fg,#fff);padding:8px 10px;cursor:pointer;font-family:"Archivo","Noto Sans Thai","Noto Sans JP",system-ui,sans-serif;font-size:14px;text-align:left}
.lang li button span{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10px;letter-spacing:.1em;color:var(--muted,#a59cc4)}
.lang li button:hover,.lang li button:focus-visible{background:rgba(255,255,255,.08)}
.lang li button[aria-checked="true"]{color:var(--magenta,#4cff16)}
@media (max-width:520px){.nav{gap:10px}.nav ul{gap:12px}.nav ul a{letter-spacing:.04em}.lang > button{padding:4px 8px;font-size:10px}}
@media (max-width:400px){.nav .brand img{height:30px}.nav ul{gap:10px}.nav ul a{font-size:9px}}
`;
document.head.appendChild(css);

/* ---------- switcher in the nav ---------- */
let sw = null;
const navEl = document.querySelector('.nav');
if (navEl) {
  const wrap = document.createElement('div');
  wrap.className = 'lang';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'true');
  btn.setAttribute('aria-expanded', 'false');
  const menu = document.createElement('ul');
  menu.setAttribute('role', 'menu');
  const items = LANGS.map(([code, short, name]) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'none');
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'menuitemradio');
    b.dataset.lang = code;
    b.lang = code;
    b.innerHTML = `${name}<span>${short}</span>`;
    b.addEventListener('click', () => { setLang(code); close(); btn.focus(); });
    li.appendChild(b); menu.appendChild(li);
    return b;
  });
  const open = () => { menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); (items.find(b => b.dataset.lang === lang) || items[0]).focus(); };
  const close = () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
  menu.addEventListener('keydown', e => {
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    else if (e.key === 'Escape') { close(); btn.focus(); }
  });
  addEventListener('click', e => { if (!wrap.contains(e.target)) close(); });
  wrap.append(btn, menu);
  navEl.appendChild(wrap);
  sw = {btn, items};
}

window.t = t;
window.i18n = {t, setLang, get lang(){ return lang; }};
apply();
})();
