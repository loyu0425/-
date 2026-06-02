---
title: 3D 項鍊設計工作台
meta_title: 3D 項鍊設計工作台 | Soft Jewelry Studio
description: 使用 Soft Jewelry Studio 3D 項鍊設計工作台切換水滴形、圓形與橄欖形款式，加入寶石與零件，並將目前設計帶入 AR 試戴。
og_title: Soft Jewelry Studio 3D 項鍊設計工作台
og_description: 先在 3D 中調整項鍊款式、寶石、材質與排列，再把目前設計帶入 AR 試戴確認配戴比例。
og_image: assets/social/soft-jewelry-og.png
og_type: website
---

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
  <section class="workbench-intro">
    <p class="workbench-kicker">3D Design Studio</p>
    <h1>項鍊設計工作台</h1>
    <p>先選擇項鍊款式，再加入吊墜、寶石與材質細節。右側零件會同步整理成目前設計摘要，方便進入 AR 試戴前確認。</p>
    <div class="workbench-guidance" aria-label="設計流程導引">
      <span>1 選款式</span>
      <span>2 加入零件</span>
      <span>3 確認寓意</span>
      <span>4 AR 試戴</span>
    </div>
  </section>

  <!-- 上半部：3D 預覽與零件庫 -->
  <div class="workbench-top">

    <!-- 左側：大型 3D 預覽 -->
    <div class="workbench-preview">
      <h2>3D 預覽</h2>
      <p id="model-preview-note" class="preview-note">目前顯示水滴形主寶石項鍊模型，可旋轉、縮放檢視細節。</p>

      <div class="model-style-section">
        <div class="model-style-heading">
          <div>
            <h3>選擇項鍊款式</h3>
            <p id="model-style-helper">從 7 款基礎模型開始，先確認輪廓，再進一步加入寶石、材質與寓意。</p>
          </div>
          <span class="model-style-count">7 款模型</span>
        </div>

        <div class="model-style-buttons" id="model-style-buttons">
          <button class="model-style-btn active" data-model-id="teardrop">
            <em>Gift</em>
            <strong>水滴形項鍊</strong>
            <span>柔和主石 · 送禮與紀念</span>
          </button>

          <button class="model-style-btn" data-model-id="round">
            <em>Daily</em>
            <strong>圓形寶石項鍊</strong>
            <span>圓滿比例 · 日常鎖骨</span>
          </button>

          <button class="model-style-btn" data-model-id="oval">
            <em>Ceremony</em>
            <strong>橄欖形寶石項鍊</strong>
            <span>修長主石 · 儀式場合</span>
          </button>

          <button class="model-style-btn" data-model-id="lariat">
            <em>Styling</em>
            <strong>垂墜線條項鍊</strong>
            <span>視覺延伸 · 造型穿搭</span>
          </button>

          <button class="model-style-btn" data-model-id="bar">
            <em>Custom</em>
            <strong>刻字牌項鍊</strong>
            <span>姓名紀念 · 低調客製</span>
          </button>

          <button class="model-style-btn" data-model-id="heart">
            <em>Love</em>
            <strong>愛心寶石項鍊</strong>
            <span>情感禮物 · 親密象徵</span>
          </button>

          <button class="model-style-btn" data-model-id="pearl">
            <em>Pearl</em>
            <strong>珍珠短鍊</strong>
            <span>柔光典雅 · 儀式日常</span>
          </button>
        </div>
      </div>

      <div class="large-preview">
        <model-viewer
          id="necklace-model-viewer"
          src="../assets/models/necklaces/teardrop-necklace.v3.safe.glb?v=model-switch-3"
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
        <div class="preview-drop-zones" id="preview-drop-zones" aria-label="3D 預覽放置點">
          <button class="preview-drop-zone preview-drop-zone--top" type="button" data-placement-slot="chain-top">
            <span class="slot-label">上方鍊節</span>
          </button>
          <button class="preview-drop-zone preview-drop-zone--left" type="button" data-placement-slot="left-accent">
            <span class="slot-label">左側點綴</span>
          </button>
          <button class="preview-drop-zone preview-drop-zone--center" type="button" data-placement-slot="center-stone">
            <span class="slot-label">中央主石</span>
          </button>
          <button class="preview-drop-zone preview-drop-zone--right" type="button" data-placement-slot="right-accent">
            <span class="slot-label">右側點綴</span>
          </button>
          <button class="preview-drop-zone preview-drop-zone--drop" type="button" data-placement-slot="lower-drop">
            <span class="slot-label">下方垂墜</span>
          </button>
        </div>
        <p class="preview-drop-hint">可將右側零件拖到預設點；已放置的點可點擊清除。</p>
      </div>

      <div class="model-asset-panel" aria-label="目前 3D 模型狀態">
        <div>
          <span>目前模型</span>
          <strong id="active-model-label">水滴形項鍊</strong>
          <small id="active-model-category">送禮紀念 · 柔和主石</small>
          <small id="active-model-asset">necklaces/teardrop-necklace.v3.safe.glb</small>
        </div>
        <div>
          <span>模型策略</span>
          <strong>保留原始 GLB</strong>
          <small>新增或壓縮模型時使用新檔名，確認品質後再切換路徑。</small>
        </div>
      </div>

      <p class="ar-tryon-link">
        <a id="open-ar-tryon" class="md-button md-button--primary" href="../ar-tryon/">
          用目前設計開啟 AR 試戴
        </a>
        <span class="ar-tryon-note">會帶入目前款式與鏈條寶石配置。</span>
      </p>
    </div>

    <!-- 右側：零件庫 -->
    <div class="workbench-sidebar">
      <h2>零件庫</h2>

      <section class="design-preset-section" aria-labelledby="design-preset-heading">
        <h3 id="design-preset-heading">設計預設</h3>
        <p>先套用接近需求的商業化方案，再微調零件與寶石。</p>
        <div class="design-preset-grid">
          <button class="design-preset-btn" data-preset-id="daily">
            <strong>日常鎖骨</strong>
            <span>細鍊、珍珠、小鑽，適合每日配戴。</span>
          </button>
          <button class="design-preset-btn" data-preset-id="birthstone">
            <strong>誕生石禮物</strong>
            <span>刻字牌、月份寶石，適合紀念日與送禮。</span>
          </button>
          <button class="design-preset-btn" data-preset-id="ceremony">
            <strong>儀式主石</strong>
            <span>主石、紙鍊、光感零件，適合正式場合。</span>
          </button>
        </div>
      </section>

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

      <!-- 搜尋篩選狀態 -->
      <div id="search-status-display" class="search-status-display"></div>

      <!-- 零件網格 -->
      <div class="parts-grid" id="parts-grid">
        <!-- JS 動態生成圖示卡片 -->
      </div>
    </div>
  </div>

  <!-- 目前設計摘要 -->
  <section class="design-summary-panel" aria-labelledby="design-summary-heading">
    <div class="summary-heading-row">
      <div>
        <p class="workbench-kicker">Current Design</p>
        <h2 id="design-summary-heading">目前設計摘要</h2>
      </div>
      <span id="summary-status-pill" class="summary-status-pill">尚未加入零件</span>
    </div>

    <aside class="design-coach-panel" aria-label="智慧設計提示">
      <div>
        <span>Smart Guide</span>
        <strong id="design-coach-title">先從配戴情境開始</strong>
      </div>
      <p id="design-coach-text">選擇一個款式或套用設計預設，系統會把你的選擇整理成可詢問訂製的摘要。</p>
    </aside>

    <div class="service-confidence-strip" aria-label="訂製前確認">
      <span>本機保存設計狀態</span>
      <span>AR 確認鎖骨位置</span>
      <span>詢問時附上預算、鍊長與完成時間</span>
    </div>

    <div class="summary-grid">
      <div class="summary-item">
        <span class="summary-label">目前款式</span>
        <strong id="summary-style">水滴形項鍊</strong>
      </div>
      <div class="summary-item">
        <span class="summary-label">材質方向</span>
        <strong id="summary-material">銀色材質</strong>
      </div>
      <div class="summary-item">
        <span class="summary-label">已選零件</span>
        <strong id="summary-parts">尚未加入</strong>
      </div>
      <div class="summary-item">
        <span class="summary-label">鏈條寶石</span>
        <strong id="summary-gems">尚未加入</strong>
      </div>
      <div class="summary-item summary-item--wide">
        <span class="summary-label">配戴投影</span>
        <strong id="summary-projection">日常鎖骨鍊比例，適合先以 AR 確認位置。</strong>
      </div>
      <div class="summary-item summary-item--wide">
        <span class="summary-label">場合建議</span>
        <strong id="summary-occasion">日常配戴、送禮、紀念日。</strong>
      </div>
      <div class="summary-item summary-item--wide">
        <span class="summary-label">詢問摘要</span>
        <strong id="summary-inquiry">選好款式與寶石後，可帶著目前設計進行估價。</strong>
      </div>
    </div>
  </section>

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
