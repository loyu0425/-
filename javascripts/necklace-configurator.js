document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("arrangement-canvas");
  const trashZone = document.getElementById("trash-zone");
  if (!canvas) return;

  const partsDatabase = [
    { id: 'p1', type: 'pendant', name: '圓形吊墜', icon: '◇' },
    { id: 'p2', type: 'pendant', name: '月亮吊墜', icon: '☾' },
    { id: 'p3', type: 'pendant', name: '愛心吊墜', icon: '♡' },
    { id: 'p4', type: 'pendant', name: '星星', icon: '✦' },
    { id: 'b1', type: 'bead', name: '珍珠', icon: '●' },
    { id: 'b2', type: 'bead', name: '金珠', icon: '○' },
    { id: 'c1', type: 'chain', name: '細鍊', icon: '〰' },
    { id: 'c2', type: 'chain', name: '蛇骨鍊', icon: '≈' },
    { id: 'd1', type: 'deco', name: '碎鑽', icon: '✧' },
    { id: 'm1', type: 'material', name: '金色材質', icon: '◆' },
    { id: 'm2', type: 'material', name: '銀色材質', icon: '◇' }
  ];

  let currentArrangement = [];
  let currentFilter = 'all';
  let searchTerm = '';

  const partsGrid = document.getElementById("parts-grid");
  const meaningText = document.getElementById("meaning-text");
  const searchInput = document.getElementById("part-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // 渲染零件庫 (卡片)
  function renderLibrary() {
    partsGrid.innerHTML = '';
    
    const filteredParts = partsDatabase.filter(part => {
      const matchFilter = currentFilter === 'all' || part.type === currentFilter;
      const matchSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchSearch;
    });

    if (filteredParts.length === 0) {
      partsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #aaa; font-size: 14px;">找不到零件</p>';
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
    if (meaningText) {
      const itemNames = currentArrangement.map(p => p.name);
      if (itemNames.length > 0) {
        meaningText.textContent = `這條由 ${itemNames.join('、')} 所組成的項鍊，展現了您獨特的品味與設計寓意。`;
      }
    }
  }

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

  // 初始執行渲染
  renderLibrary();
  renderCanvas();
});
