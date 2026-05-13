<script src="https://unpkg.com/mobile-drag-drop@3.0.0-rc.0/index.min.js"></script>
<script src="https://unpkg.com/mobile-drag-drop@3.0.0-rc.0/scroll-behaviour.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/mobile-drag-drop@3.0.0-rc.0/default.css">
<script>
  window.addEventListener('DOMContentLoaded', () => {
    MobileDragDrop.polyfill({
      dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
    });
  });
</script>

<style>
/* 項鍊設計工作台：解除 MkDocs 文件頁限制 */
.md-main__inner.md-grid {
  max-width: none !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
}

/* 隱藏 MkDocs 左右文件側邊欄 */
.md-sidebar,
.md-sidebar--primary,
.md-sidebar--secondary {
  display: none !important;
}

/* 讓內容區吃滿可用寬度 */
.md-content {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
}

.md-content__inner {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.md-content__inner::before {
  display: none !important;
}
</style>

<div class="workbench-container">

  <!-- 上半部：3D 預覽與零件庫 -->
  <div class="workbench-top">

    <!-- 左側：大型 3D 預覽 -->
    <div class="workbench-preview">
      <h2>3D 預覽</h2>
      <p class="preview-note">目前顯示水滴形主寶石項鍊模型，可旋轉、縮放檢視細節。</p>

      <div class="model-style-section">
        <h3>選擇項鍊款式</h3>

        <div class="model-style-buttons" id="model-style-buttons">
          <button class="model-style-btn active" data-model-id="teardrop">
            水滴形項鍊
          </button>

          <button class="model-style-btn" data-model-id="round">
            圓形寶石項鍊
          </button>

          <button class="model-style-btn" data-model-id="oval">
            橄欖形寶石項鍊
          </button>
        </div>
      </div>

      <div class="large-preview">
        <model-viewer
          id="necklace-model-viewer"
          src="../assets/models/necklaces/teardrop-necklace.glb?v=model-switch-1"
          alt="水滴形寶石項鍊 3D 預覽"
          auto-rotate
          camera-controls
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          ar
          ar-modes="webxr scene-viewer quick-look"
          loading="eager"
          reveal="auto">
        </model-viewer>
      </div>

      <p class="ar-tryon-link">
        <a id="open-ar-tryon" class="md-button md-button--primary" href="../ar-tryon/">
          開啟 AR 試戴
        </a>
      </p>
    </div>

    <!-- 右側：零件庫 -->
    <div class="workbench-sidebar">
      <h2>零件庫</h2>

      <!-- 頂端搜尋 -->
      <div class="search-bar">
        <input
          type="text"
          id="part-search"
          placeholder="搜尋零件..."
          aria-label="搜尋零件"
        >
      </div>

      <!-- 分類按鈕 -->
      <div class="filter-buttons" id="filter-buttons">
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="chain">鍊條</button>
        <button class="filter-btn" data-filter="pendant">吊墜</button>
        <button class="filter-btn" data-filter="bead">珠飾</button>
        <button class="filter-btn" data-filter="deco">裝飾</button>
        <button class="filter-btn" data-filter="gem">寶石</button>
        <button class="filter-btn" data-filter="material">材質</button>
      </div>

      <!-- 零件網格 -->
      <div class="parts-grid" id="parts-grid">
        <!-- JS 動態生成圖示卡片 -->
      </div>
    </div>
  </div>

  <!-- 下半部：我的項鍊排列 -->
  <div class="workbench-bottom">
    <h2>我的項鍊排列</h2>

    <!-- 排列畫布 -->
    <div class="arrangement-canvas" id="arrangement-canvas">
      <!-- JS 動態生成排列或空插槽 -->
    </div>

    <!-- 拖曳刪除區 -->
    <div id="trash-zone" class="trash-zone">
      <span>− 拖曳至此刪除</span>
    </div>

    <!-- 鏈條寶石設計區 -->
    <div class="chain-gem-section">
      <h3>鏈條寶石設計區</h3>
      <p class="preview-note">將右側「寶石」拖曳至下方鏈條插槽中，打造專屬點綴。</p>

      <div class="chain-slots-container" id="chain-slots-container">
        <!-- JS 動態生成插槽 -->
      </div>
    </div>

    <!-- 設計寓意 -->
    <div class="design-meaning-section">
      <h3>設計寓意</h3>
      <p id="meaning-text">選擇零件後，這裡會呈現你的項鍊寓意。</p>
    </div>
  </div>

</div>