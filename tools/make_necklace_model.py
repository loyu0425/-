import bpy
import math
from pathlib import Path

# ========= 路徑設定 =========
OUTPUT_PATH = Path(r"C:\Users\user\my-project-antigravity-test\docs\assets\models\necklace.glb")

# ========= 清空場景 =========
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete()

# ========= 材質 =========
def make_material(name, color, metallic=0.0, roughness=0.25):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True

    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness

    return mat

gold = make_material("18K 鍍金", (0.95, 0.70, 0.25, 1.0), metallic=1.0, roughness=0.18)
silver = make_material("拋光銀色", (0.85, 0.82, 0.76, 1.0), metallic=1.0, roughness=0.16)
pearl = make_material("珍珠白", (0.96, 0.92, 0.84, 1.0), metallic=0.0, roughness=0.32)
blue_gem = make_material("藍色寶石", (0.05, 0.45, 0.95, 1.0), metallic=0.0, roughness=0.08)

# ========= 建立物件輔助函式 =========
def add_cylinder(name, radius, depth, location, material, vertices=96):
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=vertices,
        radius=radius,
        depth=depth,
        location=location,
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)

    bevel = obj.modifiers.new("Soft bevel", "BEVEL")
    bevel.width = 0.035
    bevel.segments = 4

    normal = obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    return obj

def add_torus(name, major_radius, minor_radius, location, material):
    bpy.ops.mesh.primitive_torus_add(
        major_segments=128,
        minor_segments=24,
        major_radius=major_radius,
        minor_radius=minor_radius,
        location=location,
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    return obj

def add_uv_sphere(name, radius, location, material):
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=64,
        ring_count=32,
        radius=radius,
        location=location,
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    return obj

# ========= 主吊墜：圓牌 =========
pendant = add_cylinder(
    name="圓形主吊墜",
    radius=1.0,
    depth=0.12,
    location=(0, 0, 0),
    material=gold,
)

# 讓圓牌面向相機：目前先保持 XY 平面，model-viewer 可旋轉觀看

# ========= 外圈銀色邊框 =========
outer_ring = add_torus(
    name="銀色外框",
    major_radius=1.03,
    minor_radius=0.035,
    location=(0, 0, 0.075),
    material=silver,
)

# ========= 中央寶石 =========
gem = add_uv_sphere(
    name="中央藍色寶石",
    radius=0.28,
    location=(0, 0, 0.16),
    material=blue_gem,
)

# 寶石底座
gem_base = add_torus(
    name="寶石固定座",
    major_radius=0.31,
    minor_radius=0.025,
    location=(0, 0, 0.14),
    material=silver,
)

# ========= 上方扣環 =========
bail = add_torus(
    name="上方扣環",
    major_radius=0.22,
    minor_radius=0.035,
    location=(0, 1.18, 0.11),
    material=gold,
)

# 扣環稍微站起來
bail.rotation_euler[0] = math.radians(90)

# ========= 左右珍珠裝飾 =========
left_pearl = add_uv_sphere(
    name="左側珍珠",
    radius=0.16,
    location=(-0.62, 0.34, 0.16),
    material=pearl,
)

right_pearl = add_uv_sphere(
    name="右側珍珠",
    radius=0.16,
    location=(0.62, 0.34, 0.16),
    material=pearl,
)

bottom_pearl = add_uv_sphere(
    name="下方珍珠",
    radius=0.14,
    location=(0, -0.68, 0.16),
    material=pearl,
)

# ========= 簡單鍊條：用多個小 torus 模擬 =========
for i in range(9):
    x = (i - 4) * 0.22
    y = 1.55 + abs(i - 4) * 0.03
    chain = add_torus(
        name=f"鏈節_{i+1}",
        major_radius=0.075,
        minor_radius=0.018,
        location=(x, y, 0.10),
        material=silver,
    )
    chain.rotation_euler[0] = math.radians(90)
    chain.rotation_euler[2] = math.radians(35 if i % 2 == 0 else -35)

# ========= 燈光 =========
bpy.ops.object.light_add(type="AREA", location=(0, -3, 4))
key_light = bpy.context.object
key_light.name = "主柔光"
key_light.data.energy = 600
key_light.data.size = 5

bpy.ops.object.light_add(type="POINT", location=(2.5, 2, 3))
rim_light = bpy.context.object
rim_light.name = "側光"
rim_light.data.energy = 120

# ========= 相機 =========
bpy.ops.object.camera_add(location=(0, -4.2, 2.2), rotation=(math.radians(62), 0, 0))
bpy.context.scene.camera = bpy.context.object

# ========= 設定原點與視角 =========
for obj in bpy.context.scene.objects:
    obj.select_set(True)

# 確保輸出資料夾存在
OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

# ========= 匯出 GLB =========
bpy.ops.export_scene.gltf(
    filepath=str(OUTPUT_PATH),
    export_format="GLB",
    export_apply=True,
    export_materials="EXPORT",
)

print(f"已輸出模型：{OUTPUT_PATH}")