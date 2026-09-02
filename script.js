// 寫實人生模擬器：超詳細細分年齡、命運轉折版
const gameData = {
  eras: [
    {
      id: '2000',
      title: '【千禧 2000 年】互聯網與轉型潮',
      icon: '📟',
      desc: '無智慧型手機嘅實體童年，撞正網絡科技爆發與現代城市轉型，充滿無限變數。',
      initialStats: { intellect: 50, eq: 50, health: 60, happiness: 65, money: 30 },
      startEventId: 'e2000_3'
    },
    {
      id: '1970',
      title: '【1970 年代】白手興家與拼搏期',
      icon: '🏭',
      desc: '物資匱乏但遍地黃金，全靠一雙手同拚搏意志打天下，考驗意志力與膽識。',
      initialStats: { intellect: 45, eq: 55, health: 65, happiness: 55, money: 15 },
      startEventId: 'e1970_6'
    },
    {
      id: '2010',
      title: '【2010 年代後】數碼原生與內卷期',
      icon: '📱',
      desc: '出生自帶演算法與智慧螢幕，物質極度豐富，但學業與同輩壓力前所未有。',
      initialStats: { intellect: 60, eq: 45, health: 50, happiness: 45, money: 50 },
      startEventId: 'e2010_5'
    }
  ],
  events: {
    // ==========================================
    // 2000 千禧世代主線（超細分人生 9 大階段）
    // ==========================================
    'e2000_3': {
      age: 3,
      stage: '幼兒啟蒙期 (0-5歲)',
      isCrucial: false,
      title: '【3歲】客廳地板上的小小宇宙',
      desc: '屋企剛買咗台大牛龜電視機同錄影帶機，平時大人返工，你喺客廳地墊最鍾意玩咩？',
      options: [
        {
          text: '🧩 專注玩積木、拼圖，拆開舊收音機同玩具車摸索內部零件。',
          effects: { intellect: 8, eq: -2, happiness: 6 },
          log: '【3歲】你展現出超強的結構專注力，懂得自得其樂。',
          nextEventId: 'e2000_7'
        },
        {
          text: '🏃 跑跑跳跳，成日跟住鄰居小朋友落街捉伊人、跑樓梯。',
          effects: { health: 10, eq: 8, happiness: 8 },
          log: '【3歲】你性格好動外向，成為街坊鄰里間的小開心果。',
          nextEventId: 'e2000_7'
        },
        {
          text: '🎨 攞住顏色筆喺全屋牆壁塗鴉，沉浸喺天馬行空嘅想像世界。',
          effects: { happiness: 12, intellect: 4, eq: 4 },
          log: '【3歲】你想像力豐富，對色彩同視覺世界特別敏感。',
          nextEventId: 'e2000_7'
        }
      ]
    },

    'e2000_7': {
      age: 7,
      stage: '小學童年與課餘技能 (6-11歲)',
      isCrucial: false,
      title: '【7歲】放學鐘聲響起之後',
      desc: '小學二年級，學校課餘時間同屋企人都鼓勵你培養一門可以堅持一生的專長：',
      options: [
        {
          text: '🎸 學木結他 / 鋼琴，每日放學風雨不改練指法。',
          effects: { eq: 10, intellect: 6, happiness: 8, money: -5 },
          log: '【7歲】指尖磨出硬繭，你多咗一份文藝感同對旋律的敏銳度。',
          nextEventId: 'e2000_12'
        },
        {
          text: '⚽ 加入田徑 / 籃球校隊，習慣規律汗水同競技對抗。',
          effects: { health: 15, eq: 8, intellect: -2, happiness: 6 },
          log: '【7歲】高強度體能訓練練就咗你強韌的體魄同不服輸的性格。',
          nextEventId: 'e2000_12'
        },
        {
          text: '🪀 沉迷四驅車、爆旋陀螺與掌機對戰，成為街頭孩子王。',
          effects: { eq: 12, happiness: 15, intellect: 2, money: -3 },
          log: '【7歲】你收穫咗最純粹的童年死黨，懂得點樣同各路人馬打交道。',
          nextEventId: 'e2000_12'
        },
        {
          text: '💻 屋企裝咗寬頻，成日偷偷上網摸索系統設定同網頁。',
          effects: { intellect: 14, health: -6, happiness: 5 },
          log: '【7歲】你提早成為初代網民，自學掌握咗豐富的數碼資訊。',
          nextEventId: 'e2000_12'
        }
      ]
    },

    'e2000_12': {
      age: 12,
      stage: '初中叛逆與自我定位 (12-15歲)',
      isCrucial: false,
      title: '【12歲】校服褲管與耳機裏的旋律',
      desc: '踏入初中，身體急速發育，同輩壓力同自我意識爆發，你平時的精力主要放喺：',
      options: [
        {
          text: '📚 默默做筆記苦讀，立志爭入精英班與重點名校高中。',
          effects: { intellect: 14, eq: -2, health: -4, happiness: -4 },
          log: '【12歲】你在成績榜名列前茅，但逐漸感受到升學競爭的枯燥。',
          nextEventId: 'e2000_18'
        },
        {
          text: '🎧 買 MP3 戴耳機聽流行音樂與獨立樂隊，開始嘗試自己寫詞彈歌。',
          effects: { eq: 12, happiness: 14, intellect: 4 },
          log: '【12歲】你在音樂同感性世界搵到共鳴，建立起獨特的審美。',
          nextEventId: 'e2000_18'
        },
        {
          text: '🤝 同班上死黨稱兄道弟，日日放學落波地打街場至天黑。',
          effects: { health: 12, eq: 10, happiness: 10, intellect: -4 },
          log: '【12歲】你的人緣極佳，結識咗能夠講心事的一生好友。',
          nextEventId: 'e2000_18'
        }
      ]
    },

    'e2000_18': {
      age: 18,
      stage: '中學畢業與成年分水嶺 (18-19歲)',
      isCrucial: true,
      title: '【18歲】成人禮上的重大抉擇',
      desc: '高中畢業，面對人生第一張極其關鍵的入場券，你的決定將徹底改變人生軌道：',
      options: [
        {
          text: '🎓 拼盡全力考入傳統名牌大學實用專業（商科/法律/醫療/工程）。',
          effects: { intellect: 18, money: -10, health: -6, eq: 4 },
          log: '【18歲 ⚠️ 人生轉折】你拿到了主流社會的精英入場券，開啟高壓專業養成。',
          nextEventId: 'e2000_23'
        },
        {
          text: '🎨 堅持攻讀自己熱愛的冷門或藝術設計學院，探索個人創作。',
          effects: { happiness: 16, eq: 10, intellect: 8, money: -8 },
          log: '【18歲 ⚠️ 人生轉折】你拒絕主流模板，選擇用熱愛同創意定義自我。',
          nextEventId: 'e2000_23'
        },
        {
          text: '💼 放棄長遠升學，直接投身職場或學門扎實技術，提早累積本金。',
          effects: { money: 25, eq: 12, health: 4, intellect: -4 },
          log: '【18歲 ⚠️ 人生轉折】你提早踏入社會大熔爐，比同齡人更早體會現實與金錢價值。',
          nextEventId: 'e2000_23'
        },
        {
          text: '💻 利用自學的編程或自媒體技能，嘗試在互聯網展開獨立接案與小項目。',
          effects: { intellect: 15, happiness: 12, money: 10, health: -5 },
          log: '【18歲 ⚠️ 人生轉折】你踩上互聯網自主創業浪潮，過上非傳統的自由節奏。',
          nextEventId: 'e2000_23'
        }
      ]
    },

    'e2000_23': {
      age: 23,
      stage: '初入職場與第一桶金 (20-25歲)',
      title: '【23歲】第一張工資單與現實重拳',
      desc: '踏出校園正式全職工作，月薪落袋後除去租金開支，你如何對待自己的生活：',
      options: [
        {
          text: '🏢 進入大型跨國企業做基層，自願加班卷業績爭取三年內升職。',
          effects: { money: 20, intellect: 10, health: -10, happiness: -6 },
          log: '【23歲】你以健康同休閒為代價，在職場梯級上快速向上爬。',
          nextEventId: 'e2000_28'
        },
        {
          text: '☕ 搵份朝九晚五壓力小的普通工作，將精力留畀放工後的健身、興趣與社交。',
          effects: { happiness: 18, health: 10, money: 5, eq: 6 },
          log: '【23歲】你過著極度平衡的生活，精神狀態非常充實健康。',
          nextEventId: 'e2000_28'
        },
        {
          text: '📈 極限自律節儉，將所有剩餘工資定期定額投進全球指數或股票學習理財。',
          effects: { money: 25, intellect: 12, happiness: -2 },
          log: '【23歲】你提早理解資產與複利邏輯，累積起堅實的財務防護墊。',
          nextEventId: 'e2000_28'
        }
      ]
    },

    'e2000_28': {
      age: 28,
      stage: '成家立業與資產關鍵 (26-32歲)',
      isCrucial: true,
      title: '【28歲】婚姻、車樓與資產大分水嶺',
      desc: '身邊朋友陸續結婚派帖，長輩催促買樓上車，面對手頭第一筆可觀積蓄，你選擇：',
      options: [
        {
          text: '💍 同相愛多年的另一半拉埋天窗，合力供首期置業築起愛巢。',
          effects: { happiness: 22, eq: 14, money: -35, health: -5 },
          log: '【28歲 ⚠️ 人生轉折】你揹起三十年房貸責任，但擁有咗溫暖且穩固的家庭港灣。',
          nextEventId: 'e2000_35'
        },
        {
          text: '🚗 堅持單身或租樓同居，買入心儀已久的自駕車，追求高流動性與生活享受。',
          effects: { happiness: 16, money: -18, eq: 8, health: 4 },
          log: '【28歲 ⚠️ 人生轉折】你拒絕被磚頭鎖死人生，享受假期說走就走的自駕自由。',
          nextEventId: 'e2000_35'
        },
        {
          text: '💼 謝絕買車買樓等負債，將資金全副保留，作為日後全職創業或跳槽深造的籌碼。',
          effects: { money: 35, intellect: 12, happiness: 4, eq: 4 },
          log: '【28歲 ⚠️ 人生轉折】你保持高度的資本機動性，時刻準備捕捉時代新機會。',
          nextEventId: 'e2000_35'
        }
      ]
    },

    'e2000_35': {
      age: 35,
      stage: '中年轉折與責任承擔 (33-45歲)',
      title: '【35歲】中流砥柱的危機與突圍',
      desc: '體力開始不如二十出頭，上有老下有小，職場升遷亦進入天花板：',
      options: [
        {
          text: '🧗 勇敢跳出大機構，利用十幾年累積的人脈與技術獨立創業開公司。',
          effects: { money: 45, intellect: 12, health: -14, happiness: 8 },
          log: '【35歲】你承擔巨大風險博取個人上限，成功開闢出個人事業王國。',
          nextEventId: 'e2000_48'
        },
        {
          text: '🛡️ 守好現有管理職位，專注公司內部政治與安穩收入，重心全面回歸陪伴家人。',
          effects: { happiness: 18, eq: 10, health: 6, money: 15 },
          log: '【35歲】你選擇安穩防守，見證子女成長同父母安康，內心平靜。',
          nextEventId: 'e2000_48'
        },
        {
          text: '🧘 毅然轉換跑道，降薪去從事心底真正熱愛但過去不敢碰的志業。',
          effects: { happiness: 25, health: 12, money: -15, eq: 8 },
          log: '【35歲】你打破中年魔咒，為自己的靈魂真正活了一次。',
          nextEventId: 'e2000_48'
        }
      ]
    },

    'e2000_48': {
      age: 48,
      stage: '人生大關與健康洗禮 (46-58歲)',
      isCrucial: true,
      title: '【48歲】暴風雨後的自我審視',
      desc: '一場突如其來的體檢報告紅字或經濟週期波動，敲響了人生的警鐘：',
      options: [
        {
          text: '🩺 徹底放下執念，開始每週高強度運動與嚴格飲食，重拾強健體格。',
          effects: { health: 25, happiness: 18, money: -5 },
          log: '【48歲 ⚠️ 人生轉折】你將健康重新放回第一位，逆轉身體機能，狀態煥然一新。',
          nextEventId: 'e2000_65'
        },
        {
          text: '💰 敏銳把握市場週期低谷，進行果斷的資產重組與長期佈局。',
          effects: { money: 60, intellect: 10, health: -8, happiness: 4 },
          log: '【48歲 ⚠️ 人生轉折】你憑藉半生積累的睿智完成資本躍升，真正擺脫財務束縛。',
          nextEventId: 'e2000_65'
        }
      ]
    },

    'e2000_65': {
      age: 65,
      stage: '花甲榮休與人生結算 (60歲+)',
      isCrucial: false,
      title: '【65歲】長椅上的夕陽回甘',
      desc: '迎來法定退休之年，回望六十載風雨，你打算如何安放餘生：',
      options: [
        {
          text: '🌍 帶著伴侶與背包環遊列國，用雙腳睇晒大半生未見過的世界風光。',
          effects: { happiness: 30, money: -25, health: 6 },
          log: '【65歲】你活得自在通透，將千金散盡化作胸襟與永恆回憶。',
          nextEventId: 'end'
        },
        {
          text: '🏡 安居靜謐田園小宅，每日種花、彈結他、著書立說傳承經驗給年輕人。',
          effects: { happiness: 24, health: 15, eq: 12 },
          log: '【65歲】你在平淡雅致中安享天倫，深受後輩敬佩與愛戴。',
          nextEventId: 'end'
        }
      ]
    },

    // ==========================================
    // 1970 年代主線（白手興家拼搏線）
    // ==========================================
    'e1970_6': {
      age: 6,
      stage: '童年生活 (0-10歲)',
      isCrucial: false,
      title: '【6歲】工廠區的穿膠花歲月',
      desc: '一家大細圍在木枱前趕工幫補家計，你決定點樣度過放學時光：',
      options: [
        {
          text: '✋ 乖乖坐定定幫阿媽剪線頭、穿膠花，分擔生計。',
          effects: { money: 12, eq: 10, intellect: 4, happiness: 5 },
          log: '【6歲】你早早體會金錢來之不易，磨練出過人耐性。',
          nextEventId: 'e1970_16'
        },
        {
          text: '🏃 跑上天台同鄰居細路鬥波子、跳橡筋繩，四處野跑。',
          effects: { health: 15, happiness: 12, eq: 6 },
          log: '【6歲】你擁有一副強健體格同充滿市井笑聲的童年。',
          nextEventId: 'e1970_16'
        }
      ]
    },
    'e1970_16': {
      age: 16,
      stage: '青年抉擇 (15-20歲)',
      isCrucial: true,
      title: '【16歲】學徒還是夜校夜行者',
      desc: '輕工業如日中天，身邊同學紛紛投身社會，你的抉擇是：',
      options: [
        {
          text: '🔧 跟隨經驗豐富的師傅進工廠學機械維修與模具，掌握核心硬技術。',
          effects: { money: 20, intellect: 10, health: -4 },
          log: '【16歲 ⚠️ 人生轉折】你掌握了一技之長，在工業起飛年代迅速站穩陣腳。',
          nextEventId: 'e1970_30'
        },
        {
          text: '📖 白天做初級文員雜工，夜晚堅持去夜校苦學英語與商業會計。',
          effects: { intellect: 20, eq: 10, health: -8, happiness: 6 },
          log: '【16歲 ⚠️ 人生轉折】你用汗水補足學歷，叩開了現代外貿洋行的大門。',
          nextEventId: 'e1970_30'
        }
      ]
    },
    'e1970_30': {
      age: 30,
      stage: '黃金時代機遇 (28-40歲)',
      isCrucial: true,
      title: '【30歲】經濟起飛的滔天巨浪',
      desc: '地產與貿易大爆發，面對處處是商機的年代：',
      options: [
        {
          text: '🏭 大膽向銀行抵押，頂手成立自己的小工廠與貿易批發行。',
          effects: { money: 65, intellect: 10, health: -14, happiness: 10 },
          log: '【30歲 ⚠️ 人生轉折】你踩中時代最大紅利，白手興家躍升為民營企業家。',
          nextEventId: 'end'
        },
        {
          text: '🏠 踏實置辦市區核心房產，專注守護家庭與安穩薪水。',
          effects: { money: 45, happiness: 22, health: 8 },
          log: '【30歲 ⚠️ 人生轉折】你享受到了城市資產升值的巨大果實，生活無憂。',
          nextEventId: 'end'
        }
      ]
    },

    // ==========================================
    // 2010 年代後主線（數碼原生與內卷）
    // ==========================================
    'e2010_5': {
      age: 5,
      stage: '幼童教育 (0-6歲)',
      isCrucial: false,
      title: '【5歲】演算法下的童年啟蒙',
      desc: '出生即有平板電腦與演算法推送，面對滿滿的早教課程：',
      options: [
        {
          text: '📱 熟練操作智慧裝置自學外語同科普短片。',
          effects: { intellect: 14, health: -6, eq: -4 },
          log: '【5歲】你極早建立資訊搜索意識，但對螢幕依賴加深。',
          nextEventId: 'e2010_16'
        },
        {
          text: '🛹 拒絕螢幕，堅持每週參加攀石、滑板與戶外體適能訓練。',
          effects: { health: 18, eq: 8, happiness: 12 },
          log: '【5歲】你擁有一流的神經協調與強健身軀。',
          nextEventId: 'e2010_16'
        }
      ]
    },
    'e2010_16': {
      age: 16,
      stage: '青年賽道 (14-18歲)',
      isCrucial: true,
      title: '【16歲】流量世界與自我救贖',
      desc: '短影音同社交平台主導的世界，同輩焦慮拉滿：',
      options: [
        {
          text: '🎥 發揮審美個人特長創作獨立內容，建立起個人影響力。',
          effects: { money: 30, eq: 16, intellect: 8, health: -6 },
          log: '【16歲 ⚠️ 人生轉折】你成為年輕創作者，提早看清商業與網絡運作法則。',
          nextEventId: 'end'
        },
        {
          text: '🧠 屏蔽社交雜音，深耕 AI 科技與數學演算法，追求硬核突破。',
          effects: { intellect: 25, happiness: 8, eq: 2 },
          log: '【16歲 ⚠️ 人生轉折】你掌握前沿底層技術，成為下一代技術弄潮兒。',
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

// 5 大寫實數值即時更新
function updateStatsUI() {
  const panel = document.getElementById('stats-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="stat-box"><span class="stat-intellect">★ 智力:</span><span class="stat-val">${state.stats.intellect}</span></div>
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
        <span class="tag-badge">全寫實人生模擬</span>
        <p style="font-size: 11px; color: #86b564; margin-top: 6px;">選擇出生時代，啟動漫長人生：</p>
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

// 開始新人生
function startGame(eraId) {
  const statsPanel = document.getElementById('stats-panel');
  const subHeader = document.getElementById('sub-header');
  const era = gameData.eras.find(e => e.id === eraId);

  state.currentEra = era;
  state.stats = { ...era.initialStats };
  state.logs = [`【0歲 誕生】你在 ${era.title} 正式降臨人世。`];
  state.currentEventId = era.startEventId;

  if (subHeader) subHeader.innerText = `時代背景: ${era.id} 年`;
  if (statsPanel) statsPanel.classList.remove('hidden');
  updateStatsUI();
  renderEvent(state.currentEventId);
}

// 渲染事件節點（支援轉折點警示高亮）
function renderEvent(eventId) {
  const canvas = document.getElementById('game-canvas');
  if (eventId === 'end') {
    renderEnding();
    return;
  }

  const event = gameData.events[eventId];
  const crucialBanner = event.isCrucial 
    ? `<div style="background: #ef4444; color: #fff; font-size: 10px; font-weight: bold; text-align: center; padding: 3px; margin-bottom: 6px; border: 1px solid #7f1d1d; letter-spacing: 1px;">
        ⚠️ 重要人生命運轉折點 ⚠️
       </div>`
    : '';

  let html = `
    <div>
      ${crucialBanner}
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

// 處理選擇與數值結算
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

// 渲染人生總結結局
function renderEnding() {
  const canvas = document.getElementById('game-canvas');
  
  let title = "【★ 踏實圓滿的人生 ★】";
  let desc = "你在時代的沉浮中守護住了內心的平靜與家庭的溫暖。";

  if (state.stats.money >= 90 && state.stats.happiness >= 75) {
    title = "【★ 財富與自由極致者 ★】";
    desc = "你兼顧了物質豐盛與心靈自由，活成了無數人夢寐以求的通透境界！";
  } else if (state.stats.intellect >= 85) {
    title = "【★ 睿智時代先鋒 ★】";
    desc = "你的專注與深度洞察力，讓你在自己開闢的領域留下了不可磨滅的印記！";
  } else if (state.stats.happiness >= 85) {
    title = "【★ 靈魂自由旅人 ★】";
    desc = "你從未被任何世俗的條條框框捆綁，活出了最純粹、最無悔的自己！";
  } else if (state.stats.health < 45) {
    title = "【★ 燃燒過度的奮鬥者 ★】";
    desc = "你為事業與周遭人付出了全部心血，但也耗盡了身體活力，值得好好歇息。";
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

// 啟動程式
renderEraSelect();
