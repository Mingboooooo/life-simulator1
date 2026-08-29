// 寫實人生模擬器：全年代、全生命週期劇本庫
const gameData = {
  eras: [
    {
      id: '1970',
      title: '【1970 年代】經濟起飛與拼搏期',
      icon: '🏭',
      desc: '物資相對匱乏，但處處係白手興家嘅機會。人情味濃，靠雙手同膽識打拼天下。',
      initialStats: { intellect: 45, eq: 55, health: 65, happiness: 55, money: 20 },
      startEventId: 'e1970_infant'
    },
    {
      id: '2000',
      title: '【千禧 2000 年】互聯網與轉型潮',
      icon: '📟',
      desc: '無智能手機嘅純真童年，遇上資訊爆炸同全球化，充滿機遇與變革。',
      initialStats: { intellect: 50, eq: 50, health: 60, happiness: 65, money: 40 },
      startEventId: 'e2000_infant'
    },
    {
      id: '2010',
      title: '【2010 年代後】數碼原生與內卷期',
      icon: '📱',
      desc: '出生就接觸平板與演算法，物質極度豐富，但學業競爭與心理壓力亦前所未有。',
      initialStats: { intellect: 60, eq: 45, health: 50, happiness: 45, money: 60 },
      startEventId: 'e2010_infant'
    }
  ],
  events: {
    // ================= 2000 千禧年主線 =================
    'e2000_infant': {
      age: 3,
      stage: '幼兒啟蒙 (0-5歲)',
      title: '【3歲】客廳裡的探索時光',
      desc: '千禧年初，屋企買咗第一部大牛龜電視機同錄影帶。你平時喺屋企最鍾意：',
      options: [
        {
          text: '🧩 靜靜坐喺地墊玩積木、拼圖同拆舊玩具。',
          effects: { intellect: 8, eq: -2, happiness: 5 },
          log: '【3歲】你展現出對空間同結構嘅專注力，自得其樂。',
          nextEventId: 'e2000_child'
        },
        {
          text: '🏃 喺屋企跑跑跳跳，成日跟住隔離屋小朋友落街捉伊人。',
          effects: { health: 8, eq: 8, happiness: 10 },
          log: '【3歲】你性格外向好動，成為街坊鄰里間嘅開心果。',
          nextEventId: 'e2000_child'
        }
      ]
    },
    'e2000_child': {
      age: 8,
      stage: '童年才藝與課餘 (6-11歲)',
      title: '【8歲】課餘興趣的起點',
      desc: '小學三年級，學校同屋企鼓勵你報一個長期的課外活動：',
      options: [
        {
          text: '🎸 學木結他 / 鋼琴，培養音樂與節奏感。',
          effects: { eq: 10, intellect: 5, happiness: 8, money: -5 },
          log: '【8歲】你開始接觸樂器，指尖慢慢磨出繭，多咗一份文藝氣質。',
          nextEventId: 'e2000_teen_exam'
        },
        {
          text: '⚽ 加入校隊（游水／籃球／田徑），接受規律體能訓練。',
          effects: { health: 15, eq: 6, intellect: -2, happiness: 5 },
          log: '【8歲】風雨不改嘅訓練練就咗你強健嘅體魄與團隊精神。',
          nextEventId: 'e2000_teen_exam'
        },
        {
          text: '💻 屋企裝咗寬頻，自己上網摸索電腦系統與論壇。',
          effects: { intellect: 12, health: -5, eq: -3, happiness: 6 },
          log: '【8歲】你提早成為網民，習慣透過互聯網吸收全世界嘅新資訊。',
          nextEventId: 'e2000_teen_exam'
        }
      ]
    },
    'e2000_teen_exam': {
      age: 17,
      stage: '中學升學與文理抉擇 (16-18歲)',
      title: '【17歲】公開試與志向抉擇',
      desc: '高中最後階段，面對升學考試與未來人生方向，你將大部分精力投入在：',
      options: [
        {
          text: '📚 苦讀文理主科，目標衝入頂尖大學的專業學科（醫/法/商/工程）。',
          effects: { intellect: 15, health: -8, happiness: -5, eq: 2 },
          log: '【17歲】你頂住巨大壓力考入理想大學，為專業路打下基石。',
          nextEventId: 'e2000_uni_life'
        },
        {
          text: '🎨 專注個人熱愛（設計／獨立創作／實用技能），唔盲目追分數。',
          effects: { happiness: 15, eq: 8, intellect: 5, money: -5 },
          log: '【17歲】你保持咗獨特嘅個人思維，走出與眾不同嘅升學路線。',
          nextEventId: 'e2000_uni_life'
        }
      ]
    },
    'e2000_uni_life': {
      age: 21,
      stage: '大學與感情探索 (19-23歲)',
      title: '【21歲】青春的交匯點',
      desc: '大學或大專時期，生活自由度大增。面對初戀、社交圈與個人提升：',
      options: [
        {
          text: '❤️ 遇見志趣相投的伴侶，認真經營一段穩定深厚的感情。',
          effects: { happiness: 18, eq: 12, money: -8 },
          log: '【21歲】你收穫咗珍貴的愛情，學識點樣同另一個人互相包容成長。',
          nextEventId: 'e2000_early_career'
        },
        {
          text: '💼 保持單身，時間全副投入實習、考專業牌照或兼職儲錢。',
          effects: { money: 20, intellect: 10, eq: 5, happiness: -3 },
          log: '【21歲】你提早累積職場資本與積蓄，對未來有清晰規劃。',
          nextEventId: 'e2000_early_career'
        }
      ]
    },
    'e2000_early_career': {
      age: 26,
      stage: '職場初期與資產選擇 (24-30歲)',
      title: '【26歲】出社會後的第一筆重大預算',
      desc: '工作咗幾年手頭有一筆積蓄，面對生活質素與資產分配的考驗：',
      options: [
        {
          text: '🚗 買一部二手車代步，提升生活半徑與假日自駕質素。',
          effects: { happiness: 12, money: -18, eq: 4 },
          log: '【26歲】你買咗人生第一部車，換來假期說走就走的自由。',
          nextEventId: 'e2000_midlife'
        },
        {
          text: '📈 嚴格控制開支，全數投入穩健指數基金或藍籌作長期複利。',
          effects: { money: 25, intellect: 8, happiness: -2 },
          log: '【26歲】你建立起自律的資產配置系統，本金開始穩定滾動。',
          nextEventId: 'e2000_midlife'
        },
        {
          text: '🏠 同伴侶夾份供首期，合力買入屬於自己嘅第一個小單位。',
          effects: { happiness: 15, money: -30, eq: 10, health: -5 },
          log: '【26歲】你孭起樓按供款，雖然壓力大，但擁有咗安穩的家。',
          nextEventId: 'e2000_midlife'
        }
      ]
    },
    'e2000_midlife': {
      age: 40,
      stage: '中年轉折與責任 (35-50歲)',
      title: '【40歲】中流砥柱與身心平衡',
      desc: '步入中年，事業步入成熟期，家庭與身體亦開始發出不同訊號：',
      options: [
        {
          text: '🧗 勇敢跳出大公司舒適圈，利用累積的人脈與資本獨立創業。',
          effects: { money: 35, intellect: 10, health: -12, happiness: 8 },
          log: '【40歲】你冒險開展個人事業，打拼出屬於自己的一片天空。',
          nextEventId: 'e2000_elder'
        },
        {
          text: '🧘 退居二線追求 Work-Life Balance，重拾健身、結他與家庭生活。',
          effects: { health: 18, happiness: 22, money: 5, eq: 8 },
          log: '【40歲】你睇通人生優先次序，保持極佳的身心狀態與家庭關係。',
          nextEventId: 'e2000_elder'
        }
      ]
    },
    'e2000_elder': {
      age: 65,
      stage: '晚年與人生收穫 (60歲+)',
      title: '【65歲】夕陽下的漫步',
      desc: '到達法定退休年齡，回望大半生波瀾起伏嘅選擇：',
      options: [
        {
          text: '🌍 帶著伴侶環遊世界，將多年積蓄化作開闊回憶。',
          effects: { happiness: 25, money: -20, health: 5 },
          log: '【65歲】你同伴侶踏遍各地，人生無憾。',
          nextEventId: 'end'
        },
        {
          text: '🏡 回歸寧靜田園生活，專注個人愛好與提攜後輩。',
          effects: { happiness: 20, health: 12, eq: 10 },
          log: '【65歲】你享受安寧的晚年生活，深受晚輩尊敬。',
          nextEventId: 'end'
        }
      ]
    },

    // ================= 1970 年代主線 =================
    'e1970_infant': {
      age: 6,
      stage: '童年幫補家計 (0-10歲)',
      title: '【6歲】唐樓裏的穿膠花歲月',
      desc: '70年代物質簡樸，一家大細圍埋喺客廳做家庭手工幫補家計：',
      options: [
        {
          text: '✋ 乖乖幫屋企穿膠花、剪線頭，鍛鍊手藝同耐性。',
          effects: { eq: 10, money: 10, intellect: 4, happiness: 5 },
          log: '【6歲】你早早體會到賺錢艱難，培養出堅韌耐勞嘅品格。',
          nextEventId: 'e1970_teen'
        },
        {
          text: '🏃 跑上天台同後巷同鄰居細路跳橡筋繩、打波子。',
          effects: { health: 15, happiness: 12, eq: 5 },
          log: '【6歲】你擁有充滿野性同笑聲嘅街頭童年。',
          nextEventId: 'e1970_teen'
        }
      ]
    },
    'e1970_teen': {
      age: 16,
      stage: '青年抉擇 (15-20歲)',
      title: '【16歲】工廠打工還是夜校苦讀',
      desc: '工業高速增長，身邊同學紛紛投身社會，你選擇：',
      options: [
        {
          text: '🏭 入工廠/洋行跟師傅學一門專業技術（如車床、印刷、維修）。',
          effects: { money: 20, intellect: 8, health: -5 },
          log: '【16歲】你學得一技之長，好快能夠自立生活。',
          nextEventId: 'e1970_career'
        },
        {
          text: '📖 日間打散工，夜晚去夜校苦讀英文與商科。',
          effects: { intellect: 18, eq: 8, health: -8, happiness: 5 },
          log: '【16歲】你憑毅力補足學歷，為轉型現代商貿打下基礎。',
          nextEventId: 'e1970_career'
        }
      ]
    },
    'e1970_career': {
      age: 30,
      stage: '黃金年代機遇 (25-35歲)',
      title: '【30歲】乘上時代的浪潮',
      desc: '80-90年代股市與地產大爆發，各行各業遍地黃金：',
      options: [
        {
          text: '🏢 大膽借貸頂手一間小店舖／小貿易行，自己做老闆。',
          effects: { money: 45, eq: 12, health: -10, happiness: 10 },
          log: '【30歲】你踩中經濟起飛紅利，事業急速擴張。',
          nextEventId: 'e1970_elder'
        },
        {
          text: '🏠 踏實儲錢買入第一層樓，專注家庭安穩。',
          effects: { money: 30, happiness: 18, health: 8 },
          log: '【30歲】你享受咗資產升值帶來的紅利，生活無憂。',
          nextEventId: 'e1970_elder'
        }
      ]
    },
    'e1970_elder': {
      age: 65,
      stage: '安享晚年 (60歲+)',
      title: '【65歲】歲月神偷',
      desc: '經歷過時代風雲變幻，你坐喺茶樓回顧一生：',
      options: [
        {
          text: '🍵 每日同老友記飲茶落公園落棋，安享天倫。',
          effects: { happiness: 20, health: 10 },
          log: '【65歲】你過著平淡富足的晚年。',
          nextEventId: 'end'
        }
      ]
    },

    // ================= 2010 年代後主線 =================
    'e2010_infant': {
      age: 5,
      stage: '幼兒啟蒙 (0-6歲)',
      title: '【5歲】平板螢幕與興趣班',
      desc: '出生於智慧型裝置普及年代，家長安排滿滿的課表：',
      options: [
        {
          text: '📱 自小熟練操作 iPad 睇科普與外語動畫。',
          effects: { intellect: 12, health: -6, eq: -4 },
          log: '【5歲】你極早建立資訊搜尋能力，但對螢幕產生依賴。',
          nextEventId: 'e2010_teen'
        },
        {
          text: '🛹 拒絕螢幕，堅持報名攀石、游水同戶外體適能。',
          effects: { health: 16, eq: 8, happiness: 10 },
          log: '【5歲】你擁有極佳體能協調，結識咗好多戶外同伴。',
          nextEventId: 'e2010_teen'
        }
      ]
    },
    'e2010_teen': {
      age: 16,
      stage: '中學時期 (13-18歲)',
      title: '【16歲】演算法世界的自我定位',
      desc: '社交平台與短影音盛行，同輩間焦慮與流量競爭加劇：',
      options: [
        {
          text: '🎥 發揮個人特長自製高質自媒體內容，經營個人品牌。',
          effects: { money: 25, eq: 15, intellect: 8, health: -6 },
          log: '【16歲】你成為年輕創作者，提早理解流量與商業邏輯。',
          nextEventId: 'e2010_early_career'
        },
        {
          text: '🧠 屏蔽社交雜音，專心研究 AI 工具與硬核科學知識。',
          effects: { intellect: 22, happiness: 6, eq: -2 },
          log: '【16歲】你具備超越同齡人的技術視野。',
          nextEventId: 'e2010_early_career'
        }
      ]
    },
    'e2010_early_career': {
      age: 25,
      stage: '青年職場 (20-30歲)',
      title: '【25歲】遠距工作與自由人生',
      desc: 'AI 普及與新型工作模式下，你選擇的工作模式：',
      options: [
        {
          text: '💻 成為數字遊民（Digital Nomad），邊環球旅行邊遠端接案。',
          effects: { happiness: 24, eq: 14, money: 10, health: 8 },
          log: '【25歲】你打破地域限制，過上高度自主的自由職業生涯。',
          nextEventId: 'end'
        },
        {
          text: '🏢 投身核心科技研發企業，參與前沿項目。',
          effects: { money: 35, intellect: 18, health: -10 },
          log: '【25歲】你在行業核心領域佔據一席之地。',
          nextEventId: 'end'
        }
      ]
    }
  }
};

// 遊戲即時狀態
let state = {
  currentEra: null,
  stats: { intellect: 50, eq: 50, health: 50, happiness: 50, money: 0 },
  logs: [],
  currentEventId: null
};

// 更新 5 大數值面板
function updateStatsUI() {
  const panel = document.getElementById('stats-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="stat-box"><span class="stat-intellect">★ 智商:</span><span class="stat-val">${state.stats.intellect}</span></div>
    <div class="stat-box"><span class="stat-charm">◆ 情商:</span><span class="stat-val">${state.stats.eq}</span></div>
    <div class="stat-box"><span class="stat-physique">♥ 健康:</span><span class="stat-val">${state.stats.health}</span></div>
    <div class="stat-box"><span class="stat-happiness">☺ 幸福:</span><span class="stat-val">${state.stats.happiness}</span></div>
    <div class="stat-box" style="grid-column: span 2;"><span style="color:#fbbf24;">💰 資產值:</span><span class="stat-val">${state.stats.money} 萬</span></div>
  `;
}

// 時代選擇畫面
function renderEraSelect() {
  const canvas = document.getElementById('game-canvas');
  const statsPanel = document.getElementById('stats-panel');
  const subHeader = document.getElementById('sub-header');

  if (statsPanel) statsPanel.classList.add('hidden');
  if (subHeader) subHeader.innerText = 'CHOOSE BIRTH ERA';

  let html = `
    <div style="margin: auto 0;">
      <div style="text-align: center; margin-bottom: 10px;">
        <span class="tag-badge">寫實人生模擬</span>
        <p style="font-size: 11px; color: #86b564; margin-top: 6px;">選擇你的出生年代背景：</p>
      </div>
  `;

  gameData.eras.forEach(era => {
    html += `
      <button class="pixel-btn era-btn" data-id="${era.id}">
        <div>${era.icon} ${era.title}</div>
        <div style="font-size: 10px; color: #9fcb7f; font-weight: normal; margin-top: 4px; line-height: 1.4;">${era.desc}</div>
      </button>
    `;
  });

  html += `</div>`;
  if (canvas) {
    canvas.innerHTML = html;
    canvas.querySelectorAll('.era-btn').forEach(btn => {
      btn.onclick = () => startGame(btn.dataset.id);
    });
  }
}

// 開始遊戲
function startGame(eraId) {
  const statsPanel = document.getElementById('stats-panel');
  const subHeader = document.getElementById('sub-header');
  const era = gameData.eras.find(e => e.id === eraId);

  state.currentEra = era;
  state.stats = { ...era.initialStats };
  state.logs = [`【0歲 出生】你在 ${era.title} 呱呱墜地。`];
  state.currentEventId = era.startEventId;

  if (subHeader) subHeader.innerText = `時代背景: ${era.id} 年`;
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
  let html = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span class="tag-badge">${event.stage || '人生節點'}</span>
        <span style="font-size: 10px; color: #f59e0b; font-weight: bold;">【${event.age} 歲】</span>
      </div>
      <div class="dialog-box">
        <strong style="color: #d4f88d; display: block; margin-bottom: 4px;">${event.title}</strong>
        ${event.desc}
      </div>
    </div>
    <div style="margin-top: 6px;">
  `;

  event.options.forEach((opt, idx) => {
    html += `
      <button class="pixel-btn opt-btn" data-idx="${idx}">
        ${opt.text}
      </button>
    `;
  });

  html += `</div>`;
  if (canvas) {
    canvas.innerHTML = html;
    canvas.querySelectorAll('.opt-btn').forEach(btn => {
      btn.onclick = () => chooseOption(eventId, parseInt(btn.dataset.idx));
    });
  }
}

// 處理選擇與數值變化
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

// 渲染人生結局
function renderEnding() {
  const canvas = document.getElementById('game-canvas');
  
  let title = "【★ 踏實圓滿的人生 ★】";
  let desc = "你在時代的沉浮中守護住了內心的平靜與家庭的溫暖。";

  if (state.stats.money >= 80 && state.stats.happiness >= 70) {
    title = "【★ 財富與自由雙贏者 ★】";
    desc = "你兼顧了物質財富與精神滿足，達成了世俗與自我價值的極致平衡！";
  } else if (state.stats.intellect >= 85) {
    title = "【★ 卓越智慧先驅 ★】";
    desc = "你的專注與深度認知，讓你在專業領域留下了深刻的印記！";
  } else if (state.stats.happiness >= 85) {
    title = "【★ 靈魂自由旅人 ★】";
    desc = "你從未被世俗框架束縛，活出了最通透、最快樂的人生！";
  } else if (state.stats.health < 40) {
    title = "【★ 燃燒過度的奮鬥者 ★】";
    desc = "你為事業同生活付出一切，但身體亦發出了疲累的警告，值得停低腳步好好休養。";
  }

  let html = `
    <div>
      <div style="text-align: center; background: #283b1f; border: 2px solid #557a3e; padding: 6px;">
        <span style="font-size: 10px; color: #fcd34d; font-weight: bold; display: block;">=== 人生終章結算 ===</span>
        <h2 style="font-size: 13px; color: #f5ffdc; margin-top: 2px;">${title}</h2>
      </div>
      <div class="dialog-box" style="margin-top: 8px;">${desc}</div>
      
      <div class="log-scroll-area" style="max-height: 140px;">
        <span style="font-size: 9px; color: #6d9651; display: block; margin-bottom: 4px;">▶ 一生大事紀回顧:</span>
        ${state.logs.map(log => `<div class="log-item">${log}</div>`).join('')}
      </div>
    </div>

    <button id="restart-btn" class="pixel-btn" style="background: #4d7037; color: #fff; text-align: center; margin-top: 10px;">
      🔄 開啟下一世人生 (RESTART)
    </button>
  `;
  if (canvas) {
    canvas.innerHTML = html;
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.onclick = renderEraSelect;
  }
}

// 啟動
renderEraSelect();
