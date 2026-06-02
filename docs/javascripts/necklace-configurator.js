document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("arrangement-canvas");
  const trashZone = document.getElementById("trash-zone");
  if (!canvas) return;

  const partsDatabase = [
    { id: 'p1', type: 'pendant', name: '圓形吊墜', icon: '◇', color: 'silver', material: 'silver', meaning: '圓滿', keywords: ['圓形', '金屬'] },
    { id: 'p2', type: 'pendant', name: '月亮吊墜', icon: '☾', color: 'silver', material: 'silver', meaning: '守護', keywords: ['月亮', '星空'] },
    { id: 'p3', type: 'pendant', name: '愛心吊墜', icon: '♡', color: 'rose-gold', material: 'rose-gold', meaning: '愛與溫柔', keywords: ['愛心', '心形'] },
    { id: 'p4', type: 'pendant', name: '星星', icon: '✦', color: 'gold', material: 'gold', meaning: '希望', keywords: ['星星', '星空'] },
    { id: 'p5', type: 'pendant', name: '長條刻字牌', icon: '▱', color: 'gold', material: 'gold', meaning: '承諾與姓名記憶', keywords: ['刻字', '姓名', '紀念'] },
    { id: 'p6', type: 'pendant', name: '初始字母牌', icon: 'A', color: 'silver', material: 'silver', meaning: '個人標記', keywords: ['字母', '姓名', '客製'] },
    { id: 'p7', type: 'pendant', name: '淚滴光石', icon: '◈', color: 'white', material: 'diamond', meaning: '紀念與光', keywords: ['水滴', '主石', '光'] },
    { id: 'p8', type: 'pendant', name: '橢圓肖像牌', icon: '⬭', color: 'gold', material: 'gold', meaning: '珍藏與回憶', keywords: ['橢圓', '紀念', '照片', '吊墜'] },
    { id: 'p9', type: 'pendant', name: '緞帶結', icon: '⋈', color: 'rose-gold', material: 'rose-gold', meaning: '祝福與柔軟連結', keywords: ['蝴蝶結', '緞帶', '禮物'] },
    { id: 'b1', type: 'bead', name: '珍珠', icon: '●', color: 'white', material: 'pearl', meaning: '優雅', keywords: ['珍珠', '白色', '優雅'] },
    { id: 'b2', type: 'bead', name: '金珠', icon: '○', color: 'gold', material: 'gold', meaning: '華麗', keywords: ['金', '珠'] },
    { id: 'b3', type: 'bead', name: '霧面銀珠', icon: '◌', color: 'silver', material: 'silver', meaning: '低調節奏', keywords: ['銀珠', '霧面', '日常'] },
    { id: 'c1', type: 'chain', name: '細鍊', icon: '〰', color: 'silver', material: 'silver', meaning: '簡約', keywords: ['鍊條', '基礎'] },
    { id: 'c2', type: 'chain', name: '蛇骨鍊', icon: '≈', color: 'silver', material: 'silver', meaning: '流動', keywords: ['鍊條', '特殊'] },
    { id: 'c3', type: 'chain', name: '紙鍊', icon: '▭', color: 'gold', material: 'gold', meaning: '俐落與存在感', keywords: ['鍊條', '紙鍊', '存在感'] },
    { id: 'c4', type: 'chain', name: '珠鍊', icon: '⋯', color: 'silver', material: 'silver', meaning: '細節節奏', keywords: ['鍊條', '珠鍊', '日常'] },
    { id: 'c5', type: 'chain', name: '水波鍊', icon: '≋', color: 'silver', material: 'silver', meaning: '柔光與流動感', keywords: ['鍊條', '水波', '柔光'] },
    { id: 'c6', type: 'chain', name: '鎖骨短鍊', icon: '⌒', color: 'gold', material: 'gold', meaning: '貼近與日常儀式', keywords: ['鎖骨', '短鍊', '日常'] },
    { id: 'd1', type: 'deco', name: '碎鑽', icon: '✧', color: 'white', material: 'diamond', meaning: '光芒', keywords: ['鑽石', '閃亮'] },
    { id: 'd2', type: 'deco', name: '微光星點', icon: '✶', color: 'white', material: 'diamond', meaning: '願望與聚焦', keywords: ['星點', '微光', '裝飾'] },
    { id: 'm1', type: 'material', name: '金色材質', icon: '◆', color: 'gold', material: 'gold', meaning: '溫暖、珍貴', keywords: ['金', '顏色'] },
    { id: 'm2', type: 'material', name: '銀色材質', icon: '◇', color: 'silver', material: 'silver', meaning: '現代、冷靜', keywords: ['銀', '顏色'] },
    { id: 'm3', type: 'material', name: '玫瑰金材質', icon: '◆', color: 'rose-gold', material: 'rose-gold', meaning: '溫柔、親密', keywords: ['玫瑰金', '粉金', '材質'] },
    { id: 'g1', type: 'gem', name: '藍寶石', icon: '🔹', color: 'blue', material: 'gem', meaning: '冷靜、智慧、專注', keywords: ['藍', '寶石', '專注'] },
    { id: 'g2', type: 'gem', name: '粉寶石', icon: '🌸', color: 'pink', material: 'gem', meaning: '溫柔、愛、親密', keywords: ['粉', '寶石', '親密'] },
    { id: 'g3', type: 'gem', name: '綠寶石', icon: '🟩', color: 'green', material: 'gem', meaning: '希望、平衡、療癒', keywords: ['綠', '寶石', '療癒'] },
    { id: 'g4', type: 'gem', name: '小鑽石', icon: '💎', color: 'white', material: 'diamond', meaning: '純粹、光芒、堅定', keywords: ['白', '鑽石', '堅定'] },
    { id: 'g5', type: 'gem', name: '珍珠', icon: '⚪', color: 'white', material: 'pearl', meaning: '優雅、柔和、內斂', keywords: ['白', '珍珠', '內斂'] },
    { id: 'g6', type: 'gem', name: '黑瑪瑙', icon: '●', color: 'black', material: 'onyx', meaning: '穩定、界線、力量', keywords: ['黑', '瑪瑙', '力量'] },
    { id: 'g7', type: 'gem', name: '黃水晶', icon: '◆', color: 'yellow', material: 'citrine', meaning: '自信、豐盛、行動力', keywords: ['黃', '水晶', '自信'] },
    { id: 'g8', type: 'gem', name: '月光石', icon: '◐', color: 'white', material: 'moonstone', meaning: '直覺、陪伴、柔光', keywords: ['月光石', '白', '柔光'] },
    { id: 'g9', type: 'gem', name: '石榴石', icon: '◆', color: 'red', material: 'garnet', meaning: '熱情、承諾、生命力', keywords: ['紅', '石榴石', '承諾'] }
  ];

  const necklaceModels = {
    teardrop: {
      id: "teardrop",
      name: "水滴形項鍊",
      viewerSrc: "../assets/models/necklaces/teardrop-necklace.v3.safe.glb",
      arSrc: "necklaces/teardrop-necklace.v3.safe.glb",
      assetLabel: "necklaces/teardrop-necklace.v3.safe.glb",
      category: "送禮紀念 · 柔和主石",
      guide: "適合先確認主石垂墜位置，再加入誕生石或刻字零件形成紀念禮物。",
      description: "水滴主石搭配細緻金屬節點，適合送禮、紀念日與柔和日常造型。"
    },
    round: {
      id: "round",
      name: "圓形寶石項鍊",
      viewerSrc: "../assets/models/necklaces/round-necklace.v3.safe.glb",
      arSrc: "necklaces/round-necklace.v3.safe.glb",
      assetLabel: "necklaces/round-necklace.v3.safe.glb",
      category: "日常鎖骨 · 穩定比例",
      guide: "適合做日常基礎款，先用 AR 確認鎖骨高度，再調整寶石密度。",
      description: "圓形主石與珍珠節奏，視覺重心穩定，適合作為日常鎖骨鍊基底。"
    },
    oval: {
      id: "oval",
      name: "橄欖形寶石項鍊",
      viewerSrc: "../assets/models/necklaces/oval-necklace.v3.safe.glb",
      arSrc: "necklaces/oval-necklace.v3.safe.glb",
      assetLabel: "necklaces/oval-necklace.v3.safe.glb",
      category: "儀式場合 · 修長主石",
      guide: "適合正式造型，確認主石長度是否與領口比例協調。",
      description: "橢圓長主石拉長頸部線條，適合儀式感、正式場合與單顆主石設計。"
    },
    lariat: {
      id: "lariat",
      name: "垂墜線條項鍊",
      viewerSrc: "../assets/models/necklaces/lariat-necklace.v3.safe.glb",
      arSrc: "necklaces/lariat-necklace.v3.safe.glb",
      assetLabel: "necklaces/lariat-necklace.v3.safe.glb",
      category: "造型穿搭 · 垂墜線條",
      guide: "適合低領或開領穿搭，優先檢查垂墜段是否落在胸前合適位置。",
      description: "垂墜線條與月光石主石提供視覺延伸，適合造型穿搭與低領輪廓。"
    },
    bar: {
      id: "bar",
      name: "刻字牌項鍊",
      viewerSrc: "../assets/models/necklaces/bar-necklace.v3.safe.glb",
      arSrc: "necklaces/bar-necklace.v3.safe.glb",
      assetLabel: "necklaces/bar-necklace.v3.safe.glb",
      category: "客製文字 · 姓名日期",
      guide: "適合姓名、日期或短句客製，確認橫向牌面與鎖骨線是否平衡。",
      description: "玫瑰金刻字牌搭配長形鑽飾，適合姓名、日期與紀念文字客製。"
    },
    heart: {
      id: "heart",
      name: "愛心寶石項鍊",
      viewerSrc: "../assets/models/necklaces/heart-necklace.v3.safe.glb",
      arSrc: "necklaces/heart-necklace.v3.safe.glb",
      assetLabel: "necklaces/heart-necklace.v3.safe.glb",
      category: "情感禮物 · 愛心主石",
      guide: "適合關係禮物或紀念日，確認主石視覺是否足夠清楚但不過大。",
      description: "紅寶愛心主石與細鑽光圈，適合情感禮物與親密紀念。"
    },
    pearl: {
      id: "pearl",
      name: "珍珠短鍊",
      viewerSrc: "../assets/models/necklaces/pearl-necklace.v3.safe.glb",
      arSrc: "necklaces/pearl-necklace.v3.safe.glb",
      assetLabel: "necklaces/pearl-necklace.v3.safe.glb",
      category: "珍珠短鍊 · 柔光典雅",
      guide: "適合婚禮、聚會與柔和日常，優先確認短鍊貼合高度與珍珠密度。",
      description: "短鍊比例搭配珍珠串與中央光點，適合儀式、婚禮與柔和日常。"
    }
  };

  let currentArrangement = [];
  let currentChainGems = new Array(7).fill(null);
  let currentFilter = 'all';
  let searchTerm = '';
  let selectedModelId = 'teardrop';
  let currentPresetId = null;

  const partsGrid = document.getElementById("parts-grid");
  const meaningText = document.getElementById("meaning-text");
  const chainSlotsContainer = document.getElementById("chain-slots-container");
  const searchInput = document.getElementById("part-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const searchStatusDisplay = document.getElementById("search-status-display");
  const summaryStyle = document.getElementById("summary-style");
  const summaryMaterial = document.getElementById("summary-material");
  const summaryParts = document.getElementById("summary-parts");
  const summaryGems = document.getElementById("summary-gems");
  const summaryStatusPill = document.getElementById("summary-status-pill");
  const summaryProjection = document.getElementById("summary-projection");
  const summaryOccasion = document.getElementById("summary-occasion");
  const summaryInquiry = document.getElementById("summary-inquiry");
  const activeModelLabel = document.getElementById("active-model-label");
  const activeModelAsset = document.getElementById("active-model-asset");
  const activeModelCategory = document.getElementById("active-model-category");
  const modelPreviewNote = document.getElementById("model-preview-note");
  const modelStyleHelper = document.getElementById("model-style-helper");
  const designCoachTitle = document.getElementById("design-coach-title");
  const designCoachText = document.getElementById("design-coach-text");
  const previewDropZones = document.querySelectorAll(".preview-drop-zone");
  const previewDropHint = document.querySelector(".preview-drop-hint");

  const typeLabels = {
    all: '全部',
    chain: '鍊條',
    pendant: '吊墜',
    bead: '珠飾',
    deco: '裝飾',
    gem: '寶石',
    material: '材質'
  };

  const designPresets = {
    daily: {
      modelId: 'round',
      arrangement: ['c6', 'b1', 'd1', 'm2'],
      chainGems: ['none', 'g5', 'none', 'g4', 'none', 'g8', 'none'],
      previewPlacements: {
        'center-stone': 'b1',
        'left-accent': 'g5',
        'right-accent': 'g8',
        'chain-top': 'd1'
      }
    },
    birthstone: {
      modelId: 'teardrop',
      arrangement: ['c1', 'p5', 'p6', 'm3'],
      chainGems: ['g2', 'none', 'g7', 'none', 'g1', 'none', 'g3'],
      previewPlacements: {
        'center-stone': 'p5',
        'left-accent': 'g2',
        'right-accent': 'g1',
        'lower-drop': 'p6'
      }
    },
    ceremony: {
      modelId: 'oval',
      arrangement: ['c3', 'p7', 'd2', 'b2', 'm1'],
      chainGems: ['none', 'g4', 'none', 'g9', 'none', 'g5', 'none'],
      previewPlacements: {
        'center-stone': 'p7',
        'left-accent': 'g4',
        'right-accent': 'g9',
        'chain-top': 'd2',
        'lower-drop': 'b2'
      }
    }
  };

  const previewSlotDefinitions = [
    { id: 'chain-top', label: '上方鍊節', allowedTypes: ['bead', 'deco', 'gem'] },
    { id: 'left-accent', label: '左側點綴', allowedTypes: ['bead', 'deco', 'gem'] },
    { id: 'center-stone', label: '中央主石', allowedTypes: ['pendant', 'gem', 'bead', 'deco'] },
    { id: 'right-accent', label: '右側點綴', allowedTypes: ['bead', 'deco', 'gem'] },
    { id: 'lower-drop', label: '下方垂墜', allowedTypes: ['pendant', 'deco', 'gem'] }
  ];

  const previewSlotMap = Object.fromEntries(previewSlotDefinitions.map(slot => [slot.id, slot]));

  function createEmptyPreviewPlacements() {
    return Object.fromEntries(previewSlotDefinitions.map(slot => [slot.id, null]));
  }

  let currentPreviewPlacements = createEmptyPreviewPlacements();

  function findPartById(partId) {
    return partsDatabase.find(part => part.id === partId);
  }

  function clonePart(part) {
    return part ? { ...part } : null;
  }

  function resolvePreviewPlacements(placementMap = {}) {
    const nextPlacements = createEmptyPreviewPlacements();
    Object.entries(placementMap).forEach(([slotId, partId]) => {
      if (!previewSlotMap[slotId] || !partId) return;
      const part = findPartById(partId);
      if (part) nextPlacements[slotId] = clonePart(part);
    });
    return nextPlacements;
  }

  function getPreviewPlacementParts() {
    return Object.values(currentPreviewPlacements).filter(Boolean);
  }

  function getPreviewPlacedGems() {
    return getPreviewPlacementParts().filter(part => part.type === 'gem');
  }

  function setPreviewDropHint(message) {
    if (!previewDropHint) return;
    previewDropHint.textContent = message;
  }

  function isPartAllowedInPreviewSlot(part, slot) {
    return Boolean(part && slot && slot.allowedTypes.includes(part.type));
  }

  function formatPreviewSlotAllowedTypes(slot) {
    return slot.allowedTypes
      .map(type => typeLabels[type] || type)
      .join('、');
  }

  function renderPreviewDropZones() {
    previewDropZones.forEach(zone => {
      const slotId = zone.dataset.placementSlot;
      const slot = previewSlotMap[slotId];
      const part = currentPreviewPlacements[slotId];
      if (!slot) return;

      zone.classList.toggle('has-part', Boolean(part));
      zone.innerHTML = part
        ? `<span class="slot-part-icon">${part.icon}</span><span class="slot-part-name">${part.name}</span>`
        : `<span class="slot-label">${slot.label}</span>`;
      zone.setAttribute(
        'aria-label',
        part
          ? `${slot.label} 已放置 ${part.name}，點擊可清除`
          : `${slot.label} 可放置 ${formatPreviewSlotAllowedTypes(slot)}`
      );
      zone.title = part
        ? `${slot.label}：${part.name}，點擊清除`
        : `${slot.label}：可拖入 ${formatPreviewSlotAllowedTypes(slot)}`;
    });
  }

  function getDraggedPart(event) {
    const source = event.dataTransfer.getData('source');
    if (source === 'library') {
      return findPartById(event.dataTransfer.getData('partId'));
    }
    if (source === 'canvas') {
      const index = parseInt(event.dataTransfer.getData('index'));
      return Number.isNaN(index) ? null : currentArrangement[index];
    }
    if (source === 'chain-slot') {
      const index = parseInt(event.dataTransfer.getData('index'));
      return Number.isNaN(index) ? null : currentChainGems[index];
    }
    return null;
  }

  function placePartOnPreview(slotId, part) {
    const slot = previewSlotMap[slotId];
    if (!slot || !part) return false;

    if (!isPartAllowedInPreviewSlot(part, slot)) {
      setPreviewDropHint(`${slot.label} 可放置 ${formatPreviewSlotAllowedTypes(slot)}；${part.name} 請放到排列區或選其他點。`);
      return false;
    }

    currentPreviewPlacements[slotId] = clonePart(part);
    updatePresetButtons(null);
    renderPreviewDropZones();
    updateMeaningText();
    updateDesignSummary();
    setPreviewDropHint(`已將 ${part.name} 放到 ${slot.label}。點擊該插槽可清除。`);
    return true;
  }

  function clearPreviewSlot(slotId) {
    const slot = previewSlotMap[slotId];
    const part = currentPreviewPlacements[slotId];
    if (!slot || !part) return;

    currentPreviewPlacements[slotId] = null;
    updatePresetButtons(null);
    renderPreviewDropZones();
    updateMeaningText();
    updateDesignSummary();
    setPreviewDropHint(`已清除 ${slot.label} 的 ${part.name}。`);
  }

  function initPreviewDropZones() {
    previewDropZones.forEach(zone => {
      const slotId = zone.dataset.placementSlot;

      zone.addEventListener('dragover', event => {
        const part = getDraggedPart(event);
        const slot = previewSlotMap[slotId];
        if (!slot) return;
        event.preventDefault();
        const isAllowed = part ? isPartAllowedInPreviewSlot(part, slot) : true;
        event.dataTransfer.dropEffect = isAllowed ? 'copy' : 'none';
        zone.classList.toggle('drag-over', isAllowed);
        zone.classList.toggle('drag-denied', !isAllowed);
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over', 'drag-denied');
      });

      zone.addEventListener('drop', event => {
        event.preventDefault();
        event.stopPropagation();
        zone.classList.remove('drag-over', 'drag-denied');
        placePartOnPreview(slotId, getDraggedPart(event));
      });

      zone.addEventListener('click', () => {
        clearPreviewSlot(slotId);
      });
    });

    renderPreviewDropZones();
  }

  // 渲染零件庫 (卡片)
  function renderLibrary() {
    partsGrid.innerHTML = '';
    
    const term = searchTerm.toLowerCase().trim();

    const filteredParts = partsDatabase.filter(part => {
      const matchFilter = currentFilter === 'all' || part.type === currentFilter;
      
      let matchSearch = true;
      if (term) {
        const textToSearch = [
          part.name,
          part.type,
          part.color,
          part.material,
          part.meaning,
          ...(part.keywords || [])
        ].join(' ').toLowerCase();
        
        matchSearch = textToSearch.includes(term);
      }
      
      return matchFilter && matchSearch;
    });

    if (searchStatusDisplay) {
      let filterText = typeLabels[currentFilter] || '全部';
      const activeBtn = Array.from(filterButtons).find(btn => btn.classList.contains('active'));
      if (activeBtn) filterText = activeBtn.textContent.trim();
      
      let statusText = `目前篩選：${filterText} · 找到 ${filteredParts.length} 個零件`;
      if (term) {
        statusText += ` · 關鍵字：${searchTerm}`;
      }
      searchStatusDisplay.textContent = statusText;
    }

    if (filteredParts.length === 0) {
      partsGrid.innerHTML = `
        <div class="parts-empty-state">
          <strong>沒有找到符合條件的零件</strong>
          <span>請換一個關鍵字，或切回「全部」查看完整零件庫。</span>
        </div>
      `;
      return;
    }

    filteredParts.forEach(part => {
      const card = document.createElement('div');
      card.className = 'part-card';
      card.draggable = true;
      card.innerHTML = `
        <div class="icon">${part.icon}</div>
        <div class="name">${part.name}</div>
      `;
      // 點擊卡片將零件加入畫布
      card.onclick = () => addPart(part);
      
      // 拖曳開始
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('source', 'library');
        e.dataTransfer.setData('partId', part.id);
      });
      
      partsGrid.appendChild(card);
    });
  }

  function updatePresetButtons(activePresetId) {
    currentPresetId = activePresetId || null;
    document.querySelectorAll(".design-preset-btn").forEach(btn => {
      btn.classList.toggle('active', btn.dataset.presetId === activePresetId);
    });
  }

  function setSelectedModel(modelId) {
    const viewer = document.getElementById("necklace-model-viewer");
    const model = necklaceModels[modelId];
    if (!model) return;

    selectedModelId = modelId;
    document.querySelectorAll(".model-style-btn").forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-model-id') === modelId);
    });
    if (viewer) {
      const nextSrc = `${model.viewerSrc}?v=${modelId}-v3`;
      viewer.setAttribute("src", nextSrc);
      viewer.src = nextSrc;
    }
    updateDesignSummary();
  }

  function applyDesignPreset(presetId) {
    const preset = designPresets[presetId];
    if (!preset) return;

    setSelectedModel(preset.modelId);
    currentArrangement = preset.arrangement
      .map(findPartById)
      .filter(Boolean)
      .map(part => ({ ...part }));
    currentChainGems = preset.chainGems.map(id => {
      if (!id || id === 'none') return null;
      const gem = findPartById(id);
      return gem ? { ...gem } : null;
    });
    currentPreviewPlacements = resolvePreviewPlacements(preset.previewPlacements);

    renderPreviewDropZones();
    renderCanvas();
    renderChainSlots();
    updateMeaningText();
    updateDesignSummary();
    updatePresetButtons(presetId);
  }

  // 渲染排列畫布
  function renderCanvas() {
    canvas.innerHTML = '';
    
    if (currentArrangement.length === 0) {
      // 顯示淡金色項鍊插槽
      canvas.innerHTML = `
        <div class="arrangement-empty-state">
          <div class="empty-slots" aria-hidden="true">○ ─ ○ ─ ○ ─ ○ ─ ○</div>
          <strong>從右側零件庫開始加入設計元素</strong>
          <span>點擊零件可加入排列，也可以拖曳到這個區域。</span>
        </div>
      `;
      if (meaningText) {
        meaningText.textContent = '選擇款式、材質或寶石後，這裡會整理成一段可用於訂製溝通的設計寓意。';
      }
      updateDesignSummary();
      return;
    }

    currentArrangement.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'arranged-item';
      div.draggable = true;
      div.dataset.index = index;
      
      div.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-controls">
          <button onclick="window.movePartLeft(${index})" title="向左移">←</button>
          <button class="delete-btn" onclick="window.removePart(${index})" title="刪除">−</button>
          <button onclick="window.movePartRight(${index})" title="向右移">→</button>
        </div>
      `;
      
      // 已加入項目的拖曳處理 (重新排序)
      div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('source', 'canvas');
        e.dataTransfer.setData('index', index);
        setTimeout(() => div.style.opacity = '0.5', 0);
      });
      
      div.addEventListener('dragend', () => {
        div.style.opacity = '1';
      });

      div.addEventListener('dragover', (e) => {
        e.preventDefault();
        div.classList.add('drag-over');
      });

      div.addEventListener('dragleave', () => {
        div.classList.remove('drag-over');
      });

      div.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        div.classList.remove('drag-over');
        
        const source = e.dataTransfer.getData('source');
        if (source === 'canvas') {
          const sourceIndex = parseInt(e.dataTransfer.getData('index'));
          const targetIndex = index;
          if (sourceIndex !== targetIndex && !isNaN(sourceIndex)) {
            // 交換位置 (插入前)
            const movedItem = currentArrangement.splice(sourceIndex, 1)[0];
            const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex : targetIndex;
            currentArrangement.splice(adjustedTargetIndex, 0, movedItem);
            updatePresetButtons(null);
            renderCanvas();
          }
        } else if (source === 'library') {
          const partId = e.dataTransfer.getData('partId');
          const part = partsDatabase.find(p => p.id === partId);
          if (part) {
            currentArrangement.splice(index, 0, { ...part });
            updatePresetButtons(null);
            renderCanvas();
          }
        }
      });
      
      canvas.appendChild(div);
    });

    // 更新設計寓意
    updateMeaningText();
    updateDesignSummary();
  }

  const modelMeaningsMap = {
    teardrop: '情感流動與守護',
    round: '圓滿、和諧與完整',
    oval: '延展、生命力與優雅平衡',
    lariat: '垂墜線條、視覺延伸與自信',
    bar: '姓名記憶、承諾與低調標記',
    heart: '親密、愛與被珍惜的心意',
    pearl: '柔光、典雅與安定儀式感'
  };

  const gemMeaningsMap = {
    g1: '藍寶石的冷靜與智慧',
    g2: '粉寶石的親密與愛',
    g3: '綠寶石的希望與療癒',
    g4: '小鑽石的純粹與堅定',
    g5: '珍珠的柔和與內斂',
    g6: '黑瑪瑙的穩定與力量',
    g7: '黃水晶的自信與豐盛',
    g8: '月光石的陪伴與柔光',
    g9: '石榴石的承諾與生命力'
  };

  function updateMeaningText() {
    if (!meaningText) return;
    
    const previewParts = getPreviewPlacementParts();
    const selectedGems = [
      ...currentChainGems.filter(g => g !== null),
      ...getPreviewPlacedGems()
    ];
    
    if (selectedGems.length === 0 && currentArrangement.length === 0 && previewParts.length === 0) {
      meaningText.innerText = '從一顆寶石開始，為這條項鍊加入屬於你的象徵。';
      updateDesignSummary();
      return;
    }
    
    let modelName = '水滴形';
    if (selectedModelId === 'round') modelName = '圓形';
    if (selectedModelId === 'oval') modelName = '橄欖形';
    if (selectedModelId === 'lariat') modelName = '垂墜線條';
    if (selectedModelId === 'bar') modelName = '刻字牌';
    if (selectedModelId === 'heart') modelName = '愛心寶石';
    if (selectedModelId === 'pearl') modelName = '珍珠短鍊';

    const modelMeaning = modelMeaningsMap[selectedModelId] || modelMeaningsMap['teardrop'];
    
    // 收集不重複的寶石寓意
    const uniqueGemIds = [...new Set(selectedGems.map(g => g.id))];
    const gemTexts = uniqueGemIds.map(id => gemMeaningsMap[id] || '').filter(t => t);
    
    let gemsSentence = '';
    if (gemTexts.length === 1) {
      gemsSentence = `搭配${gemTexts[0]}`;
    } else if (gemTexts.length > 1) {
      const lastGem = gemTexts.pop();
      gemsSentence = `搭配${gemTexts.join('、')}與${lastGem}`;
    }
    
    let arrangementSentence = '';
    if (currentArrangement.length > 0 || previewParts.length > 0) {
      arrangementSentence = ' 整體排列呈現層次感、定位點與客製節奏。';
    }
    
    let finalCopy = `這款${modelName}項鍊以${modelMeaning}為核心`;
    if (gemsSentence) {
        finalCopy += `，${gemsSentence}，呈現一種安定而細膩的個人風格。`;
    } else {
        finalCopy += `，呈現一種安定而細膩的個人風格。`;
    }
    finalCopy += arrangementSentence;
    
    meaningText.innerText = finalCopy;
    updateDesignSummary();
  }

  function getSelectedMaterialLabel() {
    const selectedMaterial = [...currentArrangement].reverse().find(item => item.type === 'material');
    if (selectedMaterial) return selectedMaterial.name;
    return '銀色材質';
  }

  function getSelectedMaterialValue() {
    const selectedMaterial = [...currentArrangement].reverse().find(item => item.type === 'material');
    if (selectedMaterial) return selectedMaterial.material || selectedMaterial.id;
    return 'silver';
  }

  function formatNames(items, emptyText) {
    if (!items.length) return emptyText;
    const names = items.map(item => item.name);
    if (names.length <= 3) return names.join('、');
    return `${names.slice(0, 3).join('、')} 等 ${names.length} 項`;
  }

  function getProjectionText(selectedGems, visibleParts) {
    const hasStatementChain = currentArrangement.some(item => item.id === 'c3' || item.id === 'c2');
    const hasPearl = selectedGems.some(item => item.id === 'g5' || item.material === 'pearl');
    const hasDiamond = selectedGems.some(item => item.id === 'g4' || item.material === 'diamond') || visibleParts.some(item => item.material === 'diamond');
    const hasSoftGlow = selectedGems.some(item => item.id === 'g8') || currentArrangement.some(item => item.id === 'c5');

    if (selectedModelId === 'lariat') {
      return '垂墜視覺會拉長胸前線條，適合 V 領、襯衫開領與儀式穿搭。';
    }
    if (selectedModelId === 'bar') {
      return '橫向刻字牌貼近鎖骨，適合日常襯衫、針織與低調紀念配戴。';
    }
    if (selectedModelId === 'heart') {
      return '主石視覺集中且情感明確，適合約會、紀念日與送禮情境。';
    }
    if (selectedModelId === 'pearl') {
      return '珍珠短鍊會提高頸部亮度，適合婚禮、正式聚會與柔和日常穿搭。';
    }
    if (selectedModelId === 'oval' || hasStatementChain) {
      return '視覺線條較修長，適合搭配 V 領、襯衫或正式場合。';
    }
    if (hasSoftGlow) {
      return '光感柔和、線條流動，適合針織、緞面上衣與低飽和穿搭。';
    }
    if (selectedModelId === 'round' || hasPearl) {
      return '視覺重心柔和靠近鎖骨，適合送禮與日常儀式感。';
    }
    if (hasDiamond) {
      return '光感集中在胸前主視覺，適合晚宴、拍攝與紀念場合。';
    }
    return '日常鎖骨鍊比例，適合先以 AR 確認位置與垂墜感。';
  }

  function getOccasionText(selectedGems, visibleParts) {
    const hasBirthstoneFeeling = selectedGems.some(item => ['g1', 'g2', 'g3', 'g6', 'g7', 'g8', 'g9'].includes(item.id));
    const hasInitial = visibleParts.some(item => item.id === 'p6' || item.id === 'p5');
    const hasCeremony = selectedGems.some(item => ['g4', 'g5', 'g9'].includes(item.id)) && visibleParts.length >= 2;

    if (hasCeremony) return '婚禮、週年、正式拍攝、重要聚會。';
    if (hasBirthstoneFeeling || hasInitial) return '生日禮物、紀念日、關係禮物、個人標記。';
    return '日常配戴、送禮、紀念日。';
  }

  function getInquiryText(selectedGems, visibleParts) {
    const material = getSelectedMaterialLabel();
    const parts = formatNames(visibleParts, '尚未加入吊墜或鍊型');
    const gems = formatNames(selectedGems, '尚未加入寶石');
    return `可詢問：${material}、${parts}、${gems}；並附上預算、鍊長與完成時間。`;
  }

  function getDesignCoachCopy(selectedGems, visibleParts) {
    if (visibleParts.length === 0 && selectedGems.length === 0) {
      return {
        title: '先從配戴情境開始',
        text: '可以先點一個設計預設，或從款式、材質、寶石任一項開始。網站會把選擇整理成可詢問訂製的摘要。'
      };
    }

    if (visibleParts.length === 0 && selectedGems.length > 0) {
      return {
        title: '寶石寓意已建立',
        text: '目前已能看出色彩與寓意方向。下一步可加入鍊型、吊墜或材質，讓設計更接近實際作品。'
      };
    }

    if (visibleParts.length > 0 && selectedGems.length === 0) {
      return {
        title: '款式輪廓已成形',
        text: '現在可以加入一到三顆寶石，讓項鍊從造型選擇進一步變成有故事的客製設計。'
      };
    }

    return {
      title: '可以進入 AR 試戴',
      text: '款式、零件與寶石已形成完整方向。建議開啟 AR 試戴確認鎖骨位置，詢問時同步附上預算、鍊長與完成時間。'
    };
  }

  function updateDesignSummary() {
    const currentModel = necklaceModels[selectedModelId] || necklaceModels.teardrop;
    const previewParts = getPreviewPlacementParts();
    const selectedGems = [
      ...currentChainGems.filter(gem => gem !== null),
      ...previewParts.filter(part => part.type === 'gem')
    ];
    const visibleParts = [
      ...currentArrangement.filter(item => item.type !== 'material'),
      ...previewParts.filter(part => part.type !== 'material' && part.type !== 'gem')
    ];
    const totalSelections = currentArrangement.length + currentChainGems.filter(Boolean).length + previewParts.length;

    if (summaryStyle) summaryStyle.textContent = currentModel.name;
    if (summaryMaterial) summaryMaterial.textContent = getSelectedMaterialLabel();
    if (summaryParts) summaryParts.textContent = formatNames(visibleParts, '尚未加入');
    if (summaryGems) summaryGems.textContent = formatNames(selectedGems, '尚未加入');
    if (summaryProjection) summaryProjection.textContent = getProjectionText(selectedGems, visibleParts);
    if (summaryOccasion) summaryOccasion.textContent = getOccasionText(selectedGems, visibleParts);
    if (summaryInquiry) summaryInquiry.textContent = getInquiryText(selectedGems, visibleParts);
    if (activeModelLabel) activeModelLabel.textContent = currentModel.name;
    if (activeModelCategory) activeModelCategory.textContent = currentModel.category || '基礎款式';
    if (activeModelAsset) activeModelAsset.textContent = currentModel.assetLabel || currentModel.arSrc;
    if (modelPreviewNote) modelPreviewNote.textContent = currentModel.description || '目前款式可旋轉、縮放檢視細節。';
    if (modelStyleHelper) modelStyleHelper.textContent = currentModel.guide || '從款式開始確認輪廓，再進一步加入寶石、材質與寓意。';
    const coachCopy = getDesignCoachCopy(selectedGems, visibleParts);
    if (designCoachTitle) designCoachTitle.textContent = coachCopy.title;
    if (designCoachText) designCoachText.textContent = coachCopy.text;
    if (summaryStatusPill) {
      summaryStatusPill.textContent = totalSelections === 0
        ? '尚未加入零件'
        : `已選 ${totalSelections} 個設計元素`;
      summaryStatusPill.classList.toggle('is-active', totalSelections > 0);
    }
  }

  function renderChainSlots() {
    if (!chainSlotsContainer) return;
    chainSlotsContainer.innerHTML = '';
    
    currentChainGems.forEach((gem, index) => {
      const slot = document.createElement('div');
      slot.className = 'chain-slot';
      if (gem) {
        slot.classList.add('has-gem');
        slot.innerHTML = `
          <div class="gem-icon">${gem.icon}</div>
          <button class="remove-gem-btn" onclick="window.removeChainGem(${index})" title="移除寶石">×</button>
        `;
        slot.draggable = true;
        
        slot.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('source', 'chain-slot');
          e.dataTransfer.setData('index', index);
          setTimeout(() => slot.style.opacity = '0.5', 0);
        });
        
        slot.addEventListener('dragend', () => {
          slot.style.opacity = '1';
        });
      } else {
        slot.innerHTML = `<div class="slot-placeholder"></div>`;
      }
      
      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
        slot.classList.add('drag-over');
      });

      slot.addEventListener('dragleave', () => {
        slot.classList.remove('drag-over');
      });

      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        slot.classList.remove('drag-over');
        
        const source = e.dataTransfer.getData('source');
        if (source === 'library') {
          const partId = e.dataTransfer.getData('partId');
          const part = partsDatabase.find(p => p.id === partId);
          if (part && part.type === 'gem') {
            currentChainGems[index] = { ...part };
            updatePresetButtons(null);
            renderChainSlots();
            updateMeaningText();
            updateDesignSummary();
          } else if (part) {
            alert('此處只能放置「寶石」類別的零件喔！');
          }
        } else if (source === 'chain-slot') {
          const sourceIndex = parseInt(e.dataTransfer.getData('index'));
          if (sourceIndex !== index && !isNaN(sourceIndex)) {
            // 交換位置
            const temp = currentChainGems[index];
            currentChainGems[index] = currentChainGems[sourceIndex];
            currentChainGems[sourceIndex] = temp;
            updatePresetButtons(null);
            renderChainSlots();
            updateMeaningText();
            updateDesignSummary();
          }
        }
      });

      chainSlotsContainer.appendChild(slot);
    });
  }

  window.removeChainGem = function(index) {
    currentChainGems[index] = null;
    updatePresetButtons(null);
    renderChainSlots();
    updateMeaningText();
    updateDesignSummary();
  };

  // 操作邏輯：點擊加入至尾端
  function addPart(part) {
    currentArrangement.push({ ...part });
    updatePresetButtons(null);
    renderCanvas();
    updateDesignSummary();
  }

  window.removePart = function(index) {
    currentArrangement.splice(index, 1);
    updatePresetButtons(null);
    renderCanvas();
    updateDesignSummary();
  };

  window.movePartLeft = function(index) {
    if (index > 0) {
      const temp = currentArrangement[index];
      currentArrangement[index] = currentArrangement[index - 1];
      currentArrangement[index - 1] = temp;
      updatePresetButtons(null);
      renderCanvas();
      updateDesignSummary();
    }
  };

  window.movePartRight = function(index) {
    if (index < currentArrangement.length - 1) {
      const temp = currentArrangement[index];
      currentArrangement[index] = currentArrangement[index + 1];
      currentArrangement[index + 1] = temp;
      updatePresetButtons(null);
      renderCanvas();
      updateDesignSummary();
    }
  };

  // 畫布的拖曳事件 (支援直接丟入畫布尾端)
  canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    canvas.classList.add('drag-over');
  });

  canvas.addEventListener('dragleave', () => {
    canvas.classList.remove('drag-over');
  });

  canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    canvas.classList.remove('drag-over');
    const source = e.dataTransfer.getData('source');
    
    // 如果是從 library 拖進空畫布，就加入到最後
    if (source === 'library') {
      const partId = e.dataTransfer.getData('partId');
      const part = partsDatabase.find(p => p.id === partId);
      if (part) addPart(part);
    }
  });

  // 拖曳刪除區的事件
  if (trashZone) {
    trashZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      trashZone.classList.add('drag-over');
    });

    trashZone.addEventListener('dragleave', () => {
      trashZone.classList.remove('drag-over');
    });

    trashZone.addEventListener('drop', (e) => {
      e.preventDefault();
      trashZone.classList.remove('drag-over');
      const source = e.dataTransfer.getData('source');
      if (source === 'canvas') {
        const index = parseInt(e.dataTransfer.getData('index'));
        if (!isNaN(index)) {
          window.removePart(index);
        }
      } else if (source === 'chain-slot') {
        const index = parseInt(e.dataTransfer.getData('index'));
        if (!isNaN(index)) {
          window.removeChainGem(index);
        }
      }
    });
  }

  // 綁定事件：搜尋
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderLibrary();
    });
  }

  // 綁定事件：分類過濾器
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter');
      renderLibrary();
    });
  });

  document.querySelectorAll(".design-preset-btn").forEach(btn => {
    btn.addEventListener('click', (e) => {
      applyDesignPreset(e.currentTarget.dataset.presetId);
    });
  });

  function initModelStyleSwitcher() {
    const styleButtons = document.querySelectorAll(".model-style-btn");
    const viewer = document.getElementById("necklace-model-viewer");

    if (!viewer || styleButtons.length === 0) {
      console.warn("Model switcher elements not found.");
      return;
    }

    styleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const clickedBtn = e.currentTarget;
        const nextModelId = clickedBtn.getAttribute('data-model-id');
        
        if (necklaceModels[nextModelId]) {
          setSelectedModel(nextModelId);
          updatePresetButtons(null);
          console.log("Selected necklace model:", nextModelId, viewer.src);
          updateDesignSummary();
          updateMeaningText();
        }
      });
    });
  }

  function getCurrentDesignState() {
    const currentModel = necklaceModels[selectedModelId] || necklaceModels['teardrop'];
    return {
      version: 2,
      modelId: selectedModelId,
      presetId: currentPresetId,
      baseModel: currentModel.arSrc,
      pendant: selectedModelId,
      material: getSelectedMaterialValue(),
      arrangement: currentArrangement.map(item => item.id),
      previewPlacements: Object.fromEntries(
        Object.entries(currentPreviewPlacements).map(([slotId, part]) => [slotId, part ? part.id : null])
      ),
      chainGems: currentChainGems.map(gem => gem ? gem.id : null)
    };
  }

  const arButton = document.getElementById("open-ar-tryon");
  if (arButton) {
    arButton.addEventListener("click", function(e) {
      e.preventDefault();
      const state = getCurrentDesignState();
      localStorage.setItem("necklaceDesignState", JSON.stringify(state));
      
      const gemsParam = state.chainGems.map(id => id ? id : 'none').join(',');
      const presetParam = currentPresetId ? `&preset=${encodeURIComponent(currentPresetId)}` : '';
      window.location.href = `../ar-tryon/?model=${encodeURIComponent(selectedModelId)}&gems=${encodeURIComponent(gemsParam)}${presetParam}`;
    });
  }

  // 初始執行渲染
  initModelStyleSwitcher();
  initPreviewDropZones();
  renderLibrary();
  renderCanvas();
  renderChainSlots();
  updateMeaningText();
  updateDesignSummary();
});
