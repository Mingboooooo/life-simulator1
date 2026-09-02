// 寫實人生模擬器：嚴格保證每段4大選項 + 危機飛出Hold住3秒 + 修正輪盤雙發光BUG版

// 1. 出生國度庫
const birthCountries = [
  {
    id: 'hk',
    flagUrl: 'https://flagcdn.com/w80/hk.png',
    name: '中國香港',
    desc: '高密度都市霓虹，屋邨人情、名校補習街與茶餐廳煙火氣。',
    stats: { money: 10, eq: 8 }
  },
  {
    id: 'jp',
    flagUrl: 'https://flagcdn.com/w80/jp.png',
    name: '日本東京',
    desc: '少子化與匠人文化，保育園木地板、祭典撈金魚與社團朝練。',
    stats: { happiness: 8, eq: 6 }
  },
  {
    id: 'uk',
    flagUrl: 'https://flagcdn.com/w80/gb.png',
    name: '英國倫敦',
    desc: '陰雨午後與獨立搖滾，二手黑膠店、草地足球與紳士學院。',
    stats: { intellect: 8, happiness: 6 }
  },
  {
    id: 'in',
    flagUrl: 'https://flagcdn.com/w80/in.png',
    name: '印度班加羅爾',
    desc: '科技樞紐與宗族社會，街頭板球、香料奶茶與極致理工大考。',
    stats: { intellect: 10, health: 6 }
  }
];

// 2. 原生家庭背景
const familyBackgrounds = [
  { id: 'working', name: '市井工薪家庭', desc: '生活節儉樸實，磨練出極強的適應力與人情味。', stats: { health: 10, eq: 8, money: 5 } },
  { id: 'middle', name: '書香中產家庭', desc: '注重教育與技能培養，穩定但伴隨同儕期望壓力。', stats: { intellect: 10, money: 20, happiness: 5 } },
  { id: 'merchant', name: '經商實業世家', desc: '自幼耳濡目染商業交易，本金充裕但家族風險共擔。', stats: { money: 40, intellect: 6, health: -5 } }
];

// 3. 核心天賦庫
const allPerks = [
  { id: 'geek', icon: '🧠', name: '邏輯極客', desc: '智力+15。對代碼與演算法極度敏銳，解鎖前沿科技路線。', stats: { intellect: 15 } },
  { id: 'music', icon: '🎸', name: '絕對音感', desc: '情商+10、幸福+10。天生旋律直覺，解鎖獨立音樂創作路線。', stats: { eq: 10, happiness: 10 } },
  { id: 'leader', icon: '🤝', name: '天生領袖', desc: '情商+15、資產+5。人脈與領導氣場強大，解鎖早期合夥創業路線。', stats: { eq: 15, money: 5 } },
  { id: 'iron', icon: '🏃', name: '鋼鐵體魄', desc: '健康+20。天生抗壓與極佳體能，解鎖高強度競技與戶外探險。', stats: { health: 20 } },
  { id: 'wealth', icon: '💎', name: '商道敏銳', desc: '資產+20、智力+5。早期資本嗅覺充沛，解鎖頂尖投資賽道。', stats: { money: 20, intellect: 5 } },
  { id: 'zen', icon: '🕊️', name: '通透心境', desc: '幸福+20、健康+5。看淡內耗與世俗焦慮，逆境中自動守護心靈自由。', stats: { happiness: 20, health: 5 } }
];

// 4. 千禧 2000 主線：每個階段嚴格保證固定 4 個選項！
const localizedScenes = {
  // 【3歲 幼兒啟蒙】
  '3yo': {
    year: 2003, age: 3, stage: '幼兒啟蒙', isCrucial: false,
    titles: {
      hk: '【2003年 · 3歲】公屋走廊與戴口罩的童年',
      jp: '【2003年 · 3歲】保育園木地板上的積木午後',
      uk: '【2003年 · 3歲】後花園濕草地與壁爐旁的雨聲',
      in: '【2003年 · 3歲】家族大院裡的香料氣息與風箏'
    },
    descs: {
      hk: '那一年全港幼稚園停課，長輩每日用滴露抹地。你在狹窄的屋邨客廳地墊上度過漫長午後：',
      jp: '東京微涼的春天，保育園老師帶著大家在榻榻米上閱讀繪本、動手做手工：',
      uk: '倫敦窗外陰雨綿綿，收音機播著英倫搖滾，你在地毯上擺弄各種木製火車軌道：',
      in: '班加羅爾炎熱的午後，家族幾代人圍坐天井，孩子們在泥地追逐打鬧：'
    },
    getOptions: (countryId, userPerk) => {
      const isMusic = userPerk === 'music';
      return [
        {
          text: countryId === 'hk' ? '🧩 靜靜坐喺地墊砌積木、拆解舊收音機摸索齒輪零件。' : '🧩 靜態專注摸索拼圖與拆解模型。',
          effects: { intellect: 8, eq: -2, happiness: 6 },
          log: '【3歲】你展現出細膩的結構專注力，在安靜中自得其樂。',
          nextEventId: '8yo'
        },
        {
          text: countryId === 'hk' ? '🏃 踩住涼鞋跑出公屋長走廊，同隔籬鄰居細路踢西瓜波。' : '🏃 穿上運動鞋在庭院或街巷盡情奔跑玩耍。',
          effects: { health: 10, eq: 8, happiness: 8 },
          log: '【3歲】你性格好動爽朗，在街坊歡笑中成長。',
          nextEventId: '8yo'
        },
        {
          text: countryId === 'hk' ? '🖍️ 攞住蠟筆喺全屋牆壁塗鴉，模仿電視卡通天馬行空。' : '🖍️ 用顏色蠟筆繪畫天真爛漫的奇妙世界。',
          effects: { happiness: 12, intellect: 4, eq: 4 },
          log: '【3歲】你對色彩與圖像非常敏銳，想像力充沛。',
          nextEventId: '8yo'
        },
        isMusic ? {
          isPerk: true,
          text: '★【天賦專屬】手指輕撥玩具木結他，無師自通彈出兒歌副歌旋律。',
          effects: { eq: 16, happiness: 18, intellect: 6 },
          log: '【3歲 隱藏才華】你展露出驚人的絕對音感，震驚了全家人。',
          nextEventId: '8yo'
        } : {
          text: countryId === 'hk' ? '🍵 跟阿爺阿嫲落樓下茶餐廳飲茶走、食新鮮出爐菠蘿油。' : '🍞 陪伴家人享受悠閒平淡的午後點心時光。',
          effects: { happiness: 10, eq: 8, health: 4 },
          log: '【3歲】你在充滿煙火氣的關愛中慢慢長大。',
          nextEventId: '8yo'
        }
      ];
    }
  },

  // 【8歲 小學時期 · 2008 金融海嘯（帶飛出震撼動畫）】
  '8yo': {
    year: 2008, age: 8, stage: '時代黑天鵝', isCrucial: true,
    crisisNotice: {
      tag: '⚠️ 全球黑天鵝危機降臨 ⚠️',
      title: '【2008年 雷曼風暴與金融海嘯】',
      desc: '華爾街百年一遇金融海嘯席捲全球！恒指暴跌、裁員減薪潮殺到眼前。大人的眉頭深鎖，茶餐廳電視機整日直播股市熔斷。這場風暴，讓你看清了金錢與現實的份量！'
    },
    titles: {
      hk: '【2008年 · 8歲】雷曼風暴、奧運熱潮與茶餐廳餐桌',
      jp: '【2008年 · 8歲】不景氣陰影與棒球部熱血練習',
      uk: '【2008年 · 8歲】工廠裁員潮與街角獨立黑膠唱片店',
      in: '【2008年 · 8歲】外包訂單劇減與家族升學期望'
    },
    descs: {
      hk: '那一年全城瘋看北京奧運，但另一邊金融海嘯衝擊生計，家裡開支緊縮：',
      jp: '企業縮減開支，身邊大人的神情凝重，放學後的社團活動依舊在繼續：',
      uk: '老牌城鎮面臨不景氣，社區老店陸續結業，學校鼓勵大家參與社區才藝：',
      in: '歐美科技外包訂單急跌，家長更嚴厲地督促孩子苦讀理工科：'
    },
    getOptions: (countryId, userPerk) => {
      const isMusic = userPerk === 'music';
      return [
        {
          text: countryId === 'hk' ? '📚 放學準時到深水埗/太子補習社苦讀，默書爭取全班第一讓父母安心。' : '📚 課後參加密集補習，在升學競爭中力爭上游。',
          effects: { intellect: 14, eq: 4, happiness: -4 },
          log: '【8歲】你提早體會現實壓力，用優異成績回報家庭。',
          nextEventId: '12yo'
        },
        {
          text: countryId === 'hk' ? '⚽ 報名小學田徑與足球隊，在烈日泥地打硬仗，強身健體。' : '⚽ 參加校園競技體育，風雨不改鍛鍊堅韌心智。',
          effects: { health: 16, eq: 8, happiness: 6 },
          log: '【8歲】運動塑造了你堅忍不拔的性格與好體魄。',
          nextEventId: '12yo'
        },
        {
          text: countryId === 'hk' ? '🪙 懂事幫手分擔家務，主動將儲蓄錢罌交畀阿媽應急。' : '🪙 節省零用錢並默默協助家務，體諒父母艱辛。',
          effects: { eq: 16, happiness: 12, money: 5 },
          log: '【8歲】你的貼心懂事成為艱難時期家庭最溫暖的依靠。',
          nextEventId: '12yo'
        },
        isMusic ? {
          isPerk: true,
          text: countryId === 'hk' ? '★【天賦專屬】戴起 MP3 反覆聽 Beyond 與廣東歌，木結他掃弦彈出撫慰心靈的旋律。' : '★【天賦專屬】在樂器旋律中寄託情感，展露驚人音樂天賦。',
          effects: { eq: 22, happiness: 24, intellect: 8 },
          log: '【8歲 ⚠️ 隱藏天賦】音樂成為你最堅強的心靈避難所，治癒了周圍的人。',
          nextEventId: '12yo'
        } : {
          text: countryId === 'hk' ? '🪀 放學同死黨在屋邨石凳鬥爆旋陀螺與激戰四驅車，忘卻煩惱。' : '🪀 與童年好友在街角打鬧嬉戲，收穫純真童年。',
          effects: { happiness: 16, eq: 10, money: -3 },
          log: '【8歲】那是沒有智慧手機年代最純粹燦爛的回憶。',
          nextEventId: '12yo'
        }
      ];
    }
  },

  // 【12歲 初中叛逆與數碼崛起】
  '12yo': {
    year: 2012, age: 12, stage: '智慧手機普及', isCrucial: false,
    titles: {
      hk: '【2012年 · 12歲】智慧手機、高登論壇與天台風',
      jp: '【2012年 · 12歲】LINE群組、秋葉原與二次元啟蒙',
      uk: '【2012年 · 12歲】倫敦奧運之夏、耳機與地下車庫',
      in: '【2012年 · 12歲】廉價智慧手機普及與編程狂熱'
    },
    descs: {
      hk: '智慧手機與高登論壇全面爆發，同學都在玩神魔之塔與追神劇，你的青春時光交給：',
      jp: '社群網絡與智慧手機融入生活，同儕間的空氣閱讀與自我定位考驗著你：',
      uk: '倫敦奧運充滿搖滾氛圍，街頭文化蓬勃發展，你的精力投入在：',
      in: '平價網絡引爆全國，身邊同齡人開始瘋狂自學代碼希望改變命運：'
    },
    getOptions: (countryId, userPerk) => {
      const isGeek = userPerk === 'geek';
      return [
        {
          text: countryId === 'hk' ? '📚 埋頭苦讀衝刺傳統英中名校精英班，謝絕所有網絡娛樂。' : '📚 專注學業競賽，心無旁騖攻讀重點學科。',
          effects: { intellect: 16, eq: -2, happiness: -4 },
          log: '【12歲】你在成績榜名列前茅，但內心也早早感受到競爭的枯燥。',
          nextEventId: '18yo'
        },
        {
          text: countryId === 'hk' ? '🤝 放學同死黨搭地鐵去葵涌廣場掃街、在天台吹風講心事。' : '🤝 與好友結伴漫遊城市街角，暢談青春夢想。',
          effects: { eq: 16, happiness: 16, health: 6 },
          log: '【12歲】你收穫了毫無雜質的真摯友情，青春閃閃發亮。',
          nextEventId: '18yo'
        },
        {
          text: countryId === 'hk' ? '🎧 戴起耳機沉迷日系搖滾、City Pop，開始嘗試寫詞彈歌。' : '🎧 沉浸在音樂旋律的世界裡，尋求自我精神共鳴。',
          effects: { eq: 14, happiness: 16, intellect: 4 },
          log: '【12歲】你學會用音樂與審美建立起獨特的感性世界。',
          nextEventId: '18yo'
        },
        isGeek ? {
          isPerk: true,
          text: countryId === 'hk' ? '★【天賦專屬】自學越獄 iOS 系統、編寫高登論壇輔助腳本與搶票爬蟲。' : '★【天賦專屬】自學開源代碼，架設私人伺服器與研發遊戲。',
          effects: { intellect: 25, money: 15, happiness: 12 },
          log: '【12歲 ⚠️ 隱藏天賦】你在代碼世界找到屬於自己的主場，建立起極客思維。',
          nextEventId: '18yo'
        } : {
          text: countryId === 'hk' ? '🏀 日日放學在街場打籃球鬥波直到熄燈，練出鋼鐵體格。' : '🏀 每天在球場揮灑汗水，練就一身敏捷運動神經。',
          effects: { health: 18, eq: 8, happiness: 12 },
          log: '【12歲】你擁有一副強健身軀，性格陽光豁達。',
          nextEventId: '18yo'
        }
      ];
    }
  },

  // 【18歲 成年抉擇 · DSE 放榜（帶飛出震撼動畫）】
  '18yo': {
    year: 2018, age: 18, stage: '成人禮 · 命運分水嶺', isCrucial: true,
    crisisNotice: {
      tag: '🎓 人生第一個命運十字路口 🎓',
      title: '【2018年 成人禮與公開試放榜】',
      desc: '十八歲的盛夏，成績單握在手中！身邊同窗有人衝入傳統名校專科、有人遠赴海外、有人投身社會自力更生。這張薄薄的紙，將徹底改寫你人生的軌跡！'
    },
    titles: {
      hk: '【2018年 · 18歲】DSE 放榜、聯招志願與人生分流',
      jp: '【2018年 · 18歲】大學入試與東京獨居新生活',
      uk: '【2018年 · 18歲】A-Level 放榜與學院賽道',
      in: '【2018年 · 18歲】JEE 殘酷大考與全族期盼'
    },
    descs: {
      hk: '公開試放榜，面對香港極度現實的社會階梯與昂貴租金，你的成人抉擇：',
      jp: '告別故鄉前往繁華都會，面對人生第一張獨立入場券：',
      uk: '成年之際，面對傳統學院深造還是自立打拼的交叉點：',
      in: '百萬考生的千軍萬馬過獨木橋，你將怎樣定義自己的人生：'
    },
    getOptions: (countryId, userPerk) => {
      const isLeader = userPerk === 'leader';
      const isGeek = userPerk === 'geek';
      return [
        {
          text: countryId === 'hk' ? '🎓 考入港大/中大實用專業（醫療/物理治療/法學/會計），按部就班走菁英路線。' : '🎓 考入名牌頂尖大學核心專業，打好專業基石。',
          effects: { intellect: 22, money: -10, eq: 6 },
          log: '【18歲 ⚠️ 命運轉折】你拿到了主流社會的菁英入場券，深耕專業。',
          nextEventId: '20yo'
        },
        {
          text: countryId === 'hk' ? '🎨 堅持攻讀心愛的設計、音樂或傳播學，在火炭/觀塘工廈租迷你單位創作。' : '🎨 堅持選擇心愛的藝術創作，拒絕世俗標準模板。',
          effects: { happiness: 25, eq: 14, health: 6 },
          log: '【18歲 ⚠️ 命運轉折】你用純粹的熱愛與靈魂定義自己的青春。',
          nextEventId: '20yo'
        },
        {
          text: countryId === 'hk' ? '💼 提早投身社會全職打拼或學扎實技術，半工讀累積啟動資金。' : '💼 提早進入社會職場實戰，比同齡人更快理解商業現實。',
          effects: { money: 35, eq: 14, health: 4, intellect: -4 },
          log: '【18歲 ⚠️ 命運轉折】你提早嚐遍人情冷暖，累積踏實本金。',
          nextEventId: '20yo'
        },
        isLeader ? {
          isPerk: true,
          text: countryId === 'hk' ? '★【天賦專屬】聯合死黨創立青年潮流選品店與自媒體品牌，自立門戶當老闆。' : '★【天賦專屬】憑藉非凡人脈凝聚力合夥創業，開啟商業藍圖。',
          effects: { money: 45, eq: 22, intellect: 10 },
          log: '【18歲 ⚠️ 命運轉折】你提早踏上商業領袖之路，展現過人魄力。',
          nextEventId: '20yo'
        } : isGeek ? {
          isPerk: true,
          text: countryId === 'hk' ? '★【天賦專屬】憑開源演算法大獎獲矽谷/頂尖科研特招，拿到全額獎學金。' : '★【天賦專屬】以頂尖技術硬實力入選前沿科研實驗室。',
          effects: { intellect: 30, money: 25, happiness: 15 },
          log: '【18歲 ⚠️ 命運轉折】你憑硬核實力叩開全球科技前沿大門。',
          nextEventId: '20yo'
        } : {
          text: countryId === 'hk' ? '✈️ 申請工作假期（Working Holiday）遠赴澳洲/英國，用勞力換取開闊眼界。' : '✈️ 背起行囊遊歷世界，在陌生國度尋找人生答案。',
          effects: { happiness: 22, eq: 14, money: -5 },
          log: '【18歲】你在遠方異國見識到廣闊的世界，心胸開朗。',
          nextEventId: '20yo'
        }
      ];
    }
  },

  // 【20歲 歷史大事件 · 世紀疫情封閉（帶飛出震撼動畫）】
  '20yo': {
    year: 2020, age: 20, stage: '時代黑天鵝', isCrucial: true,
    crisisNotice: {
      tag: '🚨 全球歷史大考驗 🚨',
      title: '【2020年 世紀疫情與全球停擺】',
      desc: '百年一遇的全球疫情爆發！各國關閉邊境、學校網課、商場冷清。空蕩蕩的街頭與每日更新的數字，讓世界的喧囂驟停。在孤獨的隔離中，每個人都必須學會與自己獨處！'
    },
    titles: {
      hk: '【2020年 · 20歲】空蕩的彌敦道、Zoom 網課與遠端革命',
      jp: '【2020年 · 20歲】緊急事態宣言、澀谷街頭與孤獨修煉',
      uk: '【2020年 · 20歲】封鎖下的倫敦公寓與陽台吉他',
      in: '【2020年 · 20歲】世紀封控下的大家庭互助'
    },
    descs: {
      hk: '全球疫情爆發，繁華的香港街頭變得安靜，隔著螢幕過日子成為新常態：',
      jp: '緊急事態宣言下，東京街頭人影稀疏，線上授課與遠端生活全面展開：',
      uk: '城市經歷漫長封閉，面對孤獨與不確定性，你如何安放自己的身心：',
      in: '全城停擺，家庭與宗族成員在狹小空間相互扶持，面對現實考驗：'
    },
    getOptions: (countryId, userPerk) => {
      const isZen = userPerk === 'zen';
      return [
        {
          text: countryId === 'hk' ? '💻 抓住在家工作紅利，兼職跨國線上接案與美股技術分析，賺取第一桶金。' : '💻 專注在線技能變現與遠端自由職業，資產穩步增長。',
          effects: { money: 40, intellect: 14, health: -6 },
          log: '【2020年 20歲】你踩準數位轉型風口，提前實現經濟獨立。',
          nextEventId: '24yo'
        },
        {
          text: countryId === 'hk' ? '🏡 全心留喺屋企陪伴父母，苦練廚藝、手沖咖啡與居家徒手健身。' : '🏡 陪伴家人至親，在平淡生活裡感受溫馨親情。',
          effects: { happiness: 24, eq: 16, health: 10 },
          log: '【2020年 20歲】這段慢下來的時光，讓你看清了最值得珍惜的身邊人。',
          nextEventId: '24yo'
        },
        {
          text: countryId === 'hk' ? '⛰️ 避開人群探索麥理浩徑與大東山，在香港大自然裡呼吸自由空氣。' : '⛰️ 走向大自然山野徒步，在天地間修復疲憊身心。',
          effects: { health: 20, happiness: 20, eq: 6 },
          log: '【2020年 20歲】山海為你撫平了時代的焦慮與迷惘。',
          nextEventId: '24yo'
        },
        isZen ? {
          isPerk: true,
          text: '★【天賦專屬】達到自洽通透之境，閉門精讀哲學思維模型，內心毫無內耗。',
          effects: { happiness: 32, intellect: 16, eq: 14 },
          log: '【2020年 20歲 ⚠️ 隱藏天賦】世界動盪喧囂，你卻在心中修築了一座安寧神殿。',
          nextEventId: '24yo'
        } : {
          text: countryId === 'hk' ? '🎮 沉迷動森與線上電競，與朋友通宵連線打機苦中作樂。' : '🎮 沉浸於線上遊戲與虛擬社交，緩解隔離壓力。',
          effects: { happiness: 16, eq: 8, health: -6 },
          log: '【2020年 20歲】你用虛擬世界的歡樂撐過了最冷清的季節。',
          nextEventId: '24yo'
        }
      ];
    }
  },

  // 【24歲 AI 革命與現代賽道】
  '24yo': {
    year: 2024, age: 24, stage: 'AI 革命浪潮', isCrucial: false,
    titles: {
      hk: '【2024年 · 24歲】生成式 AI 爆發、中環寫字樓與人生新局',
      jp: '【2024年 · 24歲】數位轉型潮下的職場抉擇',
      uk: '【2024年 · 24歲】科技新時代與生活方式革命',
      in: '【2024年 · 24歲】全球科技中心的新一代弄潮兒'
    },
    descs: {
      hk: '生成式 AI 顛覆全球職場，面對物價高企與社會急變，你的立足點：',
      jp: '傳統體系與前沿 AI 激烈碰撞，身處都會職場的你：',
      uk: '新科技與慢活哲學交融，你選擇怎樣的工作生活節奏：',
      in: '班加羅爾算力大爆發，身處科技中心的你如何乘風破浪：'
    },
    getOptions: (countryId, userPerk) => {
      const isGeek = userPerk === 'geek';
      const isWealth = userPerk === 'wealth';
      return [
        {
          text: countryId === 'hk' ? '🏢 在大型機構/專業領域熟練運用 AI 工具提升十倍產出，穩步晉升中層。' : '🏢 掌握前沿工具提高效率，成為機構不可或缺的核心骨幹。',
          effects: { money: 35, intellect: 12, eq: 8 },
          log: '【2024年 24歲】你憑藉紮實專業與工具迭代，在職場站穩陣腳。',
          nextEventId: '35yo'
        },
        {
          text: countryId === 'hk' ? '☕ 投身無法被 AI 取代的在地職人生活：經營獨立咖啡店/選物手作，追求質感。' : '☕ 堅守真實人文溫度，從事實體工藝與深度情感連結。',
          effects: { happiness: 26, eq: 16, health: 8 },
          log: '【2024年 24歲】你在快節奏的世界裡守護住了慢生活的情調。',
          nextEventId: '35yo'
        },
        {
          text: countryId === 'hk' ? '📈 嚴格控制物質開支，嚴格執行資產配置，定期定額投向環球核心資產。' : '📈 奉行極簡自律哲學，將儲蓄轉化為穩固的長期複利護城河。',
          effects: { money: 45, intellect: 14, happiness: 4 },
          log: '【2024年 24歲】你建立起極度清醒的財務防禦系統。',
          nextEventId: '35yo'
        },
        isGeek ? {
          isPerk: true,
          text: countryId === 'hk' ? '★【天賦專屬】自主研發垂直領域 AI 自動化工具鏈，以一人公司模式實現高額利潤。' : '★【天賦專屬】主導核心 AI 架構開發，實現個人技術與資本躍遷。',
          effects: { money: 70, intellect: 22, happiness: 16 },
          log: '【2024年 24歲 ⚠️ 隱藏天賦】你在科技革命最前沿自由翱翔，掌握時代密碼。',
          nextEventId: '35yo'
        } : isWealth ? {
          isPerk: true,
          text: countryId === 'hk' ? '★【天賦專屬】精準捕捉市場估值低谷，果斷佈局核心資產與股權，斬獲豐厚收益。' : '★【天賦專屬】展現非凡商業嗅覺，完成資產的高效整合。',
          effects: { money: 75, intellect: 16, eq: 10 },
          log: '【2024年 24歲 ⚠️ 隱藏天賦】你展現出卓越的商業資本智慧，身家倍增。',
          nextEventId: '35yo'
        } : {
          text: countryId === 'hk' ? '🧘 追求極致的身心健康，堅持重量訓練、閱讀與正念冥想，拒絕精神內耗。' : '🧘 專注身心靈合一，維持強健身軀與充沛生命力。',
          effects: { health: 22, happiness: 24, eq: 10 },
          log: '【2024年 24歲】強健的體魄與平靜的心，是你最強大的資本。',
          nextEventId: '35yo'
        }
      ];
    }
  },

  // 【35歲 成家立業（帶飛出震撼動畫）】
  '35yo': {
    year: 2035, age: 35, stage: '三十五歲 · 成熟責任', isCrucial: true,
    crisisNotice: {
      tag: '⚖️ 人生中場大抉擇 ⚖️',
      title: '【2035年 三十五歲的人生錨定】',
      desc: '三十五歲的中流砥柱，體力不再像二十出頭那樣揮霍無度，身邊有愛人、長輩與責任。手頭有一筆打拼多年的積蓄，你將如何為下半生定錨？'
    },
    titles: {
      hk: '【2035年 · 35歲】維港夜景、居屋首期與家庭責任',
      jp: '【2035年 · 35歲】古民家與都會生活的分野',
      uk: '【2035年 · 35歲】鄉村小鎮與都市節奏的平衡',
      in: '【2035年 · 35歲】家族傳承與自我抱負'
    },
    descs: {
      hk: '步入人生中場，看著維港璀璨夜景，面對手頭多年打拼積累的資本：',
      jp: '體會到生命的珍貴與時間的流逝，你選擇的生活重心：',
      uk: '英倫微涼秋天，回望前半生旅途，你決定如何經營餘生：',
      in: '在宗族期望與個人自由之間，你找到了最和諧的平衡：'
    },
    getOptions: (countryId) => [
      {
        text: countryId === 'hk' ? '💍 與相愛之人攜手步入婚姻，合力供首期置業，築起溫馨避風港。' : '💍 步入婚姻殿堂，建立穩定而深厚的家庭港灣。',
        effects: { happiness: 30, eq: 16, money: -35, health: 6 },
        log: '【2035年 35歲】你背負起甜蜜的責任，擁有了最安穩的歸宿。',
        nextEventId: '65yo'
      },
      {
        text: countryId === 'hk' ? '🚗 保持租樓自立，買入心儀已久的越野車，假日帶著家人與相機遊遍香港隱世角落。' : '🚗 買入旅行自駕車，追求高流動性與自律的生活自由。',
        effects: { happiness: 28, health: 14, money: -18, eq: 10 },
        log: '【2035年 35歲】你拒絕被磚頭鎖死人生，隨時能啟程去看風景。',
        nextEventId: '65yo'
      },
      {
        text: countryId === 'hk' ? '💼 辭去大機構高薪，利用十幾年人脈與專業創立獨立工作室，一展抱負。' : '💼 勇敢跳出舒適圈，創立屬於自己的獨立品牌。',
        effects: { money: 75, intellect: 16, health: -10, happiness: 12 },
        log: '【2035年 35歲】你憑魄力開闢出廣闊的商業版圖。',
        nextEventId: '65yo'
      },
      {
        text: countryId === 'hk' ? '🧘 退居幕後追求極致的 Work-Life Balance，把大把時間留給結他、健身與陪伴父母。' : '🧘 回歸生活本質，專注身心修養與家庭天倫。',
        effects: { health: 22, happiness: 30, eq: 14, money: 10 },
        log: '【2035年 35歲】你參透了生命的優先順序，活得通透從容。',
        nextEventId: '65yo'
      }
    ]
  },

  // 【65歲 晚年回甘】
  '65yo': {
    year: 2065, age: 65, stage: '花甲榮休 · 人生總結', isCrucial: false,
    titles: {
      hk: '【2065年 · 65歲】茶樓一盅兩件與夕陽倒影',
      jp: '【2065年 · 65歲】小院枯山水與歲月回甘',
      uk: '【2065年 · 65歲】鄉間壁爐與滿架黑膠唱片',
      in: '【2065年 · 65歲】院子裡子孫繞膝的溫暖笑聲'
    },
    descs: {
      hk: '法定退休之年，回望六十載波瀾壯闊的時代沉浮，你如何安度晚晴：',
      jp: '看盡人世繁華與寂靜，晚年的你坐在庭院走廊靜聽風鈴：',
      uk: '告別全職歲月，漫步在鄉間石徑，回味一生的起伏與溫暖：',
      in: '經歷了時代翻天覆地的巨變，你在親人的簇擁中靜享天倫：'
    },
    getOptions: () => [
      {
        text: '🌍 牽著伴侶的手踏上慢節奏世界巡禮，把歲月積蓄化作永恆回憶。',
        effects: { happiness: 35, money: -25, health: 6 },
        log: '【2065年 65歲】你活得坦蕩精彩，一生無悔。',
        nextEventId: 'end'
      },
      {
        text: '🏡 在小花園蒔花弄草、彈彈結他，將一生的睿智與溫柔傳給後輩。',
        effects: { happiness: 30, health: 18, eq: 14 },
        log: '【2065年 65歲】你在溫暖平淡的日常中安享天年，受人敬愛。',
        nextEventId: 'end'
      },
      {
        text: '📖 整理一生的日記與照片出版成冊，為時代與家族留下真實印記。',
        effects: { intellect: 20, happiness: 26, eq: 12 },
        log: '【2065年 65歲】你的文字與記憶將啟迪下一代人。',
        nextEventId: 'end'
      },
      {
        text: '🍵 每日到老茶館同老友談天說地、落棋散步，享受最純粹的平淡生活。',
        effects: { happiness: 28, health: 14, eq: 12 },
        log: '【2065年 65歲】一盅兩件，笑看歲月風雲變幻。',
        nextEventId: 'end'
      }
    ]
  }
};

let state = {
  birthCountry: null,
  familyBackground: null,
  selectedPerk: null,
  drawnPerks: [],
  stats: { intellect: 50, eq: 50, health: 50, happiness: 50, money: 0 },
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

// 更新數值面板（已徹底移除資產旁的國家字眼）
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
  if (subHeader) subHeader.innerText = 'YEAR 2000 SIMULATOR';

  let html = `
    <div style="margin: auto 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="tag-badge">千禧寫實人生</span>
        <button id="open-hof-btn" style="background: #e9e4d6; border: 1px solid #4a483e; border-radius: 12px; font-size: 10px; font-weight: bold; padding: 2px 8px; cursor: pointer;">
          🏆 人生紀念冊
        </button>
      </div>
      
      <div style="background: #ffffff; border: 2px solid #d4cbb8; border-radius: 10px; padding: 14px; text-align: center; margin-bottom: 14px;">
        <div style="font-size: 32px; margin-bottom: 6px;">📟</div>
        <h2 style="font-size: 15px; color: #2c2f35; margin-bottom: 4px;">【千禧 2000 年代】</h2>
        <p style="font-size: 11px; color: #666; line-height: 1.5;">
          固定 4 大自主抉擇 · 隨機出生國度與家庭<br>
          親歷金融海嘯、世紀疫情與科技大革命！
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

// 🎲 輪盤滾動選國度動畫（徹底修復「兩張卡同時發光」BUG）
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
    // 徹底清除所有卡片的發光 class，杜絕雙重發光
    birthCountries.forEach((_, i) => {
      const box = document.getElementById(`country-box-${i}`);
      if (box) {
        box.classList.remove('active-flash', 'final-locked');
      }
    });

    const activeBox = document.getElementById(`country-box-${currentIndex}`);
    if (activeBox) activeBox.classList.add('active-flash');

    steps++;
    currentIndex = (currentIndex + 1) % birthCountries.length;

    if (steps > minSteps && currentIndex === targetCountryIdx) {
      setTimeout(() => {
        // 先再次重設清空，確保絕對只有中獎卡片高亮
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

  state.stats = { intellect: 50, eq: 50, health: 60, happiness: 60, money: 20 };

  for (const [k, v] of Object.entries(state.birthCountry.stats)) {
    state.stats[k] = (state.stats[k] || 0) + v;
  }
  for (const [k, v] of Object.entries(state.familyBackground.stats)) {
    state.stats[k] = (state.stats[k] || 0) + v;
  }
  const perk = allPerks.find(p => p.id === state.selectedPerk);
  if (perk && perk.stats) {
    for (const [k, v] of Object.entries(perk.stats)) {
      state.stats[k] = (state.stats[k] || 0) + v;
    }
  }

  state.logs = [`【2000年 0歲】你降生於【${state.birthCountry.name}】的【${state.familyBackground.name}】，自帶天賦【${perk ? perk.name : ''}】。`];
  state.currentEventId = '3yo';

  // 頂部只顯示一次國籍與家庭，乾淨清爽
  if (subHeader) subHeader.innerText = `${state.birthCountry.name} | ${state.familyBackground.name}`;
  if (statsPanel) statsPanel.classList.remove('hidden');
  updateStatsUI();
  renderLocalizedEvent(state.currentEventId);
}

// 🚨 渲染事件節點（自動偵測重大危機，飛出並震動 Hold 住 3 秒）
function renderLocalizedEvent(eventId) {
  const canvas = document.getElementById('game-canvas');
  if (eventId === 'end') {
    renderEnding();
    return;
  }

  const scene = localizedScenes[eventId];
  const countryId = state.birthCountry.id;

  // 如果該事件包含重大歷史危機，先彈出全螢幕衝擊動畫並 Hold 住 3 秒
  if (scene.crisisNotice && !scene.crisisNoticeShown) {
    scene.crisisNoticeShown = true;
    showCrisisModal(scene.crisisNotice, () => {
      proceedRenderEventContent();
    });
    return;
  }

  proceedRenderEventContent();

  function proceedRenderEventContent() {
    const eventTitle = scene.titles[countryId] || scene.titles['hk'];
    const eventDesc = scene.descs[countryId] || scene.descs['hk'];
    const options = scene.getOptions(countryId, state.selectedPerk);

    const crucialNotice = scene.isCrucial 
      ? `<div style="background: rgba(197, 48, 48, 0.1); color: #c53030; font-size: 10px; font-weight: 900; text-align: center; padding: 4px; border-radius: 4px; margin-bottom: 6px; border: 1px solid rgba(197, 48, 48, 0.3); letter-spacing: 0.5px;">
          ✦ 重大人生命運轉折點 ✦
         </div>`
      : '';

    let html = `
      <div>
        ${crucialNotice}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="tag-badge">${scene.stage}</span>
          <span style="font-size: 11px; font-weight: 900; color: #c4573f;">【${scene.year}年 · ${scene.age}歲】</span>
        </div>
        <div class="dialog-box">
          <strong style="display: block; margin-bottom: 4px; font-size: 13.5px;">${eventTitle}</strong>
          ${eventDesc}
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

// 💥 危機衝擊全螢幕動畫（整頁黑化、卡片暴衝飛出、心跳震動並 Hold 住 3 秒）
function showCrisisModal(notice, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'crisis-modal-overlay';
  modal.innerHTML = `
    <div class="crisis-card-box">
      <div class="crisis-badge-glow">${notice.tag}</div>
      <h3 class="crisis-title-text">${notice.title}</h3>
      <div class="crisis-body-desc">${notice.desc}</div>
      <button id="crisis-confirm-btn" class="crisis-enter-btn" disabled>
        ⏳ 命運審視中 (3s)...
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  const confirmBtn = document.getElementById('crisis-confirm-btn');
  let countdown = 3;

  // 強制震動 Hold 住 3 秒倒數計時
  const timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      confirmBtn.innerText = `⏳ 命運審視中 (${countdown}s)...`;
    } else {
      clearInterval(timer);
      confirmBtn.removeAttribute('disabled');
      confirmBtn.innerText = '⚠️ 直面命運考驗 (PROCEED)';
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
  const scene = localizedScenes[eventId];
  const opt = scene.getOptions(state.birthCountry.id, state.selectedPerk)[optionIdx];

  for (const [stat, val] of Object.entries(opt.effects)) {
    state.stats[stat] = Math.max(0, (state.stats[stat] || 0) + val);
  }
  state.logs.push(opt.log);
  updateStatsUI();
  renderLocalizedEvent(opt.nextEventId);
}

// 結算與存入圖鑑
function renderEnding() {
  const canvas = document.getElementById('game-canvas');
  
  let title = "【★ 踏實圓滿的歲月 ★】";
  let desc = "你在時代沉浮中守護住了內心的平靜與家庭的溫暖，回望此生，坦蕩且溫柔。";

  if (state.stats.money >= 90 && state.stats.happiness >= 75) {
    title = "【★ 自由與從容的極致者 ★】";
    desc = "你兼顧了物質豐盛與心靈安寧，在歲月的長河裡活出了真正通透的境界。";
  } else if (state.stats.intellect >= 85) {
    title = "【★ 時代先鋒探索者 ★】";
    desc = "你的專注與深邃認知，讓你在自己耕耘的領域留下了深刻而獨特的印記。";
  } else if (state.stats.happiness >= 85) {
    title = "【★ 靈魂自在的旅人 ★】";
    desc = "你從未被任何世俗標籤束縛，始終溫柔真誠地對待生活，活出了最純粹的自己。";
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
        <span style="font-size: 10px; font-weight: 900; display: block; letter-spacing: 1px;">=== 人生終章結算 ===</span>
        <h2 style="font-size: 14px; margin-top: 3px;">${title}</h2>
      </div>
      <div class="dialog-box" style="margin-top: 8px;">${desc}</div>
      
      <div class="log-scroll-area">
        <span style="font-size: 9.5px; color: #666; font-weight: 700; display: block; margin-bottom: 4px;">▶ 一生大事回顧：</span>
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
