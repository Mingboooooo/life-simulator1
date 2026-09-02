// 寫實人生模擬器：全螢幕 3D 爆裂抽卡 + 簡約鎖頭視覺版

const allPerks = [
  { id: 'geek', icon: '🧠', name: '邏輯極客', desc: '智力+15。對代碼與數字極度敏銳，解鎖前沿科技與演算法路線。', stats: { intellect: 15 } },
  { id: 'music', icon: '🎸', name: '絕對音感', desc: '情商+10、幸福+10。天生旋律直覺，解鎖獨立音樂人創作路線。', stats: { eq: 10, happiness: 10 } },
  { id: 'leader', icon: '🤝', name: '天生領袖', desc: '情商+15、資產+5。人脈與領導氣場強大，解鎖早期合夥創業路線。', stats: { eq: 15, money: 5 } },
  { id: 'iron', icon: '🏃', name: '鋼鐵體魄', desc: '健康+20。天生抗壓與極佳體能，解鎖高強度競技與戶外探險。', stats: { health: 20 } },
  { id: 'wealth', icon: '💎', name: '書香家底', desc: '資產+20、智力+5。早期資源充裕，免除經濟負擔，解鎖頂尖深造。', stats: { money: 20, intellect: 5 } },
  { id: 'zen', icon: '🕊️', name: '通透心境', desc: '幸福+20、健康+5。看淡內耗與世俗焦慮，逆境中自動守護心靈自由。', stats: { happiness: 20, health: 5 } }
];

const gameData = {
  eras: [
    {
      id: '2000',
      title: '【千禧 2000 年】互聯網與轉型潮',
      icon: '📟',
      desc: '實體童年撞正網絡科技爆發與現代都市轉型，充滿無限可能。',
      initialStats: { intellect: 50, eq: 50, health: 60, happiness: 65, money: 30 },
      startEventId: 'e2000_3'
    },
    {
      id: '1970',
      title: '【1970 年代】白手興家與拼搏期',
      icon: '🏭',
      desc: '物資匱乏但遍地黃金，全靠一雙手同膽識打拼天下。',
      initialStats: { intellect: 45, eq: 55, health: 65, happiness: 55, money: 15 },
      startEventId: 'e1970_6'
    },
    {
      id: '2010',
      title: '【2010 年代後】數碼原生與內卷期',
      icon: '📱',
      desc: '出生自帶演算法與智慧螢幕，物質豐富但同輩壓力前所未有。',
      initialStats: { intellect: 60, eq: 45, health: 50, happiness: 45, money: 50 },
      startEventId: 'e2010_5'
    }
  ],
  events: {
    // ================= 2000 千禧主線 =================
    'e2000_3': {
      age: 3,
      stage: '幼兒啟蒙 (0-5歲)',
      isCrucial: false,
      title: '【3歲】客廳地板上的小小宇宙',
      desc: '午後微光灑進客廳，電視機播著經典動畫。你坐在地墊上最享受點樣度過一下午？',
      options: [
        {
          text: '🧩 靜靜玩積木與拼圖，摸索拆解玩具車的機械零件。',
          effects: { intellect: 8, eq: -2, happiness: 6 },
          log: '【3歲】你展現出細膩的結構專注力，在安靜中自得其樂。',
          nextEventId: 'e2000_7'
        },
        {
          text: '🏃 踩著涼鞋跑去公園捉伊人，同街坊小朋友玩到天黑。',
          effects: { health: 10, eq: 8, happiness: 8 },
          log: '【3歲】你性格爽朗好動，擁有被陽光曬暖的快樂童年。',
          nextEventId: 'e2000_7'
        },
        {
          text: '🎨 攞住顏色筆在畫簿塗鴉，用色彩描繪腦海中奇奇怪怪的世界。',
          effects: { happiness: 12, intellect: 4, eq: 4 },
          log: '【3歲】你對色彩極為敏銳，擁有豐沛的想像力。',
          nextEventId: 'e2000_7'
        }
      ]
    },

    'e2000_7': {
      age: 7,
      stage: '童年才藝與課餘 (6-11歲)',
      isCrucial: false,
      title: '【7歲】放學鐘聲響起之後的夏日',
      desc: '小學二年級，面對課餘的自由時光，你選擇投入：',
      options: [
        {
          reqPerk: 'music',
          text: '★【天賦專屬】無師自通摸索木結他指彈，能憑聽力精準彈出電視片尾曲。',
          effects: { eq: 16, intellect: 10, happiness: 18 },
          log: '【7歲 隱藏才華】你的音樂直覺震驚了師長，展現出驚人的藝術天賦。',
          nextEventId: 'e2000_random_10'
        },
        {
          reqPerk: 'geek',
          text: '★【天賦專屬】自學撥號上網，寫出人生第一個個人 HTML 主頁與簡易代碼。',
          effects: { intellect: 18, money: 5, eq: 4 },
          log: '【7歲 隱藏才華】你在童年就叩開了網絡代碼世界的大門，建立起邏輯思維。',
          nextEventId: 'e2000_random_10'
        },
        {
          text: '🎸 報名課外結他班，每日規律練習基本指法與和弦。',
          effects: { eq: 10, intellect: 6, happiness: 8, money: -5 },
          log: '【7歲】指尖磨出了微繭，你身上多了一份沈靜的文藝氣質。',
          nextEventId: 'e2000_random_10'
        },
        {
          text: '⚽ 加入校園田徑與籃球隊，在烈日下揮灑汗水。',
          effects: { health: 15, eq: 8, intellect: -2, happiness: 6 },
          log: '【7歲】鍛鍊塑造了你挺拔的體態與堅韌的意志。',
          nextEventId: 'e2000_random_10'
        },
        {
          text: '🪀 沉迷四驅車同陀螺對決，放學同死黨蹲在公園石凳大戰。',
          effects: { eq: 12, happiness: 15, intellect: 2, money: -3 },
          log: '【7歲】你收穫了最純粹的友情，那是童年最燦爛的記憶。',
          nextEventId: 'e2000_random_10'
        }
      ]
    },

    'e2000_random_10': {
      age: 10,
      stage: '童年突發事動態 (10歲)',
      isCrucial: false,
      title: '【10歲 突發事件】校園裡的那場風波',
      desc: '一場全校性的運動選拔與文藝匯演同時到來，你意外被推到了聚光燈下：',
      options: [
        {
          reqPerk: 'leader',
          text: '★【天賦專屬】挺身而出組織全班策劃一場創意表演，奪得全校總冠軍。',
          effects: { eq: 18, happiness: 15, intellect: 6 },
          log: '【10歲 突發收穫】你展現出卓越的領導魄力，成為同學間公認的靈魂人物。',
          nextEventId: 'e2000_12'
        },
        {
          text: '🏃 代表班級出戰接力賽最後一棒，全力衝刺拿下前三名。',
          effects: { health: 10, happiness: 10, eq: 5 },
          log: '【10歲】你的拼勁贏得了全場熱烈的掌聲。',
          nextEventId: 'e2000_12'
        },
        {
          text: '🧘 選擇坐在後排做後勤與觀眾，享受安靜觀察同輩的時光。',
          effects: { intellect: 6, happiness: 8, eq: 4 },
          log: '【10歲】你擁有旁觀者的從容與自洽。',
          nextEventId: 'e2000_12'
        }
      ]
    },

    'e2000_12': {
      age: 12,
      stage: '初中少年與自我審視 (12-15歲)',
      isCrucial: false,
      title: '【12歲】校服褲管與隨身聽的秋天',
      desc: '初中校園落葉紛飛。面對漸漸萌芽的自我意識，你的精力主要放在：',
      options: [
        {
          text: '📚 默默整理筆記專心苦讀，立志考入頂尖高中的精英理科班。',
          effects: { intellect: 14, eq: -2, health: -4, happiness: -4 },
          log: '【12歲】你在成績榜名列前茅，提前嚐到了競爭的孤獨。',
          nextEventId: 'e2000_18'
        },
        {
          text: '🎧 戴起耳機反覆聽日系搖滾與流行歌，嘗試自己寫歌詞隨意哼唱。',
          effects: { eq: 12, happiness: 14, intellect: 4 },
          log: '【12歲】你學會用音樂作為心靈的避難所，培養了溫潤的感性。',
          nextEventId: 'e2000_18'
        },
        {
          text: '🤝 放學後同知己好友踩單車穿梭街道，在球場打波直到天黑。',
          effects: { health: 12, eq: 10, happiness: 10, intellect: -4 },
          log: '【12歲】你收穫了無話不談的一生好友，懂得如何真誠待人。',
          nextEventId: 'e2000_18'
        }
      ]
    },

    'e2000_18': {
      age: 18,
      stage: '成人禮與升學路口 (18-19歲)',
      isCrucial: true,
      title: '【18歲】命運交界點的冷冬抉擇',
      desc: '冬日校門前，人生最關鍵的升學分水嶺擺在眼前，你將走向哪一條路？',
      options: [
        {
          reqPerk: 'geek',
          text: '★【天賦專屬】自主研發的高效演算法系統榮獲國際大獎，破格直錄全球頂尖科技院校。',
          effects: { intellect: 25, money: 15, happiness: 15 },
          log: '【18歲 ⚠️ 神級轉折】你憑藉技術硬實力贏得頂尖學府特招，步入科技核心圈。',
          nextEventId: 'e2000_random_20'
        },
        {
          reqPerk: 'music',
          text: '★【天賦專屬】在 Livehouse 的原創演出被獨立廠牌發掘，受邀簽約組建個人樂隊。',
          effects: { eq: 22, happiness: 24, money: 8 },
          log: '【18歲 ⚠️ 神級轉折】你正式踏入獨立音樂世界，以創作歌手的身份開啟青春篇章。',
          nextEventId: 'e2000_random_20'
        },
        {
          reqPerk: 'wealth',
          text: '★【天賦專屬】在家庭資源支撐下免除後顧之憂，直接遠赴海外名校修讀精英雙學位。',
          effects: { intellect: 20, eq: 12, money: -15, happiness: 10 },
          log: '【18歲 ⚠️ 神級轉折】你站在更高更開闊的國際平台上，積累了豐富的跨國視野。',
          nextEventId: 'e2000_random_20'
        },
        {
          text: '🎓 拼盡全力衝入名牌大學核心專業（醫療／法律／工程／金融）。',
          effects: { intellect: 18, money: -10, health: -6, eq: 4 },
          log: '【18歲 ⚠️ 命運轉折】你拿到了主流社會的入場券，開啟紮實專業的求學路。',
          nextEventId: 'e2000_random_20'
        },
        {
          text: '🎨 堅持攻讀心愛的設計、藝術或文學，追尋內心真正熱情。',
          effects: { happiness: 16, eq: 10, intellect: 8, money: -8 },
          log: '【18歲 ⚠️ 命運轉折】你拒絕標準範本，用自己的步調與熱情定義青春。',
          nextEventId: 'e2000_random_20'
        },
        {
          text: '💼 提早投身社會實習或學一技之長，自食其力開始儲備本金。',
          effects: { money: 25, eq: 12, health: 4, intellect: -4 },
          log: '【18歲 ⚠️ 命運轉折】你提早體會真實社會的人情冷暖，累積踏實資本。',
          nextEventId: 'e2000_random_20'
        }
      ]
    },

    'e2000_random_20': {
      age: 21,
      stage: '時代突發浪潮 (21歲)',
      isCrucial: false,
      title: '【21歲 時代突發事】全球科技泡沫與市場劇震',
      desc: '一場震撼全球的科技與經濟風暴席捲市場，身邊充斥著恐慌與新機會：',
      options: [
        {
          reqPerk: 'zen',
          text: '★【天賦專屬】冷靜洞察市場狂熱後的本質，心境平靜不受噪音干擾，從容佈局。',
          effects: { happiness: 18, intellect: 12, money: 15 },
          log: '【21歲 突發考驗】你的通透與理性讓你在大波動中全身而退，更獲得了深刻認知。',
          nextEventId: 'e2000_23'
        },
        {
          text: '📈 抱著學習心態拿出小額積蓄嘗試投資，體會市場週期的真實殘酷。',
          effects: { intellect: 10, money: -5, eq: 8 },
          log: '【21歲】交了一筆學費，換來了終生受益的風險控制思維。',
          nextEventId: 'e2000_23'
        },
        {
          text: '🛡️ 守好生活本金，專注學業與技能儲備，靜待風暴過去。',
          effects: { health: 6, happiness: 8, money: 5 },
          log: '【21歲】你在喧囂中守住了專注，穩步前行。',
          nextEventId: 'e2000_23'
        }
      ]
    },

    'e2000_23': {
      age: 23,
      stage: '初入職場與多元賽道 (20-25歲)',
      isCrucial: false,
      title: '【23歲】第一份正式事業起跑點',
      desc: '正式步入全職社會，你選擇怎樣開啟你的職涯賽道：',
      options: [
        {
          reqPerk: 'geek',
          text: '★【天賦專屬】加入高頻量化基金或早期 AI 實驗室，擔任核心演算工程師。',
          effects: { money: 35, intellect: 16, health: -8 },
          log: '【23歲 職業賽道】你在頂尖科技領域飛速成長，薪水與資本積累遠超同齡人。',
          nextEventId: 'e2000_28'
        },
        {
          reqPerk: 'music',
          text: '★【天賦專屬】發行首張個人概念 EP，憑藉日系治癒風格登上獨立音樂榜。',
          effects: { happiness: 25, eq: 16, money: 12 },
          log: '【23歲 職業賽道】你的音樂打動了無數都市靈魂，成為廣受認可的獨立音樂人。',
          nextEventId: 'e2000_28'
        },
        {
          text: '🏢 進入知名大型企業做基層管培生，自願加班爭取三年內升級。',
          effects: { money: 20, intellect: 10, health: -10, happiness: -6 },
          log: '【23歲】你以時間換取晉升，在企業階梯上穩步向前。',
          nextEventId: 'e2000_28'
        },
        {
          text: '☕ 選擇節制的工作步調，放工後投入健身、手作料理與閱讀，守護身心平衡。',
          effects: { happiness: 18, health: 10, money: 5, eq: 6 },
          log: '【23歲】你過著簡約踏實的生活，精神狀態清澈充實。',
          nextEventId: 'e2000_28'
        },
        {
          text: '📈 堅持極簡開支，每月把餘額嚴格定投全球資產，提早實踐複利思維。',
          effects: { money: 25, intellect: 12, happiness: -2 },
          log: '【23歲】你建立起冷靜理智的資產意識，逐步鋪好財務基石。',
          nextEventId: 'e2000_28'
        }
      ]
    },

    'e2000_28': {
      age: 28,
      stage: '成家立業與重大抉擇 (26-32歲)',
      isCrucial: true,
      title: '【28歲】人生大分水嶺',
      desc: '同齡人陸續置業成家，面對手頭第一筆可觀積蓄與未來的安頓：',
      options: [
        {
          reqPerk: 'leader',
          text: '★【天賦專屬】與相識多年的摯友聯合創立公司，憑藉人脈與凝聚力拿下天使輪融資。',
          effects: { money: 45, eq: 18, intellect: 10, health: -6 },
          log: '【28歲 ⚠️ 神級轉折】你正式開啟創業之路，帶領團隊開拓屬於自己的天地。',
          nextEventId: 'e2000_random_32'
        },
        {
          text: '💍 與相愛之人攜手步入婚姻，合力負擔首期，建立溫馨的小家。',
          effects: { happiness: 22, eq: 14, money: -35, health: -5 },
          log: '【28歲 ⚠️ 命運轉折】你背負起房貸責任，但也獲得了深厚安穩的情感歸宿。',
          nextEventId: 'e2000_random_32'
        },
        {
          text: '🚗 保持租樓自立，買入一部稱心的自駕車，享受假日探索山海的自在。',
          effects: { happiness: 16, money: -18, eq: 8, health: 4 },
          log: '【28歲 ⚠️ 命運轉折】你拒絕被磚頭鎖死生活半徑，隨時能啟程去看遠方風景。',
          nextEventId: 'e2000_random_32'
        },
        {
          text: '💼 不急於置業買車，保留充裕的流動本金，等待個人事業與獨立創業機會。',
          effects: { money: 35, intellect: 12, happiness: 4, eq: 4 },
          log: '【28歲 ⚠️ 命運轉折】你擁有高度靈活的資產機動性，靜候人生下一個大機會。',
          nextEventId: 'e2000_random_32'
        }
      ]
    },

    'e2000_random_32': {
      age: 32,
      stage: '三十突發考驗 (32歲)',
      isCrucial: false,
      title: '【32歲 突發人生偶遇】深夜便利店外的重逢',
      desc: '一個微涼的秋夜，你意外偶遇了多年前各奔東西的舊摯友，聊起當初的夢想：',
      options: [
        {
          reqPerk: 'iron',
          text: '★【天賦專屬】精力充沛不見倦容，當即約定一同挑戰穿越山海的百公里越野徒步。',
          effects: { health: 15, happiness: 16, eq: 8 },
          log: '【32歲 突發感悟】在山巔破曉時分，你重拾了少年時代一往無前的勇氣。',
          nextEventId: 'e2000_35'
        },
        {
          text: '🍻 坐在路邊木椅通宵長談，暢聊各自在現實世界的妥協與堅持。',
          effects: { eq: 12, happiness: 12, health: -4 },
          log: '【32歲】一場真摯的交心，解開了你心頭積壓已久的迷惘。',
          nextEventId: 'e2000_35'
        },
        {
          text: '☕ 溫和寒暄交換聯絡方式，互道珍重後平靜回歸各自的生活軌道。',
          effects: { happiness: 6, eq: 6 },
          log: '【32歲】成年人的友情淡如水，但心底始終保留著一份溫暖。',
          nextEventId: 'e2000_35'
        }
      ]
    },

    'e2000_35': {
      age: 35,
      stage: '中流砥柱與身心抉擇 (33-45歲)',
      isCrucial: false,
      title: '【35歲】成熟年歲的沉思',
      desc: '步入中年，上有雙親下有責任，體力漸不如少年。你如何掌舵事業與家庭：',
      options: [
        {
          text: '🧗 勇敢跳出舒適圈，利用十幾年積累的人脈與專業創辦個人工作室。',
          effects: { money: 45, intellect: 12, health: -14, happiness: 8 },
          log: '【35歲】你承擔風險開闢自己的事業版圖，收穫了極大的成就感。',
          nextEventId: 'e2000_48'
        },
        {
          text: '🛡️ 守好現有職位，將生活重心大幅回歸陪伴家人與調養自身健康。',
          effects: { happiness: 18, eq: 10, health: 6, money: 15 },
          log: '【35歲】你享受安穩日常，在父母膝下與家人歡笑中體會真正的幸福。',
          nextEventId: 'e2000_48'
        },
        {
          text: '🧘 轉換工作賽道，把時間留給心底一直渴望投入的公益或手作志業。',
          effects: { happiness: 25, health: 12, money: -15, eq: 8 },
          log: '【35歲】你擺脫中年焦慮，找到了滋養靈魂的真正志向。',
          nextEventId: 'e2000_48'
        }
      ]
    },

    'e2000_48': {
      age: 48,
      stage: '半生沈澱與重大考驗 (46-58歲)',
      isCrucial: true,
      title: '【48歲】歲月深處的洗禮',
      desc: '一次體檢報告上的指標波動或經濟週期的起落，讓你重新審視人生的重心：',
      options: [
        {
          reqPerk: 'zen',
          text: '★【天賦專屬】達到心靈自洽通透之境，提早退休轉向著書立說、禪修與世界漫遊。',
          effects: { happiness: 35, health: 15, eq: 12 },
          log: '【48歲 ⚠️ 神級轉折】你徹底掙脫了世俗競賽的桎梏，提前進入了無拘無束的自由。',
          nextEventId: 'e2000_65'
        },
        {
          text: '🩺 徹底放下虛榮與執念，堅持規律運動與清淡飲食，守護身體健康。',
          effects: { health: 25, happiness: 18, money: -5 },
          log: '【48歲 ⚠️ 命運轉折】你重新把健康排在第一位，換來了清爽充沛的精神體魄。',
          nextEventId: 'e2000_65'
        },
        {
          text: '💰 沉著應對市場週期波動，果斷重整資產配置，達成穩固的長久收益。',
          effects: { money: 60, intellect: 10, health: -8, happiness: 4 },
          log: '【48歲 ⚠️ 命運轉折】你以半生沉澱的睿智守護住了資產，真正實現從容無憂。',
          nextEventId: 'e2000_65'
        }
      ]
    },

    'e2000_65': {
      age: 65,
      stage: '晚年回甘與人生總結 (60歲+)',
      isCrucial: false,
      title: '【65歲】寧靜午後的時光',
      desc: '告別全職工作，窗外陽光和煦。回望大半生波瀾壯闊與煙火日常：',
      options: [
        {
          text: '🌍 帶著伴侶背起輕便行李，用慢旅行看遍大半生未曾細看的世間山川。',
          effects: { happiness: 30, money: -25, health: 6 },
          log: '【65歲】你活得自在通透，用廣闊的胸襟與記憶充實了整個人生。',
          nextEventId: 'end'
        },
        {
          text: '🏡 在靜謐的小院侍弄花草、彈彈結他，將一生經驗細細分享給後輩。',
          effects: { happiness: 24, health: 15, eq: 12 },
          log: '【65歲】你在溫暖踏實的日常中安享天倫，深受家人與後輩敬愛。',
          nextEventId: 'end'
        }
      ]
    },

    // ================= 1970 年代主線 =================
    'e1970_6': {
      age: 6,
      stage: '童年奮鬥 (0-10歲)',
      isCrucial: false,
      title: '【6歲】唐樓天台的舊時光',
      desc: '一邊幫屋企穿膠花剪線頭，一邊看著窗外的街景：',
      options: [
        {
          text: '✋ 懂事分擔家務，從小學會吃苦耐勞與珍惜點滴物資。',
          effects: { money: 12, eq: 10, intellect: 4, happiness: 5 },
          log: '【6歲】你早早體會金錢來之不易，塑造出堅毅樸實的品格。',
          nextEventId: 'e1970_16'
        },
        {
          text: '🏃 跑上天台同鄰居細路鬥波子跳繩，充滿市井人情味。',
          effects: { health: 15, happiness: 12, eq: 6 },
          log: '【6歲】你擁有一副強健身軀，童年雖然簡樸卻充滿歡笑。',
          nextEventId: 'e1970_16'
        }
      ]
    },
    'e1970_16': {
      age: 16,
      stage: '青年求存 (15-20歲)',
      isCrucial: true,
      title: '【16歲】學徒還是夜校夜行人',
      desc: '輕工業如火如荼，你必須選擇自己立足社會的方式：',
      options: [
        {
          reqPerk: 'leader',
          text: '★【天賦專屬】深得工廠老廠長賞識，破格提拔為車間最年輕的生產領班。',
          effects: { money: 30, eq: 15, intellect: 8 },
          log: '【16歲 ⚠️ 命運轉折】你展現出卓越的統籌調度才能，在行業起飛前站穩管理層。',
          nextEventId: 'e1970_30'
        },
        {
          text: '🔧 進廠跟師傅苦練機械模具製造，掌握一門硬技術。',
          effects: { money: 20, intellect: 10, health: -4 },
          log: '【16歲 ⚠️ 命運轉折】你掌握扎實技藝，在工業年代迅速自立門戶。',
          nextEventId: 'e1970_30'
        },
        {
          text: '📖 白天打工，晚上在昏暗的夜校苦學英文與商貿知識。',
          effects: { intellect: 20, eq: 10, health: -8, happiness: 6 },
          log: '【16歲 ⚠️ 命運轉折】你靠毅力補齊文化知識，敲開了現代商行的大門。',
          nextEventId: 'e1970_30'
        }
      ]
    },
    'e1970_30': {
      age: 30,
      stage: '浪潮淘金 (28-40歲)',
      isCrucial: true,
      title: '【30歲】經濟起飛的滔天機遇',
      desc: '城市資產與貿易大爆發，面對滾滾而來的時代紅利：',
      options: [
        {
          text: '🏭 拿出全部積蓄大膽創辦工廠與批發行，自己當老闆。',
          effects: { money: 65, intellect: 10, health: -14, happiness: 10 },
          log: '【30歲 ⚠️ 命運轉折】你踩準時代浪潮，完成了白手興家的商業躍升。',
          nextEventId: 'end'
        },
        {
          text: '🏠 踏實購入核心地段住宅，專注守護家庭的安穩歲月。',
          effects: { money: 45, happiness: 22, health: 8 },
          log: '【30歲 ⚠️ 命運轉折】你享受城市發展帶來的豐厚回報，生活踏實無憂。',
          nextEventId: 'end'
        }
      ]
    },

    // ================= 2010 年代主線 =================
    'e2010_5': {
      age: 5,
      stage: '幼兒啟蒙 (0-6歲)',
      isCrucial: false,
      title: '【5歲】演算法與螢幕的清晨',
      desc: '出生在演算法時代，面對豐富多彩的早教安排：',
      options: [
        {
          text: '📱 熟練操作智慧平板閱讀各類科普短片與外語繪本。',
          effects: { intellect: 14, health: -6, eq: -4 },
          log: '【5歲】你極早建立資訊搜索意識，但對螢幕有了依賴。',
          nextEventId: 'e2010_16'
        },
        {
          text: '🛹 遠離螢幕，堅持在公園練習滑板、攀石與戶外運動。',
          effects: { health: 18, eq: 8, happiness: 12 },
          log: '【5歲】你在大自然裡奔跑成長，擁有極佳的身心活力。',
          nextEventId: 'e2010_16'
        }
      ]
    },
    'e2010_16': {
      age: 16,
      stage: '青春自我定位 (14-18歲)',
      isCrucial: true,
      title: '【16歲】數碼世界的清醒者',
      desc: '社交網絡資訊繁雜，同輩焦慮普遍蔓延，你的方向是：',
      options: [
        {
          reqPerk: 'geek',
          text: '★【天賦專屬】開發出百萬人下載的開源大模型輕量工具，被全球頂尖社群盛讚。',
          effects: { intellect: 30, money: 40, happiness: 20 },
          log: '【16歲 ⚠️ 命運轉折】你成為全球青年頂尖技術極客，享有極高技術聲譽。',
          nextEventId: 'end'
        },
        {
          text: '🎥 發揮審美創作優質個人短片，建立自己的獨立個人品牌。',
          effects: { money: 30, eq: 16, intellect: 8, health: -6 },
          log: '【16歲 ⚠️ 命運轉折】你很早就理解傳播與商業邏輯，成為新生代創作者。',
          nextEventId: 'end'
        },
        {
          text: '🧠 屏蔽外界喧囂，沉浸於數學與 AI 演算法，追求硬核底層探索。',
          effects: { intellect: 25, happiness: 8, eq: 2 },
          log: '【16歲 ⚠️ 命運轉折】你掌握前沿科技工具，成為未來的技術領跑者。',
          nextEventId: 'end'
        }
      ]
    }
  }
};

let state = {
  currentEra: null,
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

// ================= 四季氛圍切換 =================
function applySeasonEnvironment() {
  const h = state.stats.happiness;
  const hp = state.stats.health;

  let seasonKey = 'autumn';

  if (h >= 75 && hp >= 60) {
    seasonKey = 'spring';
  } else if (hp >= 70) {
    seasonKey = 'summer';
  } else if (h < 45 || hp < 45) {
    seasonKey = 'winter';
  }

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
        <span style="color: #9c6c28;">💰 資產值:</span>
        <strong style="color:#2c2f35; font-size: 13px;">${state.stats.money} 萬</strong>
      </div>
    `;
  }
}

// 時代選擇
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
  if (subHeader) subHeader.innerText = 'STEP 1: CHOOSE BIRTH ERA';

  let html = `
    <div style="margin: auto 0;">
      <div style="text-align: center; margin-bottom: 12px;">
        <span class="tag-badge">日系人生模擬</span>
        <p style="font-size: 11.5px; color: #666; margin-top: 6px;">選擇出生時代背景：</p>
      </div>
  `;

  gameData.eras.forEach(era => {
    html += `
      <button class="pixel-btn era-btn" data-id="${era.id}">
        <div style="font-size: 13px;">${era.icon} ${era.title}</div>
        <div style="font-size: 10.5px; color: #666; font-weight: normal; margin-top: 4px; line-height: 1.5;">${era.desc}</div>
      </button>
    `;
  });

  html += `</div>`;
  if (canvas) {
    canvas.innerHTML = html;
    canvas.querySelectorAll('.era-btn').forEach(btn => {
      btn.onclick = () => {
        tryPlayMusicOnInteraction();
        triggerFullscreenGacha(btn.dataset.id);
      };
    });
  }
}

// ==========================================================
// 🚀 全螢幕 3D 爆裂抽卡核心引擎
// ==========================================================
function triggerFullscreenGacha(eraId) {
  state.currentEra = gameData.eras.find(e => e.id === eraId);
  const shuffled = [...allPerks].sort(() => 0.5 - Math.random());
  state.drawnPerks = shuffled.slice(0, 5);
  state.selectedPerk = null;

  // 移除可能存在的舊浮層
  const existingOverlay = document.getElementById('fullscreen-gacha-overlay');
  if (existingOverlay) existingOverlay.remove();

  // 建立全新全螢幕暗黑劇院層
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
    <div class="gacha-title-banner">
      <h2>✦ 命運降臨 · 核心天賦 ✦</h2>
      <p>五張命運卡牌已出鞘，請選定一項與生俱來的本命才華：</p>
    </div>
    <div class="gacha-cards-stage">
      ${cardsHtml}
    </div>
    <button id="gacha-confirm-action" class="gacha-confirm-btn" disabled>
      ▶ 確定天賦 · 降臨人世 (START)
    </button>
  `;

  document.body.appendChild(overlay);

  // 卡牌點選邏輯
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

      if (confirmBtn) {
        confirmBtn.removeAttribute('disabled');
      }
    };
  });

  // 確定進入人生
  confirmBtn.onclick = () => {
    overlay.style.transition = 'opacity 0.6s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      startLifeSimulation();
    }, 600);
  };
}

// 開啟人生主進程
function startLifeSimulation() {
  const statsPanel = document.getElementById('stats-panel');
  const subHeader = document.getElementById('sub-header');

  state.stats = { ...state.currentEra.initialStats };

  const perk = allPerks.find(p => p.id === state.selectedPerk);
  if (perk && perk.stats) {
    for (const [k, v] of Object.entries(perk.stats)) {
      state.stats[k] = (state.stats[k] || 0) + v;
    }
  }

  state.logs = [`【0歲】你在 ${state.currentEra.title} 降臨人世，自帶核心天賦【${perk ? perk.name : ''}】。`];
  state.currentEventId = state.currentEra.startEventId;

  if (subHeader) subHeader.innerText = `時代: ${state.currentEra.id} 年 | 天賦: ${perk ? perk.name : ''}`;
  if (statsPanel) statsPanel.classList.remove('hidden');
  updateStatsUI();
  renderEvent(state.currentEventId);
}

// 渲染劇情事件
function renderEvent(eventId) {
  const canvas = document.getElementById('game-canvas');
  if (eventId === 'end') {
    renderEnding();
    return;
  }

  const event = gameData.events[eventId];
  const crucialNotice = event.isCrucial 
    ? `<div style="background: rgba(197, 48, 48, 0.1); color: #c53030; font-size: 10px; font-weight: 900; text-align: center; padding: 4px; border-radius: 4px; margin-bottom: 6px; border: 1px solid rgba(197, 48, 48, 0.3); letter-spacing: 0.5px;">
        ✦ 重要人生命運轉折點 ✦
       </div>`
    : '';

  let html = `
    <div>
      ${crucialNotice}
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span class="tag-badge">${event.stage || '人生節點'}</span>
        <span style="font-size: 11px; font-weight: 900;">【${event.age} 歲】</span>
      </div>
      <div class="dialog-box">
        <strong style="display: block; margin-bottom: 4px; font-size: 14px;">${event.title}</strong>
        ${event.desc}
      </div>
    </div>
    <div style="margin-top: 4px; max-height: 290px; overflow-y: auto;">
  `;

  event.options.forEach((opt, idx) => {
    const isUnlocked = !opt.reqPerk || state.selectedPerk === opt.reqPerk;

    if (opt.reqPerk && !isUnlocked) {
      html += `
        <div class="locked-opt-compact">
          🔒 [天賦專屬路線 · 未解鎖]
        </div>
      `;
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
        chooseOption(eventId, parseInt(btn.dataset.idx));
      };
    });
  }
}

function chooseOption(eventId, optionIdx) {
  const event = gameData.events[eventId];
  const opt = event.options[optionIdx];

  for (const [stat, val] of Object.entries(opt.effects)) {
    state.stats[stat] = Math.max(0, (state.stats[stat] || 0) + val);
  }
  state.logs.push(opt.log);
  updateStatsUI();
  renderEvent(opt.nextEventId);
}

function renderEnding() {
  const canvas = document.getElementById('game-canvas');
  
  let title = "【★ 踏實圓滿的歲月 ★】";
  let desc = "你在時代沉浮中守護住了內心的平靜與家庭的溫暖，回望此生，坦蕩且溫柔。";

  if (state.stats.money >= 90 && state.stats.happiness >= 75) {
    title = "【★ 自由與從容的極致者 ★】";
    desc = "你兼顧了物質豐盛與心靈安寧，在歲月的長河裡活出了真正通透的境界。";
  } else if (state.stats.intellect >= 85) {
    title = "【★ 睿智的先驅探索者 ★】";
    desc = "你的專注與深邃認知，讓你在自己耕耘的領域留下了深刻而獨特的印記。";
  } else if (state.stats.happiness >= 85) {
    title = "【★ 靈魂自在的旅人 ★】";
    desc = "你從未被任何世俗標籤束縛，始終溫柔真誠地對待生活，活出了最純粹的自己。";
  } else if (state.stats.health < 45) {
    title = "【★ 燃燒過度的行路人 ★】";
    desc = "你為身邊人與事業付出了一切，但也讓身軀有些疲累，是時候好好歇息、靜看花開了。";
  }

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
      🔄 漫步下一段人生 (RESTART)
    </button>
  `;
  if (canvas) {
    canvas.innerHTML = html;
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.onclick = renderEraSelect;
  }
}

const bgmBtn = document.getElementById('bgm-toggle');
if (bgmBtn) {
  bgmBtn.onclick = toggleMusic;
}

renderEraSelect();
