document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("arrangement-canvas");
  const trashZone = document.getElementById("trash-zone");
  if (!canvas) return;

  const partsDatabase = [
    { id: 'p1', type: 'pendant', name: '圓形吊墜', icon: '◇', color: 'silver', material: 'silver', meaning: '圓滿', keywords: ['圓形', '金屬'] },
    { id: 'p2', type: 'pendant', name: '月亮吊墜', icon: '☾', color: 'silver', material: 'silver', meaning: '守護', keywords: ['月亮', '星空'] },
    { id: 'p3', type: 'pendant', name: '愛心吊墜', icon: '♡', color: 'rose-gold', material: 'rose-gold', meaning: '愛與溫柔', keywords: ['愛心', '心形'] },
    { id: 'p4', type: 'pendant', name: '星星', icon: '✦', color: 'gold', material: 'gold', meaning: '希望', keywords: ['星星', '星空'] },
    { id: 'b1', type: 'bead', name: '珍珠', icon: '●', color: 'white', material: 'pearl', meaning: '優雅', keywords: ['珍珠', '白色', '優雅'] },
    { id: 'b2', type: 'bead', name: '金珠', icon: '○', color: 'gold', material: 'gold', meaning: '華麗', keywords: ['金', '珠'] },
    { id: 'c1', type: 'chain', name: '細鍊', icon: '〰', color: 'silver', material: 'silver', meaning: '簡約', keywords: ['鍊條', '基礎'] },
    { id: 'c2', type: 'chain', name: '蛇骨鍊', icon: '≈', color: 'silver', material: 'silver', meaning: '流動', keywords: ['鍊條', '特殊'] },
    { id: 'd1', type: 'deco', name: '碎鑽', icon: '✧', color: 'white', material: 'diamond', meaning: '光芒', keywords: ['鑽石', '閃亮'] },
    { id: 'm1', type: 'material', name: '金色材質', icon: '◆', color: 'gold', material: 'gold', meaning: '溫暖、珍貴', keywords: ['金', '顏色'] },
    { id: 'm2', type: 'material', name: '銀色材質', icon: '◇', color: 'silver', material: 'silver', meaning: '現代、冷靜', keywords: ['銀', '顏色'] },
    { id: 'g1', type: 'gem', name: '藍寶石', icon: '🔹', color: 'blue', material: 'gem', meaning: '冷靜、智慧、專注', keywords: ['藍', '寶石', '專注'] },
    { id: 'g2', type: 'gem', name: '粉寶石', icon: '🌸', color: 'pink', material: 'gem', meaning: '溫柔、愛、親密', keywords: ['粉', '寶石', '親密'] },
    { id: 'g3', type: 'gem', name: '綠寶石', icon: '🟩', color: 'green', material: 'gem', meaning: '希望、平衡、療癒', keywords: ['綠', '寶石', '療癒'] },
    { id: 'g4', type: 'gem', name: '小鑽石', icon: '💎', color: 'white', material: 'diamond', meaning: '純粹、光芒、堅定', keywords: ['白', '鑽石', '堅定'] },
    { id: 'g5', type: 'gem', name: '珍珠', icon: '⚪', color: 'white', material: 'pearl', meaning: '優雅、柔和、內斂', keywords: ['白', '珍珠', '內斂'] }
  ];

  const necklaceModels = {
    teardrop: {
      id: "teardrop",
      name: "水滴形項鍊",
      viewerSrc: "../assets/models/necklaces/teardrop-necklace.glb",
      arSrc: "necklaces/teardrop-necklace.glb"
    },
    round: {
      id: "round",
      name: "圓形寶石項鍊",
      viewerSrc: "../assets/models/necklaces/round-necklace.glb",
      arSrc: "necklaces/round-necklace.glb"
    },
    oval: {
      id: "oval",
      name: "橄欖形寶石項鍊",
      viewerSrc: "../assets/models/necklaces/oval-necklace.glb",
      arSrc: "necklaces/oval-necklace.glb"
    }
  };

  let currentArrangement = [];
  let currentChainGems = new Array(7).fill(null);
  let currentFilter = 'all';
  let searchTerm = '';
  let selectedModelId = 'teardrop';

  const partsGrid = document.getElementById("parts-grid");
  const meaningText = document.getElementById("meaning-text");
  const chainSlotsContainer = document.getElementById("chain-slots-container");
  const searchInput = document.getElementById("part-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const searchStatusDisplay = document.getElementById("search-status-display");

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
      let filterText = '全部';
      const activeBtn = Array.from(filterButtons).find(btn => btn.classList.contains('active'));
      if (activeBtn) filterText = activeBtn.textContent;
      
      let statusText = `目前篩選：${filterText}`;
      if (term) {
        statusText += ` / 關鍵字：${searchTerm}`;
      }
      searchStatusDisplay.textContent = statusText;
    }

    if (filteredParts.length === 0) {
      partsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #a9a9a9; font-size: 13px; margin-top: 20px;">沒有找到符合條件的零件</p>';
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
        e.dataTransfer.setData('source', 'library');
        e.dataTransfer.setData('partId', part.id);
      });
      
      partsGrid.appendChild(card);
    });
  }

  // 渲染排列畫布
  function renderCanvas() {
    canvas.innerHTML = '';
    
    if (currentArrangement.length === 0) {
      // 顯示淡金色項鍊插槽
      canvas.innerHTML = `
        <div class="empty-slots">
          ○ ─ ○ ─ ○ ─ ○ ─ ○
        </div>
      `;
      if (meaningText) {
        meaningText.textContent = '選擇零件後，這裡會呈現你的項鍊寓意。';
      }
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
            renderCanvas();
          }
        } else if (source === 'library') {
          const partId = e.dataTransfer.getData('partId');
          const part = partsDatabase.find(p => p.id === partId);
          if (part) {
            currentArrangement.splice(index, 0, { ...part });
            renderCanvas();
          }
        }
      });
      
      canvas.appendChild(div);
    });

    // 更新設計寓意
    updateMeaningText();
  }

  const modelMeaningsMap = {
    teardrop: '情感流動與守護',
    round: '圓滿、和諧與完整',
    oval: '延展、生命力與優雅平衡'
  };

  const gemMeaningsMap = {
    g1: '藍寶石的冷靜與智慧',
    g2: '粉寶石的親密與愛',
    g3: '綠寶石的希望與療癒',
    g4: '小鑽石的純粹與堅定',
    g5: '珍珠的柔和與內斂'
  };

  function updateMeaningText() {
    if (!meaningText) return;
    
    const selectedGems = currentChainGems.filter(g => g !== null);
    
    if (selectedGems.length === 0 && currentArrangement.length === 0) {
      meaningText.innerText = '從一顆寶石開始，為這條項鍊加入屬於你的象徵。';
      return;
    }
    
    let modelName = '水滴形';
    if (selectedModelId === 'round') modelName = '圓形';
    if (selectedModelId === 'oval') modelName = '橄欖形';

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
    if (currentArrangement.length > 0) {
      arrangementSentence = ' 整體排列呈現層次感與節奏感。';
    }
    
    let finalCopy = `這款${modelName}項鍊以${modelMeaning}為核心`;
    if (gemsSentence) {
        finalCopy += `，${gemsSentence}，呈現一種安定而細膩的個人風格。`;
    } else {
        finalCopy += `，呈現一種安定而細膩的個人風格。`;
    }
    finalCopy += arrangementSentence;
    
    meaningText.innerText = finalCopy;
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
            renderChainSlots();
            updateMeaningText();
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
            renderChainSlots();
            updateMeaningText();
          }
        }
      });

      chainSlotsContainer.appendChild(slot);
    });
  }

  window.removeChainGem = function(index) {
    currentChainGems[index] = null;
    renderChainSlots();
    updateMeaningText();
  };

  // 操作邏輯：點擊加入至尾端
  function addPart(part) {
    currentArrangement.push({ ...part });
    renderCanvas();
  }

  window.removePart = function(index) {
    currentArrangement.splice(index, 1);
    renderCanvas();
  };

  window.movePartLeft = function(index) {
    if (index > 0) {
      const temp = currentArrangement[index];
      currentArrangement[index] = currentArrangement[index - 1];
      currentArrangement[index - 1] = temp;
      renderCanvas();
    }
  };

  window.movePartRight = function(index) {
    if (index < currentArrangement.length - 1) {
      const temp = currentArrangement[index];
      currentArrangement[index] = currentArrangement[index + 1];
      currentArrangement[index + 1] = temp;
      renderCanvas();
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
          removePart(index);
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

  function initModelStyleSwitcher() {
    const styleButtons = document.querySelectorAll(".model-style-btn");
    const viewer = document.getElementById("necklace-model-viewer");

    if (!viewer || styleButtons.length === 0) {
      console.warn("Model switcher elements not found.");
      return;
    }

    styleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        styleButtons.forEach(b => b.classList.remove('active'));
        const clickedBtn = e.currentTarget;
        clickedBtn.classList.add('active');
        selectedModelId = clickedBtn.getAttribute('data-model-id');
        
        if (necklaceModels[selectedModelId]) {
          viewer.src = `${necklaceModels[selectedModelId].viewerSrc}?v=${selectedModelId}`;
          console.log("Selected necklace model:", selectedModelId, viewer.src);
        }
      });
    });
  }

  function getCurrentDesignState() {
    const currentModel = necklaceModels[selectedModelId] || necklaceModels['teardrop'];
    return {
      version: 2,
      modelId: selectedModelId,
      baseModel: currentModel.arSrc,
      pendant: selectedModelId,
      material: "silver",
      arrangement: currentArrangement.map(item => item.id),
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
      window.location.href = `../ar-tryon/?model=${selectedModelId}&gems=${gemsParam}`;
    });
  }

  // 初始執行渲染
  initModelStyleSwitcher();
  renderLibrary();
  renderCanvas();
  renderChainSlots();
  updateMeaningText();
});
