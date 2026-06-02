# Model Optimization Notes

本檔記錄 Phase 5 的模型資產檢查與後續壓縮流程。不要直接覆蓋現有 GLB；任何壓縮版都應輸出新檔名並先在 3D viewer 與 AR try-on 驗證。

## 2026-05-27 檢查結果

`docs/assets/models/necklaces/` 中三個項鍊款式目前高度重複：

| 檔案 | 大小 | SHA256 判斷 |
| --- | ---: | --- |
| `teardrop-necklace.glb` | 18,190,284 bytes | 與 round / oval / necklace.glb 相同 |
| `round-necklace.glb` | 18,190,284 bytes | 與 teardrop / oval / necklace.glb 相同 |
| `oval-necklace.glb` | 18,190,284 bytes | 與 teardrop / round / necklace.glb 相同 |
| `necklace.glb` | 18,190,284 bytes | 與三個 necklace 款式相同 |

`docs/ar-tryon/models/` 內也存在同樣重複，因為它是 AR source build/export 的輸出。

寶石 GLB 較小，只有 `pearl.glb` 約 283 KB，其餘寶石約 3.6 KB。

## 風險

- 目前每個 necklace GLB 約 17.35 MiB，對手機網路與 AR 試戴載入時間不友善。
- 三個款式檔案雜湊相同，代表目前是同一份模型複製成不同檔名；若要維持三款視覺差異，需要回到建模或匯出流程確認來源。
- 直接改檔名、共用單一檔或覆蓋原始 GLB，可能破壞現有 3D viewer 與 AR try-on 的路徑合約。

## 建議流程

1. 保留原始 GLB，不覆蓋。
2. 建立壓縮輸出檔名，例如：
   - `teardrop-necklace.opt.glb`
   - `round-necklace.opt.glb`
   - `oval-necklace.opt.glb`
3. 先只在測試分支或測試頁面引用 `.opt.glb`。
4. 驗證 `model-viewer` 可載入、切換款式正常、AR source build/export 後仍能載入。
5. 確認視覺品質、材質、透明、遮擋與 pivot 都可接受後，再調整正式路徑。

## gltfpack / Meshopt 範例

使用 gltfpack 產生 Meshopt 壓縮版，輸出新檔名：

```powershell
gltfpack `
  -i docs/assets/models/necklaces/teardrop-necklace.glb `
  -o docs/assets/models/necklaces/teardrop-necklace.opt.glb `
  -cc -tc -kn
```

建議先用保守參數測試，再逐步調整壓縮率。若使用 Meshopt 壓縮，需確認目標載入器與 `model-viewer` 版本支援相對應 extension。

## Draco 範例

若要使用 Draco，需先確認 `model-viewer` 與 AR Three.js GLTFLoader 都能載入 Draco decoder，且 decoder 資產路徑可在 GitHub Pages 子路徑下正確解析。未完成 decoder 路徑驗證前，不建議直接切到 Draco 版。

```powershell
gltf-pipeline `
  -i docs/assets/models/necklaces/teardrop-necklace.glb `
  -o docs/assets/models/necklaces/teardrop-necklace.draco.glb `
  -d
```

## 本階段決策

Phase 5 只文件化模型大小、重複狀況與安全壓縮流程，未輸出壓縮 GLB，也未修改任何模型引用路徑。

## 2026-05-27 安全新增模型

新增 `docs/assets/models/necklaces/lariat-necklace.safe.glb` 作為垂墜線條項鍊的輕量原型模型，大小約 2.6 KB。這是獨立新檔名的程序化 GLB，不是既有 necklace GLB 的壓縮或覆蓋版本。

同步位置：

- 網站 3D viewer：`docs/assets/models/necklaces/lariat-necklace.safe.glb`
- AR source public：`C:\Users\user\ar_necklace_test\public\models\necklaces\lariat-necklace.safe.glb`
- AR 輸出：由 AR source `npm run build` 後同步到 `docs/ar-tryon/models/necklaces/lariat-necklace.safe.glb`

後續若要換成正式建模資產，仍需保留原始來源檔與匯出流程，並使用新檔名先測試 `model-viewer`、AR 載入、pivot、比例與材質，再切換正式引用。

## 2026-05-29 lariat 模型修正版

依使用者要求修正上次新增的垂墜線條模型，新增 `docs/assets/models/necklaces/lariat-necklace.v2.safe.glb`。本次仍保留舊的 `lariat-necklace.safe.glb` 作為回退檔，不覆蓋既有原始 necklace GLB。

修正重點：

- 改用有 `NORMAL` accessor 的圓管鍊條，降低原型模型的平面與方塊感。
- 加入中央垂墜線、橫向連接件、金色節點珠、珍珠與月光石主石。
- 檔案大小約 91 KB，仍遠小於既有 18 MB necklace GLB。
- 3D viewer 與 AR source 的 `lariat` 款式已切換到 `lariat-necklace.v2.safe.glb`。

同步位置：

- 網站 3D viewer：`docs/assets/models/necklaces/lariat-necklace.v2.safe.glb`
- AR source public：`C:\Users\user\ar_necklace_test\public\models\necklaces\lariat-necklace.v2.safe.glb`
- AR 輸出：由 AR source `npm run build` 後同步到 `docs/ar-tryon/models/necklaces/lariat-necklace.v2.safe.glb`

## 2026-05-29 其他款式 v2 safe 模型

延續垂墜線條模型修正版流程，新增三個獨立新檔名的程序化 GLB，不覆蓋原始 18 MB necklace GLB：

| 檔案 | 大小 | 用途 |
| --- | ---: | --- |
| `teardrop-necklace.v2.safe.glb` | 約 123 KB | 水滴主石、金屬節點與珍珠點綴 |
| `round-necklace.v2.safe.glb` | 約 159 KB | 圓形主石與珍珠節奏 |
| `oval-necklace.v2.safe.glb` | 約 167 KB | 橢圓長主石與玫瑰金節點 |

同步位置：

- 網站 3D viewer：`docs/assets/models/necklaces/*.v2.safe.glb`
- AR source public：`C:\Users\user\ar_necklace_test\public\models\necklaces\*.v2.safe.glb`
- AR 輸出：由 AR source `npm run build` 後同步到 `docs/ar-tryon/models/necklaces/*.v2.safe.glb`

本次也將 3D viewer 與 AR source 的水滴、圓形、橄欖款式路徑切換到 v2 safe 檔。原始 `teardrop-necklace.glb`、`round-necklace.glb`、`oval-necklace.glb` 保留作為回退與來源比較。
