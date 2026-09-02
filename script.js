// 寫實人生模擬器：千禧2000世代 · 國度轉盤滾動動畫 + 本土化深度劇情版

// 1. 四大出生國度（真實生活文化背景）
const birthCountries = [
  {
    id: 'hk',
    flag: '🇭🇰',
    name: '中國香港',
    desc: '高密度都市天際線，屋邨人情、名校補習街與茶餐廳煙火氣。',
    stats: { money: 10, eq: 8 }
  },
  {
    id: 'jp',
    flag: '🇯🇵',
    name: '日本東京',
    desc: '少子化與匠人文化，保育園木地板、祭典撈金魚與社團朝練。',
    stats: { happiness: 8, eq: 6 }
  },
  {
    id: 'uk',
    flag: '🇬🇧',
    name: '英國倫敦',
    desc: '陰雨午後與獨立搖滾，二手黑膠店、草地足球與紳士學院。',
    stats: { intellect: 8, happiness: 6 }
  },
  {
    id: 'in',
    flag: '🇮🇳',
    name: '印度班加羅爾',
    desc: '科技樞紐與宗族社會，街頭板球、香料奶茶與極致理工大考。',
    stats: { intellect: 10, health: 6 }
  }
];

// 2. 隨機家庭階級
const familyBackgrounds = [
  { id: 'working', name: '市井工薪家庭', desc: '生活節儉樸實，磨練出極強的適應力與人情味。', stats: { health: 10, eq: 8, money: 5 } },
  { id: 'middle', name: '書香中產家庭', desc: '注重教育與技能培養，穩定但伴隨同輩期望壓力。', stats: { intellect: 10, money: 20, happiness: 5 } },
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

// 4. 千禧 2000 年主線：根據出生地動態客製化劇情細節
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
      hk: '那一年全城停課、大人戴著口罩。你在狹窄的屋邨客廳地墊上度過漫長午後：',
      jp: '東京微涼的春天，保育園老師帶著大家在榻榻米上閱讀繪本、動手做手工：',
      uk: '倫敦窗外陰雨綿綿，收音機播著英倫搖滾，你在地毯上擺弄各種木製火車軌道：',
      in: '班加羅爾炎熱的午後，家族幾代人圍坐天井，孩子們在泥地追逐打鬧：'
    },
    getOptions: (countryId) => [
      {
        text: countryId === 'hk' ? '🧩 靜靜砌積木、拆解舊收音機零件摸索結構。' :
              countryId === 'jp' ? '🧩 專注用紙泥與木塊製作精細的微型手作。' :
              countryId === 'uk' ? '🧩 拼裝古典蒸汽火車軌道模型，沉浸於機械世界。' :
                                  '🧩 在院子裡用泥沙與木棍搭建幾何堡壘，無師自通。',
        effects: { intellect: 8, eq: -2, happiness: 6 },
        log: '【3歲】你展現出驚人的專注力，在動手拆解中自得其樂。',
        nextEventId: '8yo'
      },
      {
        text: countryId === 'hk' ? '🏃 踩著涼鞋在屋邨走廊同隔籬鄰居細路捉伊人。' :
              countryId === 'jp' ? '🏃 穿著小布鞋在神社砂石地奔跑，參加夏日祭典撈金魚。' :
              countryId === 'uk' ? '🏃 披上雨衣在後院草地追著小足球奔跑，一身泥水。' :
                                  '🏃 跟著堂兄弟在街巷打簡易板球，體能靈活。',
        effects: { health: 10, eq: 8, happiness: 8 },
        log: '【3歲】你擁有健康活潑的體魄，在歡笑聲中度過童年。',
        nextEventId: '8yo'
      }
    ]
  },

  // 【8歲 小學生活與歷史事件】
  '8yo': {
    year: 2008, age: 8, stage: '小學才藝與時代巨浪', isCrucial: true,
    titles: {
      hk: '【2008年 · 8歲 ⚠️】金融海嘯與茶餐廳餐桌',
      jp: '【2008年 · 8歲 ⚠️】不景氣的陰影與棒球部練習',
      uk: '【2008年 · 8歲 ⚠️】工廠裁員潮與獨立唱片店',
      in: '【2008年 · 8歲 ⚠️】外包科技訂單劇震與家族期望'
    },
    descs: {
      hk: '全球雷曼風暴襲來，新聞充斥倒閉裁員，補習班外的街道顯得有些冷清：',
      jp: '日圓震盪、企業縮減開支，身邊大人的神情凝重，放學後的社團活動依舊在繼續：',
      uk: '老牌工業城鎮面臨不景氣，社區裡幾家老店關門，學校鼓勵大家參與社區才藝：',
      in: '歐美外包訂單急跌，科技園區瀰漫著焦慮，家長更堅定地督促孩子苦讀理工科：'
    },
    getOptions: (countryId) => [
      {
        reqPerk: 'music',
        text: countryId === 'hk' ? '★【天賦專屬】戴起 MP3 聽 Beyond 與廣東歌，木結他無師自通彈出動人旋律。' :
              countryId === 'jp' ? '★【天賦專屬】自學彈奏久石讓與日系搖滾樂曲，在學校文化祭引起全場轟動。' :
              countryId === 'uk' ? '★【天賦專屬】在二手跳蚤市場淘得一把老電結他，摸索出正宗英倫迷幻音色。' :
                                  '★【天賦專屬】將傳統西塔琴旋律與現代流行節奏融合，展露驚人音樂天賦。',
        effects: { eq: 18, happiness: 18, intellect: 6 },
        log: '【8歲 ⚠️ 隱藏天賦】音樂成為你最閃耀的翅膀，在時代動盪中安撫靈魂。',
        nextEventId: '12yo'
      },
      {
        text: countryId === 'hk' ? '📚 放學後準時報到名師補習班，默書考第一讓父母安心。' :
              countryId === 'jp' ? '📚 嚴格參加「進學塾」課後補習，默默準備中學受驗。' :
              countryId === 'uk' ? '📚 泡在公立圖書館讀完一整排世界歷史與冒險小說。' :
                                  '📚 每天苦做幾十頁高難度數學競賽題，志在衝刺名校。',
        effects: { intellect: 12, eq: 4, happiness: -3 },
        log: '【8歲】你用踏實的學業成績為未來奠定了厚實基礎。',
        nextEventId: '12yo'
      },
      {
        text: countryId === 'hk' ? '⚽ 加入校隊在烈日下練波，放學買杯凍檸茶同死黨飲。' :
              countryId === 'jp' ? '⚾ 參加棒球少年隊「朝練」，風雨不改鍛鍊堅韌心智。' :
              countryId === 'uk' ? '⚽ 代表學校出戰週末少年足球聯賽，在泥濘中全力爭勝。' :
                                  '🏏 成為街區板球賽的核心擊球手，收穫極佳人緣。',
        effects: { health: 15, eq: 8, happiness: 8 },
        log: '【8歲】運動塑造了你堅忍不拔的性格與強健體格。',
        nextEventId: '12yo'
      }
    ]
  },

  // 【12歲 初中叛逆與數碼崛起】
  '12yo': {
    year: 2012, age: 12, stage: '數碼浪潮爆發', isCrucial: false,
    titles: {
      hk: '【2012年 · 12歲】智慧手機、高登論壇與天台風',
      jp: '【2012年 · 12歲】LINE群組、秋葉原與二次元啟蒙',
      uk: '【2012年 · 12歲】倫敦奧運之夏、耳機與地下車庫',
      in: '【2012年 · 12歲】廉價智慧手機普及與編程狂熱'
    },
    descs: {
      hk: '智慧手機普及，同學都在玩神魔之塔與高登論壇，你的青春時光留給：',
      jp: '社群網絡與智慧手機融入生活，同儕間的空氣閱讀與自我定位考驗著你：',
      uk: '那一年倫敦奧運萬眾矚目，街頭充滿活力與搖滾氛圍，你的精力投入在：',
      in: '平價網絡引爆全國，身邊同齡人開始瘋狂自學代碼希望改變命運：'
    },
    getOptions: (countryId) => [
      {
        reqPerk: 'geek',
        text: countryId === 'hk' ? '★【天賦專屬】自學越獄系統、編寫搶票與校園論壇小插件，名震學界。' :
              countryId === 'jp' ? '★【天賦專屬】用開源引擎自製第一款復古像素獨立遊戲，在網絡獲萬人點讚。' :
              countryId === 'uk' ? '★【天賦專屬】自組 Linux 迷你伺服器搭建開源社群，與全球極客在線交流。' :
                                  '★【天賦專屬】攻破頂級演算法平台題庫，在全國青少年編程大賽一鳴驚人。',
        effects: { intellect: 22, money: 10, happiness: 10 },
        log: '【12歲】你在代碼世界找到屬於自己的主場，建立起極客思維。',
        nextEventId: '18yo'
      },
      {
        text: countryId === 'hk' ? '🤝 放學同死黨搭地鐵四處拍照、在天台長談未來夢想。' :
              countryId === 'jp' ? '🤝 投入熱血的社團部活，與隊友在夏日大賽流下青春淚水。' :
              countryId === 'uk' ? '🤝 與朋友在地下室組建車庫樂隊，週末在公園練習滑板。' :
                                  '🤝 與鄰里同伴共度熱鬧節慶，建立深厚無比的生死之交。',
        effects: { eq: 14, happiness: 14, health: 6 },
        log: '【12歲】你收穫了毫無雜質的真摯友情，青春閃閃發光。',
        nextEventId: '18yo'
      }
    ]
  },

  // 【18歲 成人抉擇】
  '18yo': {
    year: 2018, age: 18, stage: '成人禮 · 命運分流', isCrucial: true,
    titles: {
      hk: '【2018年 · 18歲 ⚠️】DSE 放榜與人生賽道',
      jp: '【2018年 · 18歲 ⚠️】大學入試與上京物語',
      uk: '【2018年 · 18歲 ⚠️】A-Level 與大學去向',
      in: '【2018年 · 18歲 ⚠️】JEE 殘酷大考與命運跳躍'
    },
    descs: {
      hk: '高中畢業放榜，面對極度現實的社會梯級，你的成年第一步：',
      jp: '告別地方故鄉來到繁華東京，面對人生第一張獨立入場券：',
      uk: '成年之際，面對傳統學院派深造還是自主打拼的交叉點：',
      in: '百萬考生的殘酷千軍萬馬過獨木橋，你將怎樣定義自己的人生：'
    },
    getOptions: (countryId) => [
      {
        reqPerk: 'leader',
        text: countryId === 'hk' ? '★【天賦專屬】聯合同窗創辦青年跨境電商與潮流選品，自立門戶。' :
              countryId === 'jp' ? '★【天賦專屬】在涉谷創立學生原創文化廠牌，凝聚各路年輕創作者。' :
              countryId === 'uk' ? '★【天賦專屬】發起倫敦青年獨立藝術季，成功拿下首筆商業贊助。' :
                                  '★【天賦專屬】組建青年科技外包團隊，拿下第一筆跨國軟體訂單。',
        effects: { money: 35, eq: 18, intellect: 10 },
        log: '【18歲 ⚠️ 命運轉折】你提早踏上商業領袖之路，展現非凡魄力。',
        nextEventId: '20yo'
      },
      {
        text: countryId === 'hk' ? '🎓 考入港大/中大名牌專業（醫科/法學/金融），走上菁英主流路。' :
              countryId === 'jp' ? '🎓 考入頂尖名牌大學，在神保町舊書店街與研究室穿梭。' :
              countryId === 'uk' ? '🎓 進入頂尖公立學府，在歷史悠久的學院紅磚下沉澱學識。' :
                                  '🎓 以頂尖成績考入印度理工（IIT），成為全家族的驕傲。',
        effects: { intellect: 20, money: -10, eq: 6 },
        log: '【18歲 ⚠️ 命運轉折】你拿到了主流社會的精英入場券，深耕專業。',
        nextEventId: '20yo'
      },
      {
        text: countryId === 'hk' ? '🎨 堅持攻讀心愛的設計或音樂創作，租下工廈小單位築夢。' :
              countryId === 'jp' ? '🎨 投入獨立插畫、手作料理或小型唱片行，追尋職人自洽。' :
              countryId === 'uk' ? '🎨 背起背包遊歷歐洲大陸，在各地青年旅舍與街頭尋求靈感。' :
                                  '🎨 投身社會實戰與實體商貿，提早體會真實市井商業智慧。',
        effects: { happiness: 22, eq: 12, health: 6 },
        log: '【18歲 ⚠️ 命運轉折】你拒絕標準範本，用熱愛書寫自己的青春。',
        nextEventId: '20yo'
      }
    ]
  },

  // 【20歲 歷史大事件 · 世紀疫情】
  '20yo': {
    year: 2020, age: 20, stage: '歷史大事件 · 世紀封閉', isCrucial: true,
    titles: {
      hk: '【2020年 · 20歲 ⚠️】空蕩的維港與遠端大考驗',
      jp: '【2020年 · 20歲 ⚠️】冷清的澀谷十字路口與孤獨修煉',
      uk: '【2020年 · 20歲 ⚠️】封鎖下的倫敦公寓與陽台吉他',
      in: '【2020年 · 20歲 ⚠️】世紀封控下的大家庭互助'
    },
    descs: {
      hk: '全球疫情爆發，繁華都市陷入沉寂，日常節奏被徹底打亂：',
      jp: '緊急事態宣言下，東京街頭人影稀疏，線上授課與遠端生活成為新常態：',
      uk: '城市經歷漫長封閉，面對孤獨與不確定性，你如何安放自己的身心：',
      in: '全城停擺，家庭與宗族成員在狹小空間相互扶持，面對現實考驗：'
    },
    getOptions: () => [
      {
        reqPerk: 'zen',
        text: '★【天賦專屬】內心平靜通透，利用居家時期規律閱讀、鍛鍊體能，精神煥發。',
        effects: { happiness: 22, health: 15, eq: 12 },
        log: '【2020年 20歲】在世界的混亂喧囂中，你守護住了最寶貴的心靈安寧。',
        nextEventId: '24yo'
      },
      {
        text: '💻 抓住數位在線紅利，兼職遠程接案、自媒體或技術開發，累積厚實本金。',
        effects: { money: 35, intellect: 14, health: -6 },
        log: '【2020年 20歲】你踩準數位轉型風口，提前實現經濟獨立。',
        nextEventId: '24yo'
      },
      {
        text: '🏡 全心陪伴家人與伴侶，煮飯、聊天，加深彼此不可分割的牽絆。',
        effects: { happiness: 20, eq: 14, health: 8 },
        log: '【2020年 20歲】這段特別的歲月，讓你看清了生命中最值得珍惜的人。',
        nextEventId: '24yo'
      }
    ]
  },

  // 【24歲 AI 革命與現代賽道】
  '24yo': {
    year: 2024, age: 24, stage: 'AI 時代與職業定型', isCrucial: false,
    titles: {
      hk: '【2024年 · 24歲】AI 浪潮下的中環與新機遇',
      jp: '【2024年 · 24歲】數位轉型潮下的職場抉擇',
      uk: '【2024年 · 24歲】科技新時代與生活方式革命',
      in: '【2024年 · 24歲】全球科技中心的新一代弄潮兒'
    },
    descs: {
      hk: '生成式 AI 顛覆傳統行業，面對快速變動的世界，你的立足點：',
      jp: '傳統企業與新興科技激烈交鋒，你的職業發展重心：',
      uk: '新科技與歐洲慢活文化的碰撞，你選擇的生活步調：',
      in: '班加羅爾成為全球 AI 算力與軟體中心，身處漩渦中心的你：'
    },
    getOptions: () => [
      {
        reqPerk: 'geek',
        text: '★【天賦專屬】開發出前沿 AI 工具鏈，成為技術架構領頭人，年薪與資產飛躍。',
        effects: { money: 55, intellect: 20, happiness: 12 },
        log: '【2024年 24歲】你在科技革命最前沿站穩腳跟，掌握時代密碼。',
        nextEventId: '35yo'
      },
      {
        text: '🎨 專注 AI 無法取代的溫暖人際、實體藝術與在地生活體驗。',
        effects: { happiness: 25, eq: 16, health: 10 },
        log: '【2024年 24歲】你堅守真實情感，活出無可替代的生命質感。',
        nextEventId: '35yo'
      },
      {
        text: '📈 自律生活與長期資產配置，建立穩固的財務護城河。',
        effects: { money: 30, intellect: 12, eq: 8 },
        log: '【2024年 24歲】你在現實世界穩步前行，不疾不徐。',
        nextEventId: '35yo'
      }
    ]
  },

  // 【35歲 成家立業】
  '35yo': {
    year: 2035, age: 35, stage: '人生成熟與責任', isCrucial: true,
    titles: {
      hk: '【2035年 · 35歲 ⚠️】維港夜景下的成家抉擇',
      jp: '【2035年 · 35歲 ⚠️】古民家與都會生活的分野',
      uk: '【2035年 · 35歲 ⚠️】鄉村小鎮與都市節奏的平衡',
      in: '【2035年 · 35歲 ⚠️】家族傳承與自我抱負'
    },
    descs: {
      hk: '三十五歲的人生中場，手頭有一筆可觀積蓄，你決定怎樣安放餘生：',
      jp: '步入中年，體會到人生的有限與珍貴，你選擇的生活模式：',
      uk: '三十五歲的英倫秋天，回望過往旅途，你的生活重心走向：',
      in: '在家族期望與自我實現之間，你找到了最和諧的立足點：'
    },
    getOptions: () => [
      {
        text: '💍 與一生摯愛結為連理，購置溫馨住宅，把重心轉向家庭與陪伴。',
        effects: { happiness: 28, eq: 16, money: -30, health: 6 },
        log: '【2035年 35歲】你擁有了屬於自己的安穩港灣，內心充盈。',
        nextEventId: '65yo'
      },
      {
        text: '🚗 保持高自由度的數字遊民狀態，環球旅居，把世界當作辦公室。',
        effects: { happiness: 26, health: 14, money: -15, eq: 10 },
        log: '【2035年 35歲】你活得自在通透，用廣闊的胸襟丈量世界。',
        nextEventId: '65yo'
      },
      {
        text: '💼 獨立創立個人品牌，向行業頂峰與世俗財務自由發起衝刺。',
        effects: { money: 65, intellect: 15, health: -10, happiness: 10 },
        log: '【2035年 35歲】你在事業舞台上書寫了屬於自己的傳奇。',
        nextEventId: '65yo'
      }
    ]
  },

  // 【65歲 晚年回甘】
  '65yo': {
    year: 2065, age: 65, stage: '花甲榮休 · 人生總結', isCrucial: false,
    titles: {
      hk: '【2065年 · 65歲】茶樓一壺香茗與夕陽倒影',
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
        text: '🌍 牽著伴侶的手踏上慢節奏世界巡禮，把歲月化作永恆回憶。',
        effects: { happiness: 32, money: -20, health: 6 },
        log: '【2065年 65歲】你活得坦蕩精彩，一生無悔。',
        nextEventId: 'end'
      },
      {
        text: '🏡 在小花園蒔花弄草、彈彈結他，將一生的睿智與溫柔傳給後輩。',
        effects: { happiness: 28, health: 16, eq: 14 },
        log: '【2065年 65歲】你在溫暖平淡的日常中安享天年，受人敬愛。',
        nextEventId: 'end'
      }
    ]
  }
};

// 遊戲即時狀態
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
        <span style="color: #9c6c28;">💰 資產值: <strong style="color:#2c2f35; font-size: 13px;">${state.stats.money} 萬</strong></span>
        <span style="font-size:10px; color:#666;">${state.birthCountry.flag} ${state.birthCountry.name} · ${state.familyBackground.name}</span>
      </div>
    `;
  }
}

// ================= 主選單介面 =================
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
        <span class="tag-badge">千禧人生</span>
        <button id="open-hof-btn" style="background: #e9e4d6; border: 1px solid #4a483e; border-radius: 12px; font-size: 10px; font-weight: bold; padding: 2px 8px; cursor: pointer;">
          🏆 人生紀念冊
        </button>
      </div>
      
      <div style="background: #ffffff; border: 2px solid #d4cbb8; border-radius: 10px; padding: 14px; text-align: center; margin-bottom: 14px;">
        <div style="font-size: 32px; margin-bottom: 6px;">📟</div>
        <h2 style="font-size: 15px; color: #2c2f35; margin-bottom: 4px;">【千禧 2000 年代】</h2>
        <p style="font-size: 11px; color: #666; line-height: 1.5;">
          從千禧拂曉出發，橫跨二十載全球風雲。<br>
          系統將隨機為你抽取<strong>出生國度</strong>與<strong>原生家庭</strong>！
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
        startCountryRouletteAnimation(); // 觸發全螢幕輪盤選國度動畫
      };
    }

    const hofBtn = document.getElementById('open-hof-btn');
    if (hofBtn) hofBtn.onclick = showHallOfFame;
  }
}

// ==========================================================
// 🎲 核心一：全螢幕命運輪盤滾動選國度動畫
// ==========================================================
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
        <div class="flag">${c.flag}</div>
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

  // 隨機確定最終國度與家庭
  const targetCountryIdx = Math.floor(Math.random() * birthCountries.length);
  state.birthCountry = birthCountries[targetCountryIdx];
  state.familyBackground = familyBackgrounds[Math.floor(Math.random() * familyBackgrounds.length)];

  // 滾動閃爍動畫邏輯 (由快到慢)
  let currentIndex = 0;
  let speed = 70; // 初始快速
  let steps = 0;
  const minSteps = 24; // 至少閃爍 24 次

  function flashStep() {
    birthCountries.forEach((_, i) => {
      const box = document.getElementById(`country-box-${i}`);
      if (box) box.className = 'country-box';
    });

    const activeBox = document.getElementById(`country-box-${currentIndex}`);
    if (activeBox) activeBox.className = 'country-box active-flash';

    steps++;
    currentIndex = (currentIndex + 1) % birthCountries.length;

    if (steps > minSteps && currentIndex === targetCountryIdx) {
      // 成功命中，定格動畫！
      setTimeout(() => {
        const finalBox = document.getElementById(`country-box-${targetCountryIdx}`);
        if (finalBox) finalBox.className = 'country-box final-locked';

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
              triggerFullscreenGacha(); // 進入 3D 抽卡
            }, 400);
          };
        }
      }, 200);
    } else {
      if (steps > minSteps - 8) {
        speed += 35; // 逐漸減速
      }
      setTimeout(flashStep, speed);
    }
  }

  flashStep();
}

// ==========================================================
// 🚀 核心二：全螢幕 3D 翻轉爆裂抽卡
// ==========================================================
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
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="font-size: 20px; color: #f7e6c4; letter-spacing: 2px;">✦ 挑選你的天賦神力 ✦</h2>
      <p style="font-size: 11.5px; color: #a89f91; margin-top: 4px;">
        出生於: ${state.birthCountry.flag} ${state.birthCountry.name} · ${state.familyBackground.name}
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

// ================= 開始人生進程 =================
function startLifeSimulation() {
  const statsPanel = document.getElementById('stats-panel');
  const subHeader = document.getElementById('sub-header');

  state.stats = { intellect: 50, eq: 50, health: 60, happiness: 60, money: 20 };

  // 疊加國家加成
  for (const [k, v] of Object.entries(state.birthCountry.stats)) {
    state.stats[k] = (state.stats[k] || 0) + v;
  }
  // 疊加家庭加成
  for (const [k, v] of Object.entries(state.familyBackground.stats)) {
    state.stats[k] = (state.stats[k] || 0) + v;
  }
  // 疊加天賦
  const perk = allPerks.find(p => p.id === state.selectedPerk);
  if (perk && perk.stats) {
    for (const [k, v] of Object.entries(perk.stats)) {
      state.stats[k] = (state.stats[k] || 0) + v;
    }
  }

  state.logs = [`【2000年 0歲】你降生於【${state.birthCountry.flag} ${state.birthCountry.name}】的【${state.familyBackground.name}】，自帶天賦【${perk ? perk.name : ''}】。`];
  state.currentEventId = '3yo';

  if (subHeader) subHeader.innerText = `${state.birthCountry.flag} ${state.birthCountry.name} | ${state.familyBackground.name}`;
  if (statsPanel) statsPanel.classList.remove('hidden');
  updateStatsUI();
  renderLocalizedEvent(state.currentEventId);
}

// 渲染深度本地化事件
function renderLocalizedEvent(eventId) {
  const canvas = document.getElementById('game-canvas');
  if (eventId === 'end') {
    renderEnding();
    return;
  }

  const scene = localizedScenes[eventId];
  const countryId = state.birthCountry.id;

  const eventTitle = scene.titles[countryId] || scene.titles['hk'];
  const eventDesc = scene.descs[countryId] || scene.descs['hk'];
  const options = scene.getOptions(countryId);

  const crucialNotice = scene.isCrucial 
    ? `<div style="background: rgba(197, 48, 48, 0.1); color: #c53030; font-size: 10px; font-weight: 900; text-align: center; padding: 4px; border-radius: 4px; margin-bottom: 6px; border: 1px solid rgba(197, 48, 48, 0.3); letter-spacing: 0.5px;">
        ✦ 重要人生命運轉折點 ✦
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
    const isUnlocked = !opt.reqPerk || state.selectedPerk === opt.reqPerk;

    if (opt.reqPerk && !isUnlocked) {
      html += `<div class="locked-opt-compact">🔒 [天賦專屬路線 · 未解鎖]</div>`;
    } else {
      const isPerkOption = !!opt.reqPerk;
      const highlightStyle = isPerkOption ? 'border: 2px solid #b86b88; background: #fff5f8;' : '';
      html += `
        <button class="pixel-btn opt-btn" data-idx="${idx}" style="${highlightStyle}">
          ${opt.text}
        </button>
      `;
    }
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

function chooseLocalizedOption(eventId, optionIdx) {
  const scene = localizedScenes[eventId];
  const opt = scene.getOptions(state.birthCountry.id)[optionIdx];

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
    country: `${state.birthCountry.flag} ${state.birthCountry.name}`,
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

// 圖鑑存取
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
          <div style="font-size: 22px;">📜</div>
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
