// =========================================================================
// 寫實人生模擬器：四大國度深度獨立一生 · 因果動態命運結算版
// =========================================================================

// 1. 出生國度庫（SVG 高解析旗幟）
const birthCountries = [
  {
    id: 'hk',
    flagUrl: 'https://flagcdn.com/w80/hk.png',
    name: '中國香港',
    desc: '霓虹都市、屋邨人情、名校補習街、茶餐廳煙火氣與現實階級。',
    stats: { money: 10, eq: 8, health: 60, happiness: 55, intellect: 50 },
    timelineId: 'hk_timeline'
  },
  {
    id: 'jp',
    flagUrl: 'https://flagcdn.com/w80/jp.png',
    name: '日本東京',
    desc: '少子化與工匠精神，部活朝練、311地震震撼與就活西裝海。',
    stats: { money: 15, eq: 10, health: 65, happiness: 50, intellect: 50 },
    timelineId: 'jp_timeline'
  },
  {
    id: 'uk',
    flagUrl: 'https://flagcdn.com/w80/gb.png',
    name: '英國倫敦',
    desc: '陰雨下午茶與獨立搖滾，脫歐大分裂、Pub文化與鄉間莊園。',
    stats: { money: 20, eq: 6, health: 58, happiness: 58, intellect: 52 },
    timelineId: 'uk_timeline'
  },
  {
    id: 'in',
    flagUrl: 'https://flagcdn.com/w80/in.png',
    name: '印度班加羅爾',
    desc: '軟體矽谷與宗族大家庭，街頭板球、地獄JEE理工大考與廢鈔浪潮。',
    stats: { money: 5, eq: 12, health: 62, happiness: 60, intellect: 55 },
    timelineId: 'in_timeline'
  }
];

// 2. 原生家庭階級庫
const familyBackgrounds = [
  { id: 'working', name: '市井工薪家庭', desc: '生活節儉樸實，磨練出極強的適應力與求生智慧。', stats: { health: 6, eq: 8, money: 5 } },
  { id: 'middle', name: '書香中產家庭', desc: '注重教育與才藝，穩定但背負同儕競爭壓力。', stats: { intellect: 10, money: 20, happiness: 5 } },
  { id: 'merchant', name: '經商實業世家', desc: '自幼耳濡目染商場買賣，資金充裕但風險共擔。', stats: { money: 40, intellect: 6, health: -6 } }
];

// 3. 核心天賦庫
const allPerks = [
  { id: 'geek', icon: '🧠', name: '邏輯極客', desc: '智力+15。對代碼與演算法極度敏銳，解鎖前沿科技專屬路線。', stats: { intellect: 15 } },
  { id: 'music', icon: '🎸', name: '絕對音感', desc: '情商+10、幸福+10。天生旋律直覺，解鎖原創音樂專屬路線。', stats: { eq: 10, happiness: 10 } },
  { id: 'leader', icon: '🤝', name: '天生領袖', desc: '情商+15、資產+5。人脈與領導氣場強大，解鎖早期合夥創業路線。', stats: { eq: 15, money: 5 } },
  { id: 'iron', icon: '🏃', name: '鋼鐵體魄', desc: '健康+25。天生抗病抗壓，極度耐操，大幅延長預期壽命。', stats: { health: 25 } },
  { id: 'wealth', icon: '💎', name: '商道敏銳', desc: '資產+20、智力+5。早期資本嗅覺充沛，解鎖頂尖投資賽道。', stats: { money: 20, intellect: 5 } },
  { id: 'zen', icon: '🕊️', name: '通透心境', desc: '幸福+20、健康+5。看淡內耗與世俗焦慮，逆境中自動守護心靈自由。', stats: { happiness: 20, health: 5 } }
];

// 4. 四大國度完全獨立的完整一生劇情樹（由生到死）
const nationTimelines = {
  // =========================================================================
  // 🇭🇰 中國香港主線
  // =========================================================================
  'hk_timeline': {
    startEvent: 'hk_3',
    events: {
      'hk_3': {
        year: 2003, age: 3, stage: '幼兒啟蒙', isHistoryCrisis: false,
        title: '【2003年 · 3歲】屋邨長走廊與滴露氣息',
        desc: '全港幼稚園停課，長輩每日用滴露抹閘門。你在狹窄的屋邨客廳地墊上度過漫長午後：',
        getOptions: (p) => [
          { text: '🧩 靜靜坐喺地墊砌積木，拆解舊收音機摸索齒輪零件。', effects: { intellect: 8, eq: -2, happiness: 6 }, log: '【3歲】你展現出細膩專注力，在安靜拆解中自得其樂。', next: 'hk_8' },
          { text: '🏃 踩住涼鞋跑出公屋長走廊，同隔籬鄰居細路踢西瓜波。', effects: { health: 10, eq: 8, happiness: 8 }, log: '【3歲】你性格好動爽朗，在街坊歡笑中成長。', next: 'hk_8' },
          { text: '🖍️ 攞住蠟筆在牆壁塗鴉，模仿電視卡通天馬行空。', effects: { happiness: 12, intellect: 4, eq: 4 }, log: '【3歲】你對色彩非常敏銳，想像力充沛。', next: 'hk_8' },
          p === 'music' 
            ? { text: '★【天賦專屬】手指輕撥玩具木結他，無師自通彈出兒歌副歌。', isPerk: true, effects: { eq: 16, happiness: 18, intellect: 6 }, log: '【3歲 隱藏才華】你展露驚人絕對音感，震驚全家人。', next: 'hk_8' }
            : { text: '🍵 跟阿爺阿嫲落樓下茶餐廳飲熱茶走、食出爐菠蘿油。', effects: { happiness: 10, eq: 8, health: 4 }, log: '【3歲】你在充滿煙火氣的關愛中慢慢長大。', next: 'hk_8' }
        ]
      },
      'hk_8': {
        year: 2008, age: 8, stage: '時代黑天鵝', isHistoryCrisis: true,
        crisisNotice: {
          tag: '⚠️ 全球黑天鵝危機 ⚠️',
          title: '【2008年 雷曼風暴與金融海嘯】',
          desc: '華爾街引發百年一遇金融海嘯！恒指大跌、各行各業裁員減薪。電視直播滿是抗議聲，家庭開支驟緊，年僅八歲的你第一次感受到金錢的份量！'
        },
        title: '【2008年 · 8歲】雷曼風暴、奧運與茶餐廳電視機',
        desc: '全城一邊熱播北京奧運，一邊承受金融海嘯衝擊。父母面色凝重，家庭面臨重大財務考驗：',
        getOptions: (p) => [
          { text: '📚 放學準時到太子名師補習社苦讀，默書爭全班第一讓父母安心。', effects: { intellect: 14, eq: 4, happiness: -4 }, log: '【8歲】你提早體會現實壓力，用優異成績回報家庭。', next: 'hk_12' },
          { text: '⚽ 報名小學田徑與足球校隊，在烈日泥地打硬仗，強健身心。', effects: { health: 16, eq: 8, happiness: 6 }, log: '【8歲】運動塑造了你堅忍不拔的性格與好體魄。', next: 'hk_12' },
          { text: '🪙 懂事幫手做家務，主動將儲蓄錢罌交畀屋企應急。', effects: { eq: 16, happiness: 12, money: 5 }, log: '【8歲】你的貼心懂事成為艱難時期家庭最溫暖的依靠。', next: 'hk_12' },
          p === 'music'
            ? { text: '★【天賦專屬】戴起 MP3 反覆聽 Beyond 與廣東歌，木結他掃弦撫慰人心。', isPerk: true, effects: { eq: 22, happiness: 24, intellect: 8 }, log: '【8歲 ⚠️ 隱藏天賦】音樂成為你最堅強的心靈避難所。', next: 'hk_12' }
            : { text: '🪀 放學同死黨在屋邨石凳鬥爆旋陀螺與激戰四驅車，忘卻煩惱。', effects: { happiness: 16, eq: 10, money: -3 }, log: '【8歲】那是沒有智慧手機年代最純粹燦爛的童年。', next: 'hk_12' }
        ]
      },
      'hk_12': {
        year: 2012, age: 12, stage: '升中分流與論壇崛起', isHistoryCrisis: false,
        title: '【2012年 · 12歲】升中派位、高登論壇與天台風',
        desc: '踏入中學，智慧手機與高登/連登論壇風靡全港，同學都在打機與追故，你的青春時光交給：',
        getOptions: (p) => [
          { text: '📚 埋頭苦讀衝刺傳統英中精英班，謝絕所有網絡娛樂與社交。', effects: { intellect: 16, eq: -2, happiness: -4 }, log: '【12歲】你在成績榜名列前茅，但內心早早感受到競爭的枯燥。', next: 'hk_18' },
          { text: '🤝 放學同死黨搭地鐵去葵涌廣場掃街、在天台吹風傾心事。', effects: { eq: 16, happiness: 16, health: 6 }, log: '【12歲】你收穫了毫無雜質的真摯友情，青春閃閃發亮。', next: 'hk_18' },
          { text: '🎧 戴起耳機沉迷日系搖滾與廣東歌，開始嘗試寫歌詞自彈自唱。', effects: { eq: 14, happiness: 16, intellect: 4 }, log: '【12歲】你學會用音樂與審美建立起獨特的感性世界。', next: 'hk_18' },
          p === 'geek'
            ? { text: '★【天賦專屬】自學越獄 iOS 系統，編寫高登論壇輔助腳本與搶票爬蟲。', isPerk: true, effects: { intellect: 25, money: 15, happiness: 12 }, log: '【12歲 ⚠️ 隱藏天賦】你在代碼世界找到屬於自己的主場。', next: 'hk_18' }
            : { text: '🏀 日日放學在街場打籃球鬥波直到熄燈，練出鋼鐵體格。', effects: { health: 18, eq: 8, happiness: 12 }, log: '【12歲】你擁有一副強健身軀，性格陽光豁達。', next: 'hk_18' }
        ]
      },
      'hk_18': {
        year: 2018, age: 18, stage: 'DSE 放榜大分水嶺', isHistoryCrisis: false,
        title: '【2018年 · 18歲】DSE 放榜、聯招志願與人生分流',
        desc: '公開試放榜，面對香港極度現實的社會階梯與昂貴租金，你的成人第一步抉擇：',
        getOptions: (p) => [
          { text: '🎓 考入港大/中大實用專業（醫療/物理治療/法學/會計），按部就班走菁英路線。', effects: { intellect: 22, money: -10, eq: 6 }, log: '【18歲 ⚠️ 命運轉折】你拿到主流社會的菁英入場券，深耕專業。', next: 'hk_20' },
          { text: '🎨 堅持攻讀心愛的設計或音樂，在火炭/觀塘工廈租迷你單位創作。', effects: { happiness: 25, eq: 14, health: 6 }, log: '【18歲 ⚠️ 命運轉折】你用純粹的熱愛與靈魂定義自己的青春。', next: 'hk_20' },
          { text: '💼 提早投身社會全職打拼或學扎實技術，半工讀累積啟動資金。', effects: { money: 35, eq: 14, health: 4, intellect: -4 }, log: '【18歲 ⚠️ 命運轉折】你提早嚐遍人情冷暖，累積踏實本金。', next: 'hk_20' },
          p === 'leader'
            ? { text: '★【天賦專屬】聯合死黨創立青年潮流選品與自媒體品牌，自立門戶。', isPerk: true, effects: { money: 45, eq: 22, intellect: 10 }, log: '【18歲 ⚠️ 命運轉折】你提早踏上商業領袖之路，展現過人魄力。', next: 'hk_20' }
            : { text: '✈️ 申請 Working Holiday 遠赴澳洲/英國，用勞力換取開闊眼界。', effects: { happiness: 22, eq: 14, money: -5 }, log: '【18歲】你在遠方異國見識到廣闊世界，心胸開朗。', next: 'hk_20' }
        ]
      },
      'hk_20': {
        year: 2020, age: 20, stage: '歷史大事件', isHistoryCrisis: true,
        crisisNotice: {
          tag: '🚨 全球歷史大事件 🚨',
          title: '【2020年 世紀疫情與全港隔絕】',
          desc: '新冠疫情席捲全球！通關暫停、全港網課、中環寫字樓空置。戴著口罩走過空蕩蕩的彌敦道，世界驟然停頓，每個人都被迫在孤獨中直面現實與未來！'
        },
        title: '【2020年 · 20歲】空蕩的彌敦道、網課與遠端革命',
        desc: '繁華的香港街頭變得寂靜，隔著螢幕過日子成為新常態，你如何應對這場時代巨浪：',
        getOptions: (p) => [
          { text: '💻 抓住在家工作紅利，兼職跨國線上接案與美股短線交易，賺取第一桶金。', effects: { money: 45, intellect: 14, health: -10 }, log: '【20歲】你踩準數位轉型風口，但日夜顛倒消耗了體力。', next: 'hk_28' },
          { text: '🏡 全心留喺屋企陪伴父母，苦練廚藝、手沖咖啡與居家徒手重訓。', effects: { happiness: 24, eq: 16, health: 12 }, log: '【20歲】這段慢下來的時光，讓你看清了最值得珍惜的親情。', next: 'hk_28' },
          { text: '⛰️ 避開人群探索麥理浩徑與大東山，在香港大自然裡呼吸自由空氣。', effects: { health: 22, happiness: 20, eq: 6 }, log: '【20歲】山海為你撫平了時代的焦慮與迷惘。', next: 'hk_28' },
          p === 'zen'
            ? { text: '★【天賦專屬】達到自洽通透之境，閉門精讀哲學思維模型，內心毫無內耗。', isPerk: true, effects: { happiness: 32, intellect: 16, eq: 14 }, log: '【20歲 ⚠️ 隱藏天賦】世界動盪喧囂，你在心中修築了安寧神殿。', next: 'hk_28' }
            : { text: '🎮 沉迷動森與線上電競，與朋友通宵連線打機苦中作樂。', effects: { happiness: 16, eq: 8, health: -8 }, log: '【20歲】你用虛擬世界的歡樂撐過了最冷清的季節。', next: 'hk_28' }
        ]
      },
      'hk_28': {
        year: 2028, age: 28, stage: '成家置業抉擇', isHistoryCrisis: false,
        title: '【2028年 · 28歲】維港夜景、居屋首期與去留抉擇',
        desc: '二十八歲，身邊朋友陸續結婚或移民，手頭累積了第一筆打拼積蓄，你面臨人生大抉擇：',
        getOptions: () => [
          { text: '💍 與摯愛結婚，合力供九成按揭首期上車買市區屋苑，背負三十年房貸。', effects: { happiness: 28, eq: 14, money: -40, health: -6 }, log: '【28歲】你背負起房貸甜蜜責任，擁有了屬於自己的安樂窩。', next: 'hk_38' },
          { text: '🚗 堅持租樓自立，買入心儀已久的越野車，假日帶著相機遊遍香港隱秘山海。', effects: { happiness: 26, health: 10, money: -18, eq: 8 }, log: '【28歲】你拒絕被磚頭鎖死人生，享受隨時出發的自由。', next: 'hk_38' },
          { text: '💼 辭去安穩工作，利用累積的人脈與技術獨立創辦諮詢工作室。', effects: { money: 70, intellect: 16, health: -14, happiness: 10 }, log: '【28歲】你承擔巨大風險跳出舒適圈，開闢個人事業天地。', next: 'hk_38' },
          { text: '📈 極限自律節儉，全部工資定投全球資產，提早學習複利資產管理。', effects: { money: 55, intellect: 14, happiness: 10 }, log: '【28歲】你建立起清醒冷靜的資產複利防線。', next: 'hk_38' }
        ]
      },
      'hk_38': {
        year: 2038, age: 38, stage: '中年天花板與健康', isHistoryCrisis: false,
        title: '【2038年 · 38歲】中環寫字樓、白髮與身心健康',
        desc: '人到三十八歲，體力不再如二十歲任性，上有高堂下有幼小，體檢報告出現紅字：',
        getOptions: () => [
          { text: '🩺 徹底放下虛榮與應酬，每週規律重訓與地中海飲食，健康逆齡重回巔峰。', effects: { health: 30, happiness: 24, money: -5 }, log: '【38歲】你將健康重新排在第一位，換來清爽體魄。', next: 'hk_65' },
          { text: '🏢 忍辱負重守住大機構高層職位，全力賺錢供養子女升讀頂尖學府。', effects: { money: 65, eq: 12, health: -18, happiness: -6 }, log: '【38歲】你為家庭付出了全部心血，成為最堅強的頂樑柱。', next: 'hk_65' },
          { text: '☕ 轉移跑道在西貢開設精品獨立咖啡館，把時間留給慢活與陪伴父母。', effects: { happiness: 32, health: 15, money: -15, eq: 10 }, log: '【38歲】你打破中年焦慮，找到了滋養靈魂的生活步調。', next: 'hk_65' },
          { text: '📈 敏銳把握市場週期低谷，果斷進行資產重組，實現被動現金流退休。', effects: { money: 95, intellect: 15, health: -5, happiness: 15 }, log: '【38歲】半生沉澱的睿智讓你真正告別金錢束縛。', next: 'hk_65' }
        ]
      },
      'hk_65': {
        year: 2065, age: 65, stage: '花甲晚晴', isHistoryCrisis: false,
        title: '【2065年 · 65歲】茶樓一盅兩件與夕陽倒影',
        desc: '六十五歲退休之年，回望六十載波瀾壯闊的時代起伏，你如何安度晚年：',
        getOptions: () => [
          { text: '🌍 牽著伴侶的手踏上慢節奏世界郵輪旅行，將歲月化作永恆回憶。', effects: { happiness: 35, money: -25, health: 6 }, log: '【65歲】你活得坦蕩精彩，一生無悔。', next: 'hk_80' },
          { text: '🏡 在新界村屋小花園蒔花弄草、彈彈結他，將人生智慧傳給兒孫。', effects: { happiness: 30, health: 18, eq: 14 }, log: '【65歲】你在溫暖平淡的日常中安享天年。', next: 'hk_80' },
          { text: '📖 整理一生的日記與老照片出版自傳《維港少年六十年》，給時代留下印記。', effects: { intellect: 20, happiness: 28, eq: 12 }, log: '【65歲】你的回憶錄啟迪了無數年輕人。', next: 'hk_80' },
          { text: '🍵 每日到老茶居同舊友談天說地、落棋散步，享受最純粹的市井日常。', effects: { happiness: 28, health: 14, eq: 12 }, log: '【65歲】一盅兩件，笑看人間風雲變幻。', next: 'hk_80' }
        ]
      },
      'hk_80': {
        year: 2080, age: 80, stage: '期頤高齡', isHistoryCrisis: false,
        title: '【2080年 · 80歲】八十載風雨人間 · 安詳回甘',
        desc: '八十歲耄耋之年，窗外科技翻天覆地，你面帶安詳微笑回望一生：',
        getOptions: () => [
          { text: '🌸 在兒孫滿堂的溫暖歌聲中安詳合上雙眼，為八十年漫長旅程畫上圓滿句號。', effects: { happiness: 40, eq: 25 }, log: '【80歲】你活得深情通透，圓滿無憾。', next: 'end' },
          { text: '💾 將畢生思維與記憶捐贈給「香港歷史影像庫」，化作永恆的數位星辰。', effects: { intellect: 35, happiness: 35 }, log: '【80歲】你的思想超越了肉身極限，啟迪後世。', next: 'end' },
          { text: '🏡 將全部剩餘積蓄成立青年基層助學基金，資助公屋少年追夢。', effects: { happiness: 45, eq: 30 }, log: '【80歲】千金散盡，你的名字將永遠被銘記。', next: 'end' },
          { text: '🍃 在微風中靜靜端起最後一盞普洱茶，帶著微笑踏上靈魂全新旅途。', effects: { happiness: 40, health: 10 }, log: '【80歲】你優雅告別塵世，身心回歸浩瀚天地。', next: 'end' }
        ]
      }
    }
  },

  // =========================================================================
  // 🇯🇵 日本東京主線
  // =========================================================================
  'jp_timeline': {
    startEvent: 'jp_3',
    events: {
      'jp_3': {
        year: 2003, age: 3, stage: '幼兒啟蒙', isHistoryCrisis: false,
        title: '【2003年 · 3歲】保育園木地板與夏日風鈴',
        desc: '東京下町老街，保育園老師帶著大家在榻榻米上閱讀繪本、做手作，你的午後時光：',
        getOptions: () => [
          { text: '🧩 專注用紙黏土與木積木製作精細微型手作，極具耐心。', effects: { intellect: 8, eq: 4, happiness: 6 }, log: '【3歲】你展現出日本傳統職人的專注與精細感。', next: 'jp_6' },
          { text: '🏃 穿著小木屐在神社砂石地奔跑，參加夏日祭典撈金魚。', effects: { health: 10, eq: 8, happiness: 10 }, log: '【3歲】神社祭典的鼓聲與笑聲溫暖了你的童年。', next: 'jp_6' },
          { text: '🎨 在畫簿上專注繪畫四季櫻花與落葉，色彩感性純粹。', effects: { happiness: 12, intellect: 6, eq: 4 }, log: '【3歲】你對大自然細微變化擁有非凡的敏感度。', next: 'jp_6' },
          { text: '🍙 乖乖幫阿媽捏三角飯糰、擺放筷子，從小養成禮貌規矩。', effects: { eq: 10, happiness: 8, health: 4 }, log: '【3歲】你懂事禮貌，受到鄰里稱讚。', next: 'jp_6' }
        ]
      },
      'jp_6': {
        year: 2006, age: 6, stage: '小學校入學式', isHistoryCrisis: false,
        title: '【2006年 · 6歲】櫻花樹下的小學入學式',
        desc: '背上祖父母贈送的厚重紅色/黑色硬皮書包（ランドセル），正式成為小學生：',
        getOptions: () => [
          { text: '⚾ 加入少年棒球隊，每天清晨「朝練」風雨不改，練習揮棒千次。', effects: { health: 16, eq: 8, happiness: 6 }, log: '【6歲】嚴苛的棒球部鍛鍊練就了你的頑強意志。', next: 'jp_11' },
          { text: '🎹 每天放學乖乖去琴房練鋼琴，手指磨出硬皮亦堅持不懈。', effects: { eq: 14, intellect: 8, happiness: 8 }, log: '【6歲】音符成為你童年最深沉的精神世界。', next: 'jp_11' },
          { text: '📚 報名著名「進學塾」，提前為私立中學校受驗苦讀。', effects: { intellect: 16, eq: 2, happiness: -4 }, log: '【6歲】你在成績榜名列前茅，但也早早背負同儕壓力。', next: 'jp_11' },
          { text: '🪲 暑假帶著捕蟲網跑去鄉下抓獨角仙、收集標本。', effects: { happiness: 16, health: 12, eq: 6 }, log: '【6歲】鄉野大自然留給你最燦爛的夏日回憶。', next: 'jp_11' }
        ]
      },
      'jp_11': {
        year: 2011, age: 11, stage: '歷史大事件', isHistoryCrisis: true,
        crisisNotice: {
          tag: '🚨 日本歷史大震撼 🚨',
          title: '【2011年 311 東日本大地震與海嘯】',
          desc: '黎克特制 9.0 級滔天巨震襲擊東日本！海嘯吞沒城鎮、福島核電廠危機爆發。東京地鐵全線癱瘓、大規模停電。十一歲的你戴著防災頭巾，第一次體會到大自然殘酷與生命的脆弱！'
        },
        title: '【2011年 · 11歲】311 地震、停電夜與防災避難所',
        desc: '大地劇烈搖晃，身邊大人在恐慌中相互扶持。在避難所燭光下，你如何面對這場天災：',
        getOptions: () => [
          { text: '🤝 主動在避難所搬運毛毯與物資，主動照顧哭鬧的幼童。', effects: { eq: 20, happiness: 12, health: 6 }, log: '【11歲】你在災難中展現出過人勇氣與利他之心。', next: 'jp_15' },
          { text: '🕯️ 在停電的寒夜靜靜陪伴父母，體會到「羈絆（きずな）」的重量。', effects: { happiness: 18, eq: 16, intellect: 6 }, log: '【11歲】這次天災讓你真正理解生命的寶貴與珍惜當下。', next: 'jp_15' },
          { text: '📻 專注收聽收音機防災廣播，記錄避難手冊，思考防災機制。', effects: { intellect: 18, eq: 8, money: 4 }, log: '【11歲】你以冷靜理性思考災害防禦，立志改變世界。', next: 'jp_15' },
          { text: '🎸 用唯一沒壞的小木結他輕輕彈奏民謠，溫暖避難所疲憊的人們。', effects: { happiness: 24, eq: 18, health: 4 }, log: '【11歲】你的琴聲成為災後黑暗中最溫柔的微光。', next: 'jp_15' }
        ]
      },
      'jp_15': {
        year: 2015, age: 15, stage: '高校入試與部活', isHistoryCrisis: false,
        title: '【2015年 · 15歲】高校青春、甲子園夢想與文化祭',
        desc: '考入高中，面對日本高中最重要的「部活動」與青春賽道：',
        getOptions: () => [
          { text: '🏃 投入運動部競技，誓要帶領隊伍殺入全國高校體育大賽。', effects: { health: 22, eq: 10, happiness: 10 }, log: '【15歲】汗水與淚水交織成最純粹的熱血青春。', next: 'jp_20' },
          { text: '📚 謝絕所有社團，每天在自習室苦讀至深夜，目標東京大學。', effects: { intellect: 22, health: -6, happiness: -4 }, log: '【15歲】你以孤獨為代價，向頂尖學府發起衝刺。', next: 'jp_20' },
          { text: '🎨 加入輕音樂部，在秋季文化祭舞台上擔任主唱引爆全場。', effects: { happiness: 24, eq: 16, intellect: 6 }, log: '【15歲】舞台上的歡呼聲成為你青春的高光時刻。', next: 'jp_20' },
          { text: '🍵 加入傳統茶道與弓道部，在靜謐中磨礪內心的專注與禮數。', effects: { eq: 16, happiness: 18, health: 8 }, log: '【15歲】你在喧囂世界中修養出沉穩從容的氣質。', next: 'jp_20' }
        ]
      },
      'jp_20': {
        year: 2020, age: 20, stage: '成人式與就職活動', isHistoryCrisis: false,
        title: '【2020年 · 20歲】成人式、就職活動（就活）與西裝海',
        desc: '二十歲成人禮，踏入殘酷的日本就業市場。穿上千篇一律的黑色西裝穿梭面試：',
        getOptions: () => [
          { text: '🏢 擠破頭拿下傳統綜合商社/大型銀行內定，開啟社畜奮鬥路。', effects: { money: 40, eq: 14, health: -14, happiness: -4 }, log: '【20歲】你擠入菁英體系，以健康換取社會地位與薪資。', next: 'jp_30' },
          { text: '💻 拒絕傳統大企業官僚體系，加入涉谷新興 IT 創業團隊做全端開發。', effects: { money: 35, intellect: 18, happiness: 14 }, log: '【20歲】你踏上技術驅動的自由道路，活力滿滿。', next: 'jp_30' },
          { text: '🍜 拜京都傳統老舖料理長為師，從洗碗磨刀開始磨礪職人技藝。', effects: { happiness: 22, health: 8, eq: 12, money: -5 }, log: '【20歲】你選擇了樸實純粹的手作匠人道路。', next: 'jp_30' },
          { text: '🌾 逃離東京人潮，參加地方振興專案前往北海道經營酪農農場。', effects: { health: 22, happiness: 28, money: 5 }, log: '【20歲】在大自然懷抱中，你過上了自給自足的安寧生活。', next: 'jp_30' }
        ]
      },
      'jp_30': {
        year: 2030, age: 30, stage: '三十而立與抉擇', isHistoryCrisis: false,
        title: '【2030年 · 30歲】深夜居酒屋、孤獨死焦慮與人生錨定',
        desc: '三十歲的東京夜色冰冷，身邊同事被過勞擊垮，你決定如何錨定自己的人生：',
        getOptions: () => [
          { text: '💍 與溫柔伴侶結為連理，在郊區購置一戶建住宅，用心守護家庭。', effects: { happiness: 32, eq: 16, money: -30, health: 6 }, log: '【30歲】你擁有了屬於自己的溫馨歸宿，內心平靜。', next: 'jp_42' },
          { text: '🧗 勇敢自立門戶，創辦個人設計/獨立諮詢品牌，打破公司階層。', effects: { money: 65, intellect: 16, health: -10, happiness: 12 }, log: '【30歲】你憑實力打破體制枷鎖，贏得事業自由。', next: 'jp_42' },
          { text: '🧘 奉行極簡主義與低慾望自洽生活，每日下班煮飯看書，不婚不買房。', effects: { happiness: 28, health: 18, eq: 12, money: 20 }, log: '【30歲】你從世俗比較中解脫出來，過得清爽自由。', next: 'jp_42' },
          { text: '💼 拼命加班晉升為部門部長，掌控億萬預算，但身體嚴重透支。', effects: { money: 75, eq: 14, health: -25, happiness: -6 }, log: '【30歲】你站上權力頂點，但也耗盡了身心體力。', next: 'jp_42' }
        ]
      },
      'jp_42': {
        year: 2042, age: 42, stage: '四十不惑與健康', isHistoryCrisis: false,
        title: '【2042年 · 42歲】溫泉旅宿、白髮與生命審視',
        desc: '四十二歲厄年，身體開始發出抗議，在箱根溫泉蒸氣中你重新審視人生優先級：',
        getOptions: () => [
          { text: '🩺 徹底放下所有世俗加班，每日慢跑與禪修，逆轉身體機能。', effects: { health: 30, happiness: 26, money: -10 }, log: '【42歲】你將健康放回第一位，迎來身心蛻變。', next: 'jp_70' },
          { text: '🍵 辭職回到故鄉接手祖傳老屋，改造成溫暖鄉野民宿接待八方旅人。', effects: { happiness: 35, health: 16, eq: 14 }, log: '【42歲】你在慢生活裡找到了真正的心靈依託。', next: 'jp_70' },
          { text: '📈 利用半生積累的商界敏銳度進行穩健投資，享受充沛被動收入。', effects: { money: 85, intellect: 14, happiness: 12 }, log: '【42歲】你達成財務從容，不用再看任何人臉色。', next: 'jp_70' },
          { text: '📖 將半生職場與生活體悟出版成書《東京漂流記》，銷量破百萬。', effects: { intellect: 25, happiness: 28, eq: 16 }, log: '【42歲】你的文字撫慰了無數在都市中迷惘的靈魂。', next: 'jp_70' }
        ]
      },
      'jp_70': {
        year: 2070, age: 70, stage: '花甲榮休 · 庭院風鈴', isHistoryCrisis: false,
        title: '【2070年 · 70歲】小院枯山水與一生回味',
        desc: '七十歲古稀之年，看盡人間繁華與蒼涼，晚年的你坐在走廊靜賞落櫻：',
        getOptions: () => [
          { text: '🌸 在摯愛親人的陪伴下含笑安詳閉目，度過坦蕩自洽的一生。', effects: { happiness: 40, eq: 20 }, log: '【70歲】你的一生如櫻花般純粹絢爛，圓滿無悔。', next: 'end' },
          { text: '🏡 每日精細照料盆栽與枯山水，將畢生職人精髓傳授給年輕學徒。', effects: { happiness: 35, health: 12, eq: 14 }, log: '【70歲】你的工匠之魂在後輩手中代代相傳。', next: 'end' },
          { text: '🍶 與兒時玩伴在小酒館酌飲最後一壺清酒，笑談人間七十年風雨。', effects: { happiness: 38, eq: 18 }, log: '【70歲】老友相伴，此生了無遺憾。', next: 'end' },
          { text: '🍃 帶著微笑安詳踏上靈魂的全新歸途，身心融入日本山河之間。', effects: { happiness: 42 }, log: '【70歲】你優雅告別塵世，歸於寧靜。', next: 'end' }
        ]
      }
    }
  },

  // =========================================================================
  // 🇬🇧 英國倫敦主線
  // =========================================================================
  'uk_timeline': {
    startEvent: 'uk_4',
    events: {
      'uk_4': {
        year: 2004, age: 4, stage: '幼童泥地與下午茶', isHistoryCrisis: false,
        title: '【2004年 · 4歲】倫敦陰雨天與後花園泥濘',
        desc: '窗外陰雨綿綿，壁爐柴火噼啪作響。你在後花園草地上踩水坑、玩泥巴：',
        getOptions: () => [
          { text: '⚽ 披上雨衣在草地上踢小足球，渾身泥水卻笑得無比燦爛。', effects: { health: 12, eq: 8, happiness: 10 }, log: '【4歲】你在英倫陰雨中練就了一副好體魄與樂觀天性。', next: 'uk_11' },
          { text: '🚂 在客廳羊毛地毯上搭建古典蒸汽火車軌道，摸索齒輪轉動。', effects: { intellect: 8, happiness: 8, eq: 2 }, log: '【4歲】你沉迷於機械結構，展現出探究精神。', next: 'uk_11' },
          { text: '🎨 拿著水彩筆畫出各種奇形怪狀的倫敦巴士與大笨鐘。', effects: { happiness: 12, intellect: 6, eq: 4 }, log: '【4歲】你對英倫建築與城市色彩充滿想像力。', next: 'uk_11' },
          { text: '☕ 跟隨長輩喝加奶英式紅茶、吃司康餅，學習餐桌禮儀。', effects: { eq: 12, happiness: 8, health: 2 }, log: '【4歲】你從小舉止得體，受到親友喜愛。', next: 'uk_11' }
        ]
      },
      'uk_11': {
        year: 2011, age: 11, stage: '中學生活與音樂啟蒙', isHistoryCrisis: false,
        title: '【2011年 · 11歲】Secondary School、二手黑膠與車庫樂隊',
        desc: '升入中學，穿上傳統西裝校服。倫敦跳蚤市場與搖滾文化深深吸引著你：',
        getOptions: () => [
          { text: '🎸 在舊貨攤淘得二手電結他，在車庫瘋狂苦練綠洲與披頭四名曲。', effects: { eq: 16, happiness: 18, intellect: 6 }, log: '【11歲】搖滾樂成為你青春期宣洩荷爾蒙的最佳出口。', next: 'uk_16' },
          { text: '📚 沉浸在公立圖書館讀遍莎士比亞劇作與世界近代史。', effects: { intellect: 16, eq: 6, happiness: 4 }, log: '【11歲】你積累了深厚的人文底蘊與思辨能力。', next: 'uk_16' },
          { text: '⚽ 代表學校出戰週末少年足球聯賽，擔任主力中場衝鋒陷陣。', effects: { health: 16, eq: 8, happiness: 8 }, log: '【11歲】足球賽場的對抗塑造了你強硬不屈的球風。', next: 'uk_16' },
          { text: '🤝 與各色移民後裔同學打成一片，週末在街角滑板場練習跳台。', effects: { eq: 16, happiness: 14, health: 6 }, log: '【11歲】你結交了無拘無束的一生好友。', next: 'uk_16' }
        ]
      },
      'uk_16': {
        year: 2016, age: 16, stage: '歷史大事件', isHistoryCrisis: true,
        crisisNotice: {
          tag: '🚨 英國歷史大地震 🚨',
          title: '【2016年 英國脫歐公投 (Brexit)】',
          desc: '公投結果震驚全球！英國決定脫離歐盟，英鎊暴跌、社會撕裂、族群對立激化。家庭餐桌上爆發激烈爭吵，十六歲的你第一次親歷民主社會的陣痛與時代撕裂！'
        },
        title: '【2016年 · 16歲】脫歐公投之夜、英鎊暴跌與社會大分裂',
        desc: '電視台開票那一夜，身邊朋友因立場不同反目成仇，你如何面對這個分歧的時代：',
        getOptions: () => [
          { text: '🗣️ 參加校園青年辯論社，撰寫長文呼籲各方理性對話包容分歧。', effects: { intellect: 18, eq: 16, happiness: 4 }, log: '【16歲】你展現出卓越的政治哲學思維與領袖包容力。', next: 'uk_18' },
          { text: '🎸 將時代的迷惘與怒火寫成原創龐克單曲，在倫敦地下酒吧引發萬人合唱。', effects: { happiness: 24, eq: 18, money: 8 }, log: '【16歲】你用音樂唱出了一整代英國青年的焦慮與心聲。', next: 'uk_18' },
          { text: '📉 敏銳察覺匯率動盪，提前將零用儲蓄兌換為美元或避險資產。', effects: { money: 25, intellect: 14, eq: 6 }, log: '【16歲】你在混亂中提早培養出敏銳的金融嗅覺。', next: 'uk_18' },
          { text: '🍃 遠離政治噪音，騎單車去肯特郡鄉間漫遊，在大自然中平復心神。', effects: { health: 14, happiness: 18, eq: 8 }, log: '【16歲】你拒絕被撕裂的意識形態吞噬，守護內心淨土。', next: 'uk_18' }
        ]
      },
      'uk_18': {
        year: 2018, age: 18, stage: 'A-Level 與大學賽道', isHistoryCrisis: false,
        title: '【2018年 · 18歲】A-Level 放榜、Pub 慶祝與青春遠行',
        desc: '十八歲成人禮，在當地傳統 Pub 點上一杯黑啤慶祝，面對未來的道路：',
        getOptions: () => [
          { text: '🎓 考入牛津/劍橋/LSE頂尖學府攻讀PPE（哲學政治經濟學），邁向政經菁英。', effects: { intellect: 24, money: -15, eq: 8 }, log: '【18歲 ⚠️ 命運轉折】你步入大英帝國菁英搖籃，開啟宏大抱負。', next: 'uk_23' },
          { text: '🚐 與樂隊好友合買一輛破舊麵包車，展開橫跨全英的地下巡演流浪。', effects: { happiness: 28, eq: 16, money: -8, health: -4 }, log: '【18歲 ⚠️ 命運轉折】你過上了最純粹浪漫的搖滾青春！', next: 'uk_23' },
          { text: '💼 前往倫敦金融城（The City）投行擔任基層實習分析師，高壓摸爬滾打。', effects: { money: 40, intellect: 16, health: -14, happiness: -6 }, log: '【18歲 ⚠️ 命運轉折】你在冷酷的資本絞肉機裡飛速成長。', next: 'uk_23' },
          { text: '🌿 前往蘇格蘭高原農場打工自立，享受清澈冷冽的風與漫無邊際的天地。', effects: { health: 20, happiness: 24, eq: 10 }, log: '【18歲 ⚠️ 命運轉折】你在大山大海中找到了心靈的寧靜。', next: 'uk_23' }
        ]
      },
      'uk_23': {
        year: 2023, age: 23, stage: '生活成本危機', isHistoryCrisis: false,
        title: '【2023年 · 23歲】高通脹、鐵路大罷工與房租重壓',
        desc: '俄烏衝突引發能源危機，倫敦房租飆升、地鐵三天兩頭罷工，二十三歲的你面對現實考驗：',
        getOptions: () => [
          { text: '💻 轉向全端遠距接案，搬離昂貴倫敦，移居曼徹斯特/利茲節省開支。', effects: { money: 35, happiness: 16, health: 8 }, log: '【23歲】你靈活應變，成功抵禦了生活成本危機。', next: 'uk_35' },
          { text: '🏢 在倫敦律所/金融公司咬牙苦熬，拼命爭取晉升抗衡通脹。', effects: { money: 55, intellect: 12, health: -16, happiness: -8 }, log: '【23歲】你用健康抗衡現實，在職場階梯上站穩陣腳。', next: 'uk_35' },
          { text: '🍻 進入社區老字號精釀啤酒坊當釀酒師，享受手作樂趣與人情溫暖。', effects: { happiness: 26, health: 10, eq: 14, money: 5 }, log: '【23歲】在動盪時代，你守住了生活的精緻與自得其樂。', next: 'uk_35' },
          { text: '📈 深入鑽研全球宏觀經濟與大宗商品對沖，實現小額資產翻倍。', effects: { money: 60, intellect: 18, happiness: 8 }, log: '【23歲】危機成為你的跳板，資本積累領先同齡人。', next: 'uk_35' }
        ]
      },
      'uk_35': {
        year: 2035, age: 35, stage: '三十五歲 · 鄉野莊園', isHistoryCrisis: false,
        title: '【2035年 · 35歲】科茨沃爾德蜜色石屋與中場定錨',
        desc: '三十五歲，厭倦了都會喧囂，你帶著打拼多年的一筆積蓄做出人生定錨：',
        getOptions: () => [
          { text: '🏡 買下科茨沃爾德鄉村的古老蜜色石屋，開闢玫瑰花園，建立溫馨家庭。', effects: { happiness: 35, health: 18, money: -35, eq: 12 }, log: '【35歲】你擁有了夢寐以求的英倫鄉間莊園，家庭美滿。', next: 'uk_68' },
          { text: '🚗 保持單身旅居，駕著老爺車漫遊歐洲大陸，記錄各地民謠與古老城堡。', effects: { happiness: 30, health: 14, money: -15, eq: 10 }, log: '【35歲】你活成了一個自由浪蕩的現代遊俠。', next: 'uk_68' },
          { text: '💼 創立獨立文藝出版廠牌與獨立唱片公司，扶持全球青年才俊。', effects: { money: 75, intellect: 16, eq: 16, happiness: 15 }, log: '【35歲】你成為英國文化界舉足輕重的人物。', next: 'uk_68' },
          { text: '🧘 每日在鄉間騎馬、品茶、閱讀古籍，身心處於極致的平和狀態。', effects: { health: 26, happiness: 32, eq: 14, money: 10 }, log: '【35歲】你參透了生命的節奏，優雅自洽。', next: 'uk_68' }
        ]
      },
      'uk_68': {
        year: 2068, age: 68, stage: '英倫古稀終章', isHistoryCrisis: false,
        title: '【2068年 · 68歲】壁爐火光、黑膠唱片與人生回甘',
        desc: '六十八歲壁爐旁，手中端著一杯溫熱的蘇格蘭威士忌，回望這跌宕起伏的一生：',
        getOptions: () => [
          { text: '🌸 在摯愛親朋的溫暖陪伴中安詳合上雙眼，一生紳士坦蕩、圓滿謝幕。', effects: { happiness: 42, eq: 22 }, log: '【68歲】你活得深情優雅，人生畫上完美句號。', next: 'end' },
          { text: '🎸 辦完人生最後一場慈善不插電告別音樂會，將收益全數捐給年輕音樂人。', effects: { happiness: 45, eq: 25 }, log: '【68歲】你的傳奇將在英倫大地的歌聲中永垂不朽。', next: 'end' },
          { text: '📖 將珍藏一生的數萬張珍稀黑膠唱片捐贈給大英圖書館，傳承後世。', effects: { intellect: 30, happiness: 35 }, log: '【68歲】你留給世人一份浩瀚的音樂遺產。', next: 'end' },
          { text: '🍃 漫步走進英格蘭深秋的迷霧森林，帶著微笑回歸自然母親的懷抱。', effects: { happiness: 40, health: 10 }, log: '【68歲】你優雅告別塵世，身心化作秋天落葉。', next: 'end' }
        ]
      }
    }
  },

  // =========================================================================
  // 🇮🇳 印度班加羅爾主線
  // =========================================================================
  'in_timeline': {
    startEvent: 'in_3',
    events: {
      'in_3': {
        year: 2003, age: 3, stage: '宗族大家庭童年', isHistoryCrisis: false,
        title: '【2003年 · 3歲】熱鬧的天井、香料茶與風箏',
        desc: '班加羅爾炎熱午後，家族三代幾十口人聚在天井，香料奶茶香氣瀰漫：',
        getOptions: () => [
          { text: '🪁 跟堂兄弟爬上屋頂放彩色風箏，鬥線爭奪高空冠軍。', effects: { health: 12, eq: 8, happiness: 10 }, log: '【3歲】你在熱鬧喧囂的宗族溫情中度過快樂童年。', next: 'in_10' },
          { text: '🏏 在泥地用木板自製球棒打街頭板球，身手無比敏捷。', effects: { health: 14, eq: 10, happiness: 8 }, log: '【3歲】街頭板球練就了你敏銳的運動天賦。', next: 'in_10' },
          { text: '🧩 坐在長輩腳邊拆解舊電扇馬達，對電機運轉痴迷不已。', effects: { intellect: 10, happiness: 6, eq: 2 }, log: '【3歲】你展露出對理工科技的天然好奇心。', next: 'in_10' },
          { text: '🪘 聆聽傳統塔布拉鼓節奏，隨旋律手舞足蹈，極有樂感。', effects: { eq: 12, happiness: 12, intellect: 4 }, log: '【3歲】你在傳統印度旋律中陶冶性情。', next: 'in_10' }
        ]
      },
      'in_10': {
        year: 2010, age: 10, stage: '英聯邦熱潮與奧數狂熱', isHistoryCrisis: false,
        title: '【2010年 · 10歲】新德里英聯邦運動會與高壓奧數',
        desc: '印度科技產業騰飛，全家人將「改變階級」的全部期望寄託在你的學業上：',
        getOptions: () => [
          { text: '📚 每天苦做幾十頁高難度數學競賽題，志在衝刺頂級工程名校。', effects: { intellect: 16, eq: 2, happiness: -4 }, log: '【10歲】你展現出可怕的數學天賦，成為全家族的驕傲。', next: 'in_17' },
          { text: '🏏 入選少年板球俱樂部主力，志願成為國家隊職業板球明星。', effects: { health: 18, eq: 10, happiness: 10 }, log: '【10歲】在綠茵板球場上，你享受全場熱烈的歡呼。', next: 'in_17' },
          { text: '💻 偷偷在網吧自學 C++ 編程，寫出簡易資料庫程序震驚老師。', effects: { intellect: 18, money: 5, happiness: 8 }, log: '【10歲】你提早推開了全球軟體世界的大門。', next: 'in_17' },
          { text: '🤝 懂事幫叔父打理香料香精批發攤位，練就一手過人砍價本領。', effects: { eq: 16, money: 12, intellect: 6 }, log: '【10歲】你在市井鬧市中學會了最實戰的商業智慧。', next: 'in_17' }
        ]
      },
      'in_17': {
        year: 2017, age: 17, stage: '地獄級 JEE 理工大考', isHistoryCrisis: false,
        title: '【2017年 · 17歲 ⚠️】科塔（Kota）地獄補習與 JEE 決戰',
        desc: '百萬考生爭奪千分之五錄取率的印度理工（IIT）門票！每天高壓苦讀 16 小時：',
        getOptions: () => [
          { text: '🎓 拼盡全力以全國前五百名考入 IIT 孟買分校電腦系，改寫家族命運！', effects: { intellect: 30, money: 20, health: -14, happiness: 12 }, log: '【17歲 ⚠️ 命運轉折】你拿到了全球科技界含金量最高的敲門磚！', next: 'in_19' },
          { text: '💼 拒絕被考試機器摧毀，直接投身班加羅爾新興軟體外包初創公司。', effects: { money: 30, eq: 16, health: 6 }, log: '【17歲 ⚠️ 命運轉折】你提早踏上商業實戰戰場。', next: 'in_19' },
          { text: '🏏 參加板球超級聯賽（IPL）青訓選拔，博取千萬年薪的職業球員生涯。', effects: { health: 24, happiness: 20, money: 15, intellect: -6 }, log: '【17歲 ⚠️ 命運轉折】你在綠茵場上爭取屬於自己的體育奇蹟。', next: 'in_19' },
          { text: '🎨 堅持攻讀心愛的寶萊塢電影編導與音樂製作，打破家庭世俗偏見。', effects: { happiness: 26, eq: 16, money: -10 }, log: '【17歲 ⚠️ 命運轉折】你用藝術向傳統宗族觀念發起挑戰。', next: 'in_19' }
        ]
      },
      'in_19': {
        year: 2019, age: 19, stage: '歷史大事件', isHistoryCrisis: true,
        crisisNotice: {
          tag: '🚨 印度歷史大巨震 🚨',
          title: '【2019-2020 全國廢鈔令與數位支付海嘯】',
          desc: '政府突然宣布廢除大面額紙幣！全國銀行門口排起望不到頭的長龍，現金經濟瞬間凍結。與此同時，行動支付與數位金融如野火般爆發，整個社會迎來翻天覆地的洗牌！'
        },
        title: '【2019年 · 19歲】廢鈔長龍、數位支付爆發與階級跳躍',
        desc: '面對一夜之間現金歸零的社會混亂，你如何把握這場史無前例的數位大變革：',
        getOptions: () => [
          { text: '💻 開發本土化輕量微額行動支付 App，獲矽谷頂級風投千萬美元融資！', effects: { money: 75, intellect: 20, happiness: 16 }, log: '【19歲 ⚠️ 商業奇蹟】你踩準國家數位革命浪潮，一舉成為青年科技巨子！', next: 'in_26' },
          { text: '🤝 協助家族所有傳統店鋪全面完成數位化改造，挽救宗族生意。', effects: { eq: 22, money: 35, happiness: 14 }, log: '【19歲】你成為全家族主心骨，深受長輩尊崇。', next: 'in_26' },
          { text: '✈️ 抓住機會出國留學，成功拿下美國常春藤全額獎學金前往矽谷。', effects: { intellect: 25, money: -10, eq: 10 }, log: '【19歲】你跨出國門，邁向世界頂級科研舞台。', next: 'in_26' },
          { text: '🧘 看到無數貧苦群眾排隊受凍，發起青年義工團隊沿街發放食物與藥品。', effects: { happiness: 30, eq: 24, health: 6 }, log: '【19歲】你的善舉深受社會各界愛戴，積累無上福報。', next: 'in_26' }
        ]
      },
      'in_26': {
        year: 2026, age: 26, stage: '矽谷 H-1B 或本土王國', isHistoryCrisis: false,
        title: '【2026年 · 26歲】加州矽谷 vs 班加羅爾科技王國',
        desc: '二十六歲，拿到美國科技巨頭高薪 Offer 與宗族傳統包辦婚姻的抉擇：',
        getOptions: () => [
          { text: '✈️ 遠赴加州矽谷擔任首席架構師，年薪百萬美元，實現美國夢。', effects: { money: 90, intellect: 18, health: -14, happiness: 10 }, log: '【26歲】你站在全球科技之巔，實現資本飛躍。', next: 'in_35' },
          { text: '🇮🇳 留守班加羅爾創辦獨角獸科技企業，為國家創造數萬個就業崗位。', effects: { money: 85, eq: 20, intellect: 16, health: -18 }, log: '【26歲】你成為國家級青年商界領袖，榮耀無雙。', next: 'in_35' },
          { text: '💍 接受家族包辦婚姻與世家千金聯姻，整合兩大宗族商業帝國。', effects: { money: 80, eq: 16, happiness: 18, health: 6 }, log: '【26歲】家族勢力空前強大，生活優渥穩固。', next: 'in_35' },
          { text: '🧘 放棄所有名利，前往恆河源頭靜修院擔任瑜珈導師，追求心靈解脫。', effects: { happiness: 40, health: 26, eq: 16, money: -20 }, log: '【26歲】你擺脫世俗名利韁鎖，達到天人合一之境。', next: 'in_35' }
        ]
      },
      'in_35': {
        year: 2035, age: 35, stage: '三十五歲 · 宗族頂峰', isHistoryCrisis: false,
        title: '【2035年 · 35歲】全球巨頭董事會與宗族傳承',
        desc: '三十五歲，你已是跨國企業董事或富甲一方的宗族領袖，手握龐大資源：',
        getOptions: () => [
          { text: '🏥 拿出數千萬資產在家鄉援建大型現代化免費慈善醫院與希望小學。', effects: { happiness: 45, eq: 25, money: -40, health: 10 }, log: '【35歲】你造福桑梓，全邦民眾將你視為平民英雄。', next: 'in_65' },
          { text: '💼 繼續瘋狂併購全球科技企業，躋身福布斯全球富豪榜前列。', effects: { money: 140, intellect: 18, health: -28, happiness: -4 }, log: '【35歲】你登上世界財富頂峰，但身體嚴重透支！', next: 'in_65' },
          { text: '🏡 回歸家庭陪伴父母與兒女，在綠意盎然的莊園裡享受天倫之樂。', effects: { happiness: 35, health: 20, eq: 18, money: 10 }, log: '【35歲】你享受現世安穩，家庭融洽美滿。', next: 'in_65' },
          { text: '📖 將一生逆襲經驗寫成《從貧民窟到全球董事會》，激勵十億青年。', effects: { intellect: 25, happiness: 32, eq: 20 }, log: '【35歲】你的自傳成為全印度最暢銷的心靈導師名著。', next: 'in_65' }
        ]
      },
      'in_65': {
        year: 2065, age: 65, stage: '恆河晚霞 · 人生圓滿', isHistoryCrisis: false,
        title: '【2065年 · 65歲】恆河聖光、子孫繞膝與安詳回甘',
        desc: '六十五歲，回望跨越一個世紀的翻天巨變，你在親族簇擁中安度晚晴：',
        getOptions: () => [
          { text: '🌸 在莊嚴聖歌與兒孫滿堂的簇擁下含笑安詳閉目，靈魂圓滿解脫。', effects: { happiness: 45, eq: 30 }, log: '【65歲】你功德圓滿，完成了輝煌壯麗的跨世紀一生！', next: 'end' },
          { text: '🏛️ 將畢生千億家產轉化為永久慈善信託，全數資助貧寒學子攻讀理工。', effects: { happiness: 50, eq: 30 }, log: '【65歲】你的精神將化作恆星，永遠照亮大地。', next: 'end' },
          { text: '🍵 在聖城瓦拉納西靜坐冥想，帶著大平靜微笑化作恆河微風。', effects: { happiness: 45, health: 10 }, log: '【65歲】你超越塵世輪迴，歸於大安寧。', next: 'end' },
          { text: '🏡 與子孫講述六十年前那場泥地板球賽，在笑聲中告別人間。', effects: { happiness: 40, eq: 20 }, log: '【65歲】有情有義，此生無悔。', next: 'end' }
        ]
      }
    }
  }
};

// 遊戲即時狀態
let state = {
  birthCountry: null,
  familyBackground: null,
  selectedPerk: null,
  drawnPerks: [],
  stats: { intellect: 50, eq: 50, health: 60, happiness: 60, money: 20 },
  logs: [],
  currentEventId: null
};

// ================= BGM 音樂系統 =================
const bgm = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3');
bgm.loop = true;
bgm.volume = 0.35;
let isPlayingMusic = false;

function toggleMusic() {
  const icon = document.getElementById('bgm-icon');
  const text = document.getElementById('bgm-text');

  if (isPlayingMusic) {
    bgm.pause();
    isPlayingMusic = false;
    if (icon) icon.innerText = '🔇';
    if (text) text.innerText = 'BGM OFF';
  } else {
    bgm.play().then(() => {
      isPlayingMusic = true;
      if (icon) icon.innerText = '🎵';
      if (text) text.innerText = 'BGM ON';
    }).catch(() => {});
  }
}

function tryPlayMusicOnInteraction() {
  if (!isPlayingMusic) {
    bgm.play().then(() => {
      isPlayingMusic = true;
      const icon = document.getElementById('bgm-icon');
      const text = document.getElementById('bgm-text');
      if (icon) icon.innerText = '🎵';
      if (text) text.innerText = 'BGM ON';
    }).catch(() => {});
  }
}

// 四季動態光暈
function applySeasonEnvironment() {
  const h = state.stats.happiness;
  const hp = state.stats.health;
  let seasonKey = 'autumn';

  if (h >= 75 && hp >= 60) seasonKey = 'spring';
  else if (hp >= 70) seasonKey = 'summer';
  else if (h < 45 || hp < 45) seasonKey = 'winter';

  document.body.className = `bg-${seasonKey}`;
  const chassis = document.querySelector('.gameboy-chassis');
  if (chassis) chassis.className = `gameboy-chassis chassis-${seasonKey}`;
  const screen = document.querySelector('.screen-container');
  if (screen) screen.className = `screen-container screen-${seasonKey}`;
}

// 數值面板更新（只顯示資產值，乾淨大氣）
function updateStatsUI() {
  const panel = document.getElementById('stats-panel');
  applySeasonEnvironment();

  if (panel) {
    panel.innerHTML = `
      <div class="stat-box"><span class="stat-intellect">★ 智力:</span><span class="stat-val">${state.stats.intellect}</span></div>
      <div class="stat-box"><span class="stat-charm">◆ 情商:</span><span class="stat-val">${state.stats.eq}</span></div>
      <div class="stat-box"><span class="stat-physique">♥ 健康:</span><span class="stat-val">${state.stats.health}</span></div>
      <div class="stat-box"><span class="stat-happiness">☺ 幸福:</span><span class="stat-val">${state.stats.happiness}</span></div>
      <div class="stat-box" style="grid-column: span 2; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #9c6c28; font-weight: bold;">💰 資產值:</span>
        <strong style="color:#2c2f35; font-size: 13.5px;">${state.stats.money} 萬</strong>
      </div>
    `;
  }
}

// 主選單
function renderEraSelect() {
  const canvas = document.getElementById('game-canvas');
  const statsPanel = document.getElementById('stats-panel');
  const subHeader = document.getElementById('sub-header');

  document.body.className = 'bg-autumn';
  const chassis = document.querySelector('.gameboy-chassis');
  if (chassis) chassis.className = 'gameboy-chassis chassis-autumn';
  const screen = document.querySelector('.screen-container');
  if (screen) screen.className = 'screen-container screen-autumn';

  if (statsPanel) statsPanel.classList.add('hidden');
  if (subHeader) subHeader.innerText = 'MILLENNIUM 2000 SIMULATOR';

  let html = `
    <div style="margin: auto 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="tag-badge">千禧人生 · 四國命運</span>
        <button id="open-hof-btn" style="background: #e9e4d6; border: 1px solid #4a483e; border-radius: 12px; font-size: 10px; font-weight: bold; padding: 2px 8px; cursor: pointer;">
          🏆 人生紀念冊
        </button>
      </div>
      
      <div style="background: #ffffff; border: 2px solid #d4cbb8; border-radius: 10px; padding: 14px; text-align: center; margin-bottom: 14px;">
        <div style="font-size: 32px; margin-bottom: 6px;">📟</div>
        <h2 style="font-size: 15px; color: #2c2f35; margin-bottom: 4px;">【千禧 2000 年代】</h2>
        <p style="font-size: 11px; color: #666; line-height: 1.6;">
          港 / 日 / 英 / 印 四大國度完全獨立一生 · 專屬歷史<br>
          壽命受<strong>「健康值」</strong>即時影響，隨時可能猝死或頤養天年！
        </p>
      </div>

      <button id="start-journey-btn" class="pixel-btn" style="background: #4a483e; color: #ffffff; text-align: center; padding: 13px;">
        🎲 開啟命運投胎 (START LIFE)
      </button>
    </div>
  `;

  if (canvas) {
    canvas.innerHTML = html;
    const startBtn = document.getElementById('start-journey-btn');
    if (startBtn) {
      startBtn.onclick = () => {
        tryPlayMusicOnInteraction();
        startCountryRouletteAnimation();
      };
    }

    const hofBtn = document.getElementById('open-hof-btn');
    if (hofBtn) hofBtn.onclick = showHallOfFame;
  }
}

// 🎲 輪盤滾動選國度動畫（單一發光定格）
function startCountryRouletteAnimation() {
  const existingOverlay = document.getElementById('roulette-overlay');
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement('div');
  overlay.id = 'roulette-overlay';
  overlay.className = 'roulette-screen-overlay';

  let gridHtml = '';
  birthCountries.forEach((c, idx) => {
    gridHtml += `
      <div class="country-box" id="country-box-${idx}">
        <img src="${c.flagUrl}" class="flag-img" alt="${c.name}">
        <div class="name">${c.name}</div>
        <div class="desc">${c.desc}</div>
      </div>
    `;
  });

  overlay.innerHTML = `
    <div class="roulette-title">
      <h2>✦ 命運輪盤 · 正在隨機轉生 ✦</h2>
      <p>正在定位你的出生國度與家庭背景...</p>
    </div>
    <div class="country-grid-stage">
      ${gridHtml}
    </div>
    <button id="roulette-next-btn" class="roulette-proceed-btn" style="display: none;">
      ▶ 定格完畢 · 抽取天賦卡
    </button>
  `;

  document.body.appendChild(overlay);

  const targetCountryIdx = Math.floor(Math.random() * birthCountries.length);
  state.birthCountry = birthCountries[targetCountryIdx];
  state.familyBackground = familyBackgrounds[Math.floor(Math.random() * familyBackgrounds.length)];

  let currentIndex = 0;
  let speed = 70;
  let steps = 0;
  const minSteps = 24;

  function flashStep() {
    birthCountries.forEach((_, i) => {
      const box = document.getElementById(`country-box-${i}`);
      if (box) box.classList.remove('active-flash', 'final-locked');
    });

    const activeBox = document.getElementById(`country-box-${currentIndex}`);
    if (activeBox) activeBox.classList.add('active-flash');

    steps++;
    currentIndex = (currentIndex + 1) % birthCountries.length;

    if (steps > minSteps && currentIndex === targetCountryIdx) {
      setTimeout(() => {
        birthCountries.forEach((_, i) => {
          const b = document.getElementById(`country-box-${i}`);
          if (b) b.classList.remove('active-flash', 'final-locked');
        });

        const finalBox = document.getElementById(`country-box-${targetCountryIdx}`);
        if (finalBox) finalBox.classList.add('final-locked');

        const titleP = overlay.querySelector('.roulette-title p');
        if (titleP) {
          titleP.innerHTML = `命中！降生於 <strong>${state.birthCountry.name}</strong> · <strong>${state.familyBackground.name}</strong>`;
        }

        const nextBtn = document.getElementById('roulette-next-btn');
        if (nextBtn) {
          nextBtn.style.display = 'block';
          nextBtn.onclick = () => {
            overlay.style.transition = 'opacity 0.4s ease';
            overlay.style.opacity = '0';
            setTimeout(() => {
              overlay.remove();
              triggerFullscreenGacha();
            }, 400);
          };
        }
      }, 200);
    } else {
      if (steps > minSteps - 8) speed += 35;
      setTimeout(flashStep, speed);
    }
  }

  flashStep();
}

// 3D 爆裂抽天賦卡
function triggerFullscreenGacha() {
  const shuffled = [...allPerks].sort(() => 0.5 - Math.random());
  state.drawnPerks = shuffled.slice(0, 5);
  state.selectedPerk = null;

  const existingOverlay = document.getElementById('fullscreen-gacha-overlay');
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement('div');
  overlay.id = 'fullscreen-gacha-overlay';
  overlay.className = 'gacha-screen-overlay';

  let cardsHtml = '';
  state.drawnPerks.forEach(perk => {
    cardsHtml += `
      <div class="gacha-card-item" data-id="${perk.id}">
        <div class="gacha-card-inner">
          <div class="gacha-card-icon">${perk.icon}</div>
          <div class="gacha-card-name">${perk.name}</div>
          <div class="gacha-card-desc">${perk.desc}</div>
          <div class="gacha-card-status">點擊挑選</div>
        </div>
      </div>
    `;
  });

  overlay.innerHTML = `
    <div style="text-align: center; margin-bottom: 18px;">
      <h2 style="font-size: 20px; color: #f7e6c4; letter-spacing: 2px;">✦ 挑選你的天賦神力 ✦</h2>
      <p style="font-size: 11.5px; color: #a89f91; margin-top: 4px; display:flex; align-items:center; justify-content:center;">
        出生於: <img src="${state.birthCountry.flagUrl}" class="flag-img-small" style="margin-left:6px;"> ${state.birthCountry.name} · ${state.familyBackground.name}
      </p>
    </div>
    <div class="gacha-cards-stage">
      ${cardsHtml}
    </div>
    <button id="gacha-confirm-action" class="gacha-confirm-btn" disabled>
      ▶ 確定天賦 · 降臨人世 (START)
    </button>
  `;

  document.body.appendChild(overlay);

  const cardElements = overlay.querySelectorAll('.gacha-card-item');
  const confirmBtn = document.getElementById('gacha-confirm-action');

  cardElements.forEach(card => {
    card.onclick = () => {
      cardElements.forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.gacha-card-status').innerText = '點擊挑選';
      });

      card.classList.add('selected');
      card.querySelector('.gacha-card-status').innerText = '✓ 已選定';
      state.selectedPerk = card.dataset.id;
      if (confirmBtn) confirmBtn.removeAttribute('disabled');
    };
  });

  confirmBtn.onclick = () => {
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      startLifeSimulation();
    }, 400);
  };
}

// 開始人生
function startLifeSimulation() {
  const statsPanel = document.getElementById('stats-panel');
  const subHeader = document.getElementById('sub-header');

  state.stats = { ...state.birthCountry.stats };

  for (const [k, v] of Object.entries(state.familyBackground.stats)) {
    state.stats[k] = (state.stats[k] || 0) + v;
  }
  const perk = allPerks.find(p => p.id === state.selectedPerk);
  if (perk && perk.stats) {
    for (const [k, v] of Object.entries(perk.stats)) {
      state.stats[k] = (state.stats[k] || 0) + v;
    }
  }

  state.logs = [`【2000年 0歲】你降生於【${state.birthCountry.name}】的【${state.familyBackground.name}】，天賦為【${perk ? perk.name : ''}】。`];
  
  const currentTimeline = nationTimelines[state.birthCountry.timelineId];
  state.currentEventId = currentTimeline.startEvent;

  if (subHeader) subHeader.innerText = `${state.birthCountry.name} | ${state.familyBackground.name}`;
  if (statsPanel) statsPanel.classList.remove('hidden');
  updateStatsUI();
  renderLocalizedEvent(state.currentEventId);
}

// 🚨 渲染事件節點（嚴格 4 個選項 + 猝死判定 + 歷史全屏動畫）
function renderLocalizedEvent(eventId) {
  const canvas = document.getElementById('game-canvas');
  if (eventId === 'end') {
    renderEnding();
    return;
  }

  // 核心健康壽命判定：健康值 <= 15 提前病逝/猝死
  if (state.stats.health <= 15) {
    renderPrematureDeath();
    return;
  }

  const currentTimeline = nationTimelines[state.birthCountry.timelineId];
  const scene = currentTimeline.events[eventId];

  if (!scene) {
    renderEnding();
    return;
  }

  // 只有重大歷史黑天鵝才觸發全螢幕震撼飛出 Hold 住 3 秒
  if (scene.isHistoryCrisis && !scene.crisisNoticeShown) {
    scene.crisisNoticeShown = true;
    showCrisisModal(scene.crisisNotice, () => {
      proceedRenderEventContent();
    });
    return;
  }

  proceedRenderEventContent();

  function proceedRenderEventContent() {
    const options = scene.getOptions(state.selectedPerk);

    let html = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="tag-badge">${scene.stage}</span>
          <span style="font-size: 11px; font-weight: 900; color: #c4573f;">【${scene.year}年 · ${scene.age}歲】</span>
        </div>
        <div class="dialog-box">
          <strong style="display: block; margin-bottom: 4px; font-size: 13.5px;">${scene.title}</strong>
          ${scene.desc}
        </div>
      </div>
      <div style="margin-top: 4px; max-height: 290px; overflow-y: auto;">
    `;

    options.forEach((opt, idx) => {
      const isPerkOption = !!opt.isPerk;
      const highlightStyle = isPerkOption ? 'border: 2px solid #b86b88; background: #fff5f8;' : '';
      html += `
        <button class="pixel-btn opt-btn" data-idx="${idx}" style="${highlightStyle}">
          ${opt.text}
        </button>
      `;
    });

    html += `</div>`;
    if (canvas) {
      canvas.innerHTML = html;
      canvas.querySelectorAll('.opt-btn').forEach(btn => {
        btn.onclick = () => {
          tryPlayMusicOnInteraction();
          chooseLocalizedOption(eventId, parseInt(btn.dataset.idx));
        };
      });
    }
  }
}

// 💥 重大歷史事件全螢幕震撼飛出動畫
function showCrisisModal(notice, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'crisis-modal-overlay';
  modal.innerHTML = `
    <div class="crisis-card-box">
      <div class="crisis-badge-glow">${notice.tag}</div>
      <h3 class="crisis-title-text">${notice.title}</h3>
      <div class="crisis-body-desc">${notice.desc}</div>
      <button id="crisis-confirm-btn" class="crisis-enter-btn" disabled>
        ⏳ 時代巨浪衝擊中 (3s)...
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  const confirmBtn = document.getElementById('crisis-confirm-btn');
  let countdown = 3;

  const timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      confirmBtn.innerText = `⏳ 時代巨浪衝擊中 (${countdown}s)...`;
    } else {
      clearInterval(timer);
      confirmBtn.removeAttribute('disabled');
      confirmBtn.innerText = '⚠️ 直面歷史浪潮 (PROCEED)';
    }
  }, 1000);

  confirmBtn.onclick = () => {
    modal.style.transition = 'opacity 0.4s ease';
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
      onConfirm();
    }, 400);
  };
}

function chooseLocalizedOption(eventId, optionIdx) {
  const currentTimeline = nationTimelines[state.birthCountry.timelineId];
  const scene = currentTimeline.events[eventId];
  const opt = scene.getOptions(state.selectedPerk)[optionIdx];

  for (const [stat, val] of Object.entries(opt.effects)) {
    state.stats[stat] = Math.max(0, (state.stats[stat] || 0) + val);
  }
  state.logs.push(opt.log);
  updateStatsUI();
  renderLocalizedEvent(opt.next);
}

// 💀 健康歸零的英年早逝結算
function renderPrematureDeath() {
  const canvas = document.getElementById('game-canvas');
  let deathReason = "因長期超負荷工作與過度壓抑，身體器官徹底衰竭，在醫院病榻上溘然長逝。";
  if (state.birthCountry.id === 'jp') deathReason = "因長年日夜無休加班應酬，在東京深夜末班電車中突發心肌梗塞，英年早逝（過勞死）。";
  if (state.birthCountry.id === 'hk') deathReason = "因長期捱夜高壓打拼與飲食失調，突發心腦血管急性病症，在瑪麗醫院搶救無效離世。";

  const title = "【★ 燃燒殆盡的流星 · 遺憾早逝 ★】";

  saveAchievement({
    title,
    date: new Date().toLocaleDateString(),
    country: state.birthCountry.name,
    flagUrl: state.birthCountry.flagUrl,
    family: state.familyBackground.name,
    desc: deathReason
  });

  let html = `
    <div>
      <div style="text-align: center; background: #2a151b; border: 2px solid #e63946; border-radius: 8px; padding: 10px;">
        <span style="font-size: 10px; font-weight: 900; color: #ff758f; display: block; letter-spacing: 1px;">=== 生命提前終結 (健康崩潰) ===</span>
        <h2 style="font-size: 14px; color: #fff; margin-top: 3px;">${title}</h2>
      </div>
      <div class="dialog-box" style="margin-top: 8px; background:#fff5f6; border-color:#e63946;">${deathReason}</div>
      
      <div class="log-scroll-area">
        <span style="font-size: 9.5px; color: #666; font-weight: 700; display: block; margin-bottom: 4px;">▶ 生前大事紀回顧：</span>
        ${state.logs.map(log => `<div class="log-item">${log}</div>`).join('')}
      </div>
    </div>

    <button id="restart-btn" class="pixel-btn" style="background: #e63946; color: #ffffff; text-align: center; margin-top: 10px;">
      🔄 帶著教訓開啟下一世 (RESTART)
    </button>
  `;
  if (canvas) {
    canvas.innerHTML = html;
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.onclick = renderEraSelect;
  }
}

// 正常壽終正寢結算
function renderEnding() {
  const canvas = document.getElementById('game-canvas');
  let title = "【★ 踏實圓滿的一生 ★】";
  let desc = `你在【${state.birthCountry.name}】度過了跌宕起伏但無悔的一生，守護住了至親至愛與內心的安寧。`;

  if (state.stats.money >= 100 && state.stats.happiness >= 75) {
    title = "【★ 跨世紀傳奇巨擘 ★】";
    desc = "你兼顧了極致財富與心靈自由，在國家與時代的浪潮裡活出了無數人敬仰的傳奇！";
  } else if (state.stats.intellect >= 85) {
    title = "【★ 時代先鋒智者 ★】";
    desc = "你的卓越認知與專業成就，為這片土地與下一代留下了寶貴的思想遺產。";
  } else if (state.stats.happiness >= 85) {
    title = "【★ 終極通透的自在靈魂 ★】";
    desc = "無論時代如何變遷，你一生始終溫柔真誠，活出了最高境界的心靈自洽！";
  }

  saveAchievement({
    title,
    date: new Date().toLocaleDateString(),
    country: state.birthCountry.name,
    flagUrl: state.birthCountry.flagUrl,
    family: state.familyBackground.name,
    desc
  });

  let html = `
    <div>
      <div style="text-align: center; background: #ffffff; border: 2px solid rgba(0,0,0,0.15); border-radius: 8px; padding: 10px;">
        <span style="font-size: 10px; font-weight: 900; display: block; letter-spacing: 1px;">=== 人生終章圓滿結算 ===</span>
        <h2 style="font-size: 14px; margin-top: 3px;">${title}</h2>
      </div>
      <div class="dialog-box" style="margin-top: 8px;">${desc}</div>
      
      <div class="log-scroll-area">
        <span style="font-size: 9.5px; color: #666; font-weight: 700; display: block; margin-bottom: 4px;">▶ 一生大事紀回顧：</span>
        ${state.logs.map(log => `<div class="log-item">${log}</div>`).join('')}
      </div>
    </div>

    <button id="restart-btn" class="pixel-btn" style="background: rgba(0,0,0,0.7); color: #ffffff; text-align: center; margin-top: 10px;">
      🔄 開啟下一世輪迴 (RESTART)
    </button>
  `;
  if (canvas) {
    canvas.innerHTML = html;
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.onclick = renderEraSelect;
  }
}

// 圖鑑系統
function saveAchievement(record) {
  let list = JSON.parse(localStorage.getItem('life_achievements') || '[]');
  list.unshift(record);
  if (list.length > 20) list.pop();
  localStorage.setItem('life_achievements', JSON.stringify(list));
}

function showHallOfFame() {
  const list = JSON.parse(localStorage.getItem('life_achievements') || '[]');
  const modal = document.createElement('div');
  modal.className = 'hall-of-fame-modal';

  let itemsHtml = list.length === 0 
    ? '<p style="text-align:center; font-size:12px; color:#666;">暫未解鎖人生圖鑑，快去通關一次吧！</p>'
    : list.map((item) => `
        <div class="hof-item">
          <img src="${item.flagUrl || 'https://flagcdn.com/w80/hk.png'}" class="flag-img-small" style="width:24px; height:16px;">
          <div>
            <strong style="font-size: 13px; color:#2c2f35;">${item.title}</strong>
            <div style="font-size: 10px; color:#888; margin-top:2px;">${item.country} · ${item.family} (${item.date})</div>
            <div style="font-size: 10.5px; color:#555; margin-top:2px;">${item.desc}</div>
          </div>
        </div>
      `).join('');

  modal.innerHTML = `
    <div class="hof-card-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="font-size:15px;">🏆 人生紀念冊 (已收集 ${list.length} 條)</h3>
        <button id="close-hof-btn" style="background:none; border:none; font-size:16px; cursor:pointer;">✖</button>
      </div>
      <div>${itemsHtml}</div>
    </div>
  `;

  document.body.appendChild(modal);
  document.getElementById('close-hof-btn').onclick = () => modal.remove();
}

const bgmBtn = document.getElementById('bgm-toggle');
if (bgmBtn) {
  bgmBtn.onclick = toggleMusic;
}

renderEraSelect();
