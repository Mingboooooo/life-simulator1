// 寫實人生模擬器：隨機出生國度 + 原生家庭階級 + 歷史危機鏈 + 圖鑑紀念冊版

// 1. 隨機出生國度庫（各具文化特色與初始加成）
const birthCountries = [
  { id: 'hk', name: '🇭🇰 中國香港', desc: '高密度霓虹之城，商業敏銳與競爭極度激烈。', stats: { money: 10, eq: 8 } },
  { id: 'jp', name: '🇯🇵 日本東京', desc: '低慾望匠人社會，重視秩序、獨立審美與個人內省。', stats: { happiness: 8, eq: 6 } },
  { id: 'uk', name: '🇬🇧 英國倫敦', desc: '老牌文化底蘊，獨立搖滾、學院深造與悠閒下午茶。', stats: { intellect: 8, happiness: 6 } },
  { id: 'us', name: '🇺🇸 美國加州', desc: '矽谷極客浪潮，充滿個人英雄主義與風險投資冒險。', stats: { money: 8, intellect: 10 } }
];

// 2. 隨機原生家庭階級庫
const familyBackgrounds = [
  { id: 'working', name: '市井街坊家庭', desc: '雖不富裕但人情味濃，培養出堅韌耐勞與適應力。', stats: { health: 10, eq: 8, money: 5 } },
  { id: 'middle', name: '書香中產家庭', desc: '重視教育與閱讀，背負升學期望，資源均衡穩定。', stats: { intellect: 10, money: 20, happiness: 5 } },
  { id: 'merchant', name: '商賈投資世家', desc: '自幼耳濡目染商業買賣，資本充裕但家族風險共擔。', stats: { money: 40, intellect: 6, health: -5 } }
];

// 3. 核心天賦庫
const allPerks = [
  { id: 'geek', icon: '🧠', name: '邏輯極客', desc: '智力+15。對代碼與演算法極度敏銳，解鎖前沿科技路線。', stats: { intellect: 15 } },
  { id: 'music', icon: '🎸', name: '絕對音感', desc: '情商+10、幸福+10。天生旋律直覺，解鎖獨立音樂人創作路線。', stats: { eq: 10, happiness: 10 } },
  { id: 'leader', icon: '🤝', name: '天生領袖', desc: '情商+15、資產+5。人脈與領導氣場強大，解鎖早期合夥創業路線。', stats: { eq: 15, money: 5 } },
  { id: 'iron', icon: '🏃', name: '鋼鐵體魄', desc: '健康+20。天生抗壓與極佳體能，解鎖高強度競技與戶外探險。', stats: { health: 20 } },
  { id: 'wealth', icon: '💎', name: '商道敏銳', desc: '資產+20、智力+5。早期資本嗅覺充沛，解鎖頂尖投資賽道。', stats: { money: 20, intellect: 5 } },
  { id: 'zen', icon: '🕊️', name: '通透心境', desc: '幸福+20、健康+5。看淡內耗與世俗焦慮，逆境中自動守護心靈自由。', stats: { happiness: 20, health: 5 } }
];

// 4. 四大時代背景（千禧年深度展開 + 三大特色時代接口）
const gameData = {
  eras: [
    {
      id: '2000',
      title: '【2000 千禧年代】數碼浪潮與世紀轉折',
      icon: '📟',
      desc: '童年經歷互聯網萌芽，青年撞正全球金融海嘯與智能手機爆發。',
      initialStats: { intellect: 50, eq: 50, health: 60, happiness: 60, money: 20 },
      startEventId: 'e2000_3'
    },
    {
      id: '1978',
      title: '【1978 狂飆年代】香港黃金與白手興家',
      icon: '🏭',
      desc: '輕工業與股市騰飛，遍地黃金，全靠一雙手與膽識殺出血路。',
      initialStats: { intellect: 45, eq: 55, health: 65, happiness: 55, money: 15 },
      startEventId: 'e2000_3'
    },
    {
      id: 'medieval',
      title: '【中世紀 1350】城堡騎士與行會歲月',
      icon: '⚔️',
      desc: '黑死病過後的封建歐洲，見證領主爭鋒、騎士榮耀與商人工會興起。',
      initialStats: { intellect: 40, eq: 45, health: 70, happiness: 50, money: 10 },
      startEventId: 'e2000_3'
    },
    {
      id: 'wuxia',
      title: '【江湖 1600】快意恩仇與門派紛爭',
      icon: '🍶',
      desc: '煙雨江南，各大門派林立。提一把青鋒劍，踏入江湖是非浪潮。',
      initialStats: { intellect: 48, eq: 60, health: 65, happiness: 55, money: 15 },
      startEventId: 'e2000_3'
    }
  ],
  events: {
    // ================= 2000 主線：真實歷史年份推進 =================
    'e2000_3': {
      year: 2003,
      age: 3,
      stage: '幼兒歲月',
      isCrucial: false,
      title: '【2003年 · 3歲】客廳窗外的寂靜街角',
      desc: '那一年全球疫情與口罩陰影籠罩街頭，幼稚園停課。在客廳地板上，你如何安度幼年：',
      options: [
        {
          text: '🧩 靜靜玩積木與拼圖，摸索拆解收音機零件，專注自得其樂。',
          effects: { intellect: 8, eq: -2, happiness: 6 },
          log: '【2003年 3歲】你在靜態探索中建立起過人的專注力。',
          nextEventId: 'e2000_8'
        },
        {
          text: '🎨 拿著蠟筆在畫紙上肆意塗鴉，繪畫窗外陽光與飛鳥。',
          effects: { happiness: 12, intellect: 4, eq: 4 },
          log: '【2003年 3歲】你對色彩與外界世界充滿敏銳想像。',
          nextEventId: 'e2000_8'
        },
        {
          text: '🏃 在屋內跑跑跳跳，跟家人學習簡易體操保持活力。',
          effects: { health: 10, eq: 6, happiness: 8 },
          log: '【2003年 3歲】你在家中保持著健康好動的心態。',
          nextEventId: 'e2000_8'
        }
      ]
    },

    'e2000_8': {
      year: 2008,
      age: 8,
      stage: '歷史大事件 · 金融海嘯',
      isCrucial: true,
      title: '【2008年 · 8歲 ⚠️】雷曼風暴與家庭餐桌',
      desc: '華爾街引發的全球金融海嘯席捲而來，電視新聞充斥著倒閉潮，家裡大人的臉色變得凝重：',
      options: [
        {
          reqPerk: 'zen',
          text: '★【天賦專屬】懂事體貼家人，主動用自製手工禮物與笑臉化解家中沉重氣氛。',
          effects: { eq: 16, happiness: 18, health: 5 },
          log: '【2008年 8歲】你的貼心給予了家庭最溫暖的心理支撐。',
          nextEventId: 'e2000_12'
        },
        {
          text: '📉 提早理解賺錢的艱難，節省零用錢並默默幫家裡做家務。',
          effects: { eq: 10, intellect: 6, money: 5 },
          log: '【2008年 8歲】你在動盪之年提早學會懂事與節制。',
          nextEventId: 'e2000_12'
        },
        {
          text: '🎸 躲在房間戴起耳機聽搖滾樂與彈結他，在音樂中尋求內心平靜。',
          effects: { happiness: 12, eq: 8, intellect: 4 },
          log: '【2008年 8歲】音樂成為你童年不可或缺的精神港灣。',
          nextEventId: 'e2000_12'
        }
      ]
    },

    'e2000_12': {
      year: 2012,
      age: 12,
      stage: '智能手機與青春啟蒙',
      isCrucial: false,
      title: '【2012年 · 12歲】智慧螢幕與青春心事',
      desc: '智慧型手機與社群網絡全面爆發，身邊同學開始人人一部手機：',
      options: [
        {
          reqPerk: 'geek',
          text: '★【天賦專屬】自己摸索破解系統權限、自製 App 小工具發布在社群論壇。',
          effects: { intellect: 20, money: 8, eq: 4 },
          log: '【2012年 12歲】你提早成為數碼時代的創造者而非單純消費者。',
          nextEventId: 'e2000_18'
        },
        {
          text: '📚 保持自律克制手機誘惑，全力專注課堂與學科競賽。',
          effects: { intellect: 14, eq: 4, happiness: -4 },
          log: '【2012年 12歲】你以專注換取了學業名列前茅。',
          nextEventId: 'e2000_18'
        },
        {
          text: '🎧 透過串流平台聽遍世界各地獨立音樂，嘗試錄製自己的第一首 Demo。',
          effects: { happiness: 16, eq: 12, intellect: 4 },
          log: '【2012年 12歲】你的音樂創作才華開始展露光芒。',
          nextEventId: 'e2000_18'
        }
      ]
    },

    'e2000_18': {
      year: 2018,
      age: 18,
      stage: '成年抉擇 · 升學與賽道',
      isCrucial: true,
      title: '【2018年 · 18歲 ⚠️】成人禮的大分水嶺',
      desc: '高中畢業，踏入全球化與高壓競爭的成人世界，你的第一張門票：',
      options: [
        {
          reqPerk: 'geek',
          text: '★【天賦專屬】憑藉深度開源演算法成果，獲頂尖科技大學全額獎學金特招。',
          effects: { intellect: 25, money: 15, happiness: 15 },
          log: '【2018年 18歲】你憑硬核實力叩開全球科技前沿大門。',
          nextEventId: 'e2000_20'
        },
        {
          reqPerk: 'music',
          text: '★【天賦專屬】被獨立廠牌簽約，受邀在草莓與日系音樂節登台演出。',
          effects: { eq: 22, happiness: 24, money: 8 },
          log: '【2018年 18歲】你正式踏上全職原創音樂人之路。',
          nextEventId: 'e2000_20'
        },
        {
          text: '🎓 考入名牌大學核心專業（醫療／法律／商科），按部就班修讀。',
          effects: { intellect: 18, money: -10, eq: 6 },
          log: '【2018年 18歲】你選擇了最穩紮穩打的菁英專業路線。',
          nextEventId: 'e2000_20'
        },
        {
          text: '💼 提早投身社會實習或創業，提早累積本金與實戰經驗。',
          effects: { money: 25, eq: 12, health: 4 },
          log: '【2018年 18歲】你提早體會真實市場的運作規則。',
          nextEventId: 'e2000_20'
        }
      ]
    },

    'e2000_20': {
      year: 2020,
      age: 20,
      stage: '歷史大事件 · 世紀封閉與遠端潮',
      isCrucial: true,
      title: '【2020年 · 20歲 ⚠️】全球停擺與遠距轉型',
      desc: '2020年全球迎來歷史性隔離與遠端辦公潮，原有節奏被打亂：',
      options: [
        {
          reqPerk: 'zen',
          text: '★【天賦專屬】居家隔離期間靜心精進，打造出遠端高效率的生活哲學。',
          effects: { happiness: 20, health: 12, eq: 10 },
          log: '【2020年 20歲】在動盪世界中，你保持了內心從容自洽。',
          nextEventId: 'e2000_24'
        },
        {
          text: '💻 抓住在線經濟紅利，兼職線上接案與自媒體創作，賺取第一桶金。',
          effects: { money: 30, intellect: 12, health: -6 },
          log: '【2020年 20歲】你踩準遠端數位紅利，實現收入翻倍。',
          nextEventId: 'e2000_24'
        },
        {
          text: '🏡 回家陪伴父母家人，鍛鍊廚藝與健康體能，守護家庭溫暖。',
          effects: { health: 15, happiness: 18, eq: 8 },
          log: '【2020年 20歲】你把時間留給至親，收穫了深厚的天倫之樂。',
          nextEventId: 'e2000_24'
        }
      ]
    },

    'e2000_24': {
      year: 2024,
      age: 24,
      stage: '歷史大事件 · 生成式 AI 大爆發',
      isCrucial: false,
      title: '【2024年 · 24歲】AI 時代的職業抉擇',
      desc: '生成式人工智慧席捲各行各業，傳統工作面臨重新洗牌：',
      options: [
        {
          reqPerk: 'geek',
          text: '★【天賦專屬】直接成為 AI 架構應用先行者，創立個人自動化微型工作室。',
          effects: { money: 45, intellect: 20, happiness: 15 },
          log: '【2024年 24歲】你成為新技術浪潮的弄潮兒，實現資產躍升。',
          nextEventId: 'e2000_35'
        },
        {
          text: '🎨 專注 AI 無法替代的純手工、真實情感與人際連結產業。',
          effects: { happiness: 22, eq: 16, health: 8 },
          log: '【2024年 24歲】你堅守真實人文價值，贏得客戶深厚信任。',
          nextEventId: 'e2000_35'
        },
        {
          text: '🏢 在成熟企業內熟練使用新工具提高五倍效率，成為部門核心骨幹。',
          effects: { money: 25, intellect: 10, eq: 8 },
          log: '【2024年 24歲】你在職場上立於不敗之地。',
          nextEventId: 'e2000_35'
        }
      ]
    },

    'e2000_35': {
      year: 2035,
      age: 35,
      stage: '三十五歲 · 成家與立業',
      isCrucial: true,
      title: '【2035年 · 35歲 ⚠️】人生的中場錨定',
      desc: '步入人生中場，三十五歲的你站在事業、家庭與心靈的十字路口：',
      options: [
        {
          text: '💍 與一生摯愛結為連理，購置溫馨住宅，把重心轉向家庭與下一代。',
          effects: { happiness: 26, eq: 15, money: -30, health: 5 },
          log: '【2035年 35歲】你擁有了屬於自己的避風港，踏實而溫暖。',
          nextEventId: 'e2000_65'
        },
        {
          text: '🚗 保持單身與極高流動性，買入越野車，過上「數字遊民」環球旅居生活。',
          effects: { happiness: 25, health: 12, money: -15, eq: 8 },
          log: '【2035年 35歲】你活得自在通透，用腳步丈量世界山川。',
          nextEventId: 'e2000_65'
        },
        {
          text: '💼 獨立創立個人品牌或投資實業，向財務自由與行業領袖發起衝刺。',
          effects: { money: 60, intellect: 15, health: -10, happiness: 10 },
          log: '【2035年 35歲】你憑魄力開闢出廣闊的商業版圖。',
          nextEventId: 'e2000_65'
        }
      ]
    },

    'e2000_65': {
      year: 2065,
      age: 65,
      stage: '夕陽晚晴 · 人生結算',
      isCrucial: false,
      title: '【2065年 · 65歲】午後庭院的回甘',
      desc: '退休之年，窗外陽光和煦。回望大半生走過的所有歷史浪潮：',
      options: [
        {
          text: '🌍 牽著伴侶的手踏上最後一趟慢速環球旅行，將記憶化為永恆。',
          effects: { happiness: 30, money: -20, health: 5 },
          log: '【2065年 65歲】你活得精彩從容，人生無悔。',
          nextEventId: 'end'
        },
        {
          text: '🏡 在小花園種花、彈結他、著書立說，將一生睿智傳授晚輩。',
          effects: { happiness: 25, health: 15, eq: 12 },
          log: '【2065年 65歲】你在平淡雅緻中安享天倫之樂。',
          nextEventId: 'end'
        }
      ]
    }
  }
};

// 遊戲即時狀態
let state = {
  currentEra: null,
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

// 四季背景聯動
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
        <span style="font-size:10px; color:#666;">${state.birthCountry.name} · ${state.familyBackground.name}</span>
      </div>
    `;
  }
}

// 渲染第一步：時代選擇（預設主推千禧，保留其他三色時代）
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
  if (subHeader) subHeader.innerText = 'SELECT ERA & START LIFE';

  let html = `
    <div style="margin: auto 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span class="tag-badge">人生模擬器</span>
        <button id="open-hof-btn" style="background: #e9e4d6; border: 1px solid #4a483e; border-radius: 12px; font-size: 10px; font-weight: bold; padding: 2px 8px; cursor: pointer;">
          🏆 人生圖鑑
        </button>
      </div>
      <p style="font-size: 11.5px; color: #666; margin-bottom: 10px; text-align: center;">選擇啟程的時代：</p>
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
        startOriginRoll(btn.dataset.id);
      };
    });

    const hofBtn = document.getElementById('open-hof-btn');
    if (hofBtn) hofBtn.onclick = showHallOfFame;
  }
}

// 雙重隨機抽籤：隨機國度 + 隨機家庭背景
function startOriginRoll(eraId) {
  state.currentEra = gameData.eras.find(e => e.id === eraId);

  // 隨機抽 1 個國度 + 1 個家庭
  state.birthCountry = birthCountries[Math.floor(Math.random() * birthCountries.length)];
  state.familyBackground = familyBackgrounds[Math.floor(Math.random() * familyBackgrounds.length)];

  // 進入全螢幕 3D 抽卡
  triggerFullscreenGacha();
}

// 全螢幕 3D 抽卡
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
    <div class="gacha-title-banner">
      <h2>✦ 命運投胎 · 核心天賦 ✦</h2>
      <p>出生國度: <strong>${state.birthCountry.name}</strong> | 出身背景: <strong>${state.familyBackground.name}</strong></p>
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
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      startLifeSimulation();
    }, 500);
  };
}

// 開啟人生進程
function startLifeSimulation() {
  const statsPanel = document.getElementById('stats-panel');
  const subHeader = document.getElementById('sub-header');

  state.stats = { ...state.currentEra.initialStats };

  // 疊加國家加成
  for (const [k, v] of Object.entries(state.birthCountry.stats)) {
    state.stats[k] = (state.stats[k] || 0) + v;
  }
  // 疊加家庭加成
  for (const [k, v] of Object.entries(state.familyBackground.stats)) {
    state.stats[k] = (state.stats[k] || 0) + v;
  }
  // 疊加選定天賦
  const perk = allPerks.find(p => p.id === state.selectedPerk);
  if (perk && perk.stats) {
    for (const [k, v] of Object.entries(perk.stats)) {
      state.stats[k] = (state.stats[k] || 0) + v;
    }
  }

  state.logs = [`【2000年 0歲】你降生於【${state.birthCountry.name}】的【${state.familyBackground.name}】，自帶天賦【${perk ? perk.name : ''}】。`];
  state.currentEventId = state.currentEra.startEventId;

  if (subHeader) subHeader.innerText = `${state.birthCountry.name} | ${state.familyBackground.name}`;
  if (statsPanel) statsPanel.classList.remove('hidden');
  updateStatsUI();
  renderEvent(state.currentEventId);
}

// 渲染事件節點
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
        <span style="font-size: 11px; font-weight: 900; color: #c4573f;">【${event.year || ''} · ${event.age}歲】</span>
      </div>
      <div class="dialog-box">
        <strong style="display: block; margin-bottom: 4px; font-size: 13.5px;">${event.title}</strong>
        ${event.desc}
      </div>
    </div>
    <div style="margin-top: 4px; max-height: 290px; overflow-y: auto;">
  `;

  event.options.forEach((opt, idx) => {
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

// 結算畫面與存入人生紀念冊
function renderEnding() {
  const canvas = document.getElementById('game-canvas');
  
  let title = "【★ 踏實圓滿的歲月 ★】";
  let desc = "你在時代沉浮中守護住了內心的平靜與家庭的溫暖，回望此生，坦蕩且溫柔。";
  let achievementId = "peaceful_life";

  if (state.stats.money >= 90 && state.stats.happiness >= 75) {
    title = "【★ 自由與從容的極致者 ★】";
    desc = "你兼顧了物質豐盛與心靈安寧，在歲月的長河裡活出了真正通透的境界。";
    achievementId = "wealth_freedom";
  } else if (state.stats.intellect >= 85) {
    title = "【★ 時代先鋒探索者 ★】";
    desc = "你的專注與深邃認知，讓你在自己耕耘的領域留下了深刻而獨特的印記。";
    achievementId = "master_mind";
  } else if (state.stats.happiness >= 85) {
    title = "【★ 靈魂自在的旅人 ★】";
    desc = "你從未被任何世俗標籤束縛，始終溫柔真誠地對待生活，活出了最純粹的自己。";
    achievementId = "free_soul";
  }

  // 儲存成就至 LocalStorage
  saveAchievement({
    title,
    date: new Date().toLocaleDateString(),
    country: state.birthCountry.name,
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
      🔄 漫步下一段人生 (RESTART)
    </button>
  `;
  if (canvas) {
    canvas.innerHTML = html;
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.onclick = renderEraSelect;
  }
}

// ================= 圖鑑與成就系統 =================
function saveAchievement(record) {
  let list = JSON.parse(localStorage.getItem('life_achievements') || '[]');
  list.unshift(record);
  if (list.length > 20) list.pop(); // 最多保留 20 條
  localStorage.setItem('life_achievements', JSON.stringify(list));
}

function showHallOfFame() {
  const list = JSON.parse(localStorage.getItem('life_achievements') || '[]');
  const modal = document.createElement('div');
  modal.className = 'hall-of-fame-modal';

  let itemsHtml = list.length === 0 
    ? '<p style="text-align:center; font-size:12px; color:#666;">暫未解鎖人生圖鑑，快去通關一次吧！</p>'
    : list.map((item, idx) => `
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
