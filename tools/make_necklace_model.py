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
blue_gem = make_material("藍色寶石", (0.05, 0.45, 0.95, 1.0), metallic=0.1, roughness=0.02)
diamond = make_material("真鑽", (0.95, 0.98, 1.0, 1.0), metallic=0.1, roughness=0.01)
diamond = make_material("真鑽", (0.95, 0.98, 1.0, 1.0), metallic=0.1, roughness=0.01)

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

# ========= 主吊墜：水滴形寶石與鑽石光環 =========
def add_round_gem(name, radius, location, material, segments=8):
    mesh = bpy.data.meshes.new(name + "_mesh")
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    
    verts = []
    faces = []
    
    top_radius = radius * 0.6
    top_z = radius * 0.25
    mid_z = 0.0
    bot_z = -radius * 0.7
    
    for i in range(segments):
        angle = 2 * math.pi * i / segments
        verts.append((top_radius * math.cos(angle), top_radius * math.sin(angle), top_z))
        
    for i in range(segments):
        angle = 2 * math.pi * i / segments
        verts.append((radius * math.cos(angle), radius * math.sin(angle), mid_z))
        
    verts.append((0.0, 0.0, bot_z))
    
    faces.append(list(range(segments)))
    for i in range(segments):
        next_i = (i + 1) % segments
        faces.append([i, next_i, next_i + segments, i + segments])
        
    bot_idx = 2 * segments
    for i in range(segments):
        next_i = (i + 1) % segments
        faces.append([i + segments, next_i + segments, bot_idx])
        
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    
    for poly in mesh.polygons:
        poly.use_smooth = False
        
    obj.location = location
    obj.data.materials.append(material)
    return obj

def add_teardrop_gem(name, width, length, depth, location, material, segments=24):
    mesh = bpy.data.meshes.new(name + "_mesh")
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    
    verts = []
    faces = []
    
    z_top = depth * 0.3
    z_bot = -depth * 0.7
    
    outline = []
    for i in range(segments):
        t = 2 * math.pi * i / segments
        x = (width / 2) * math.cos(t)
        y = (length / 2) * math.sin(t)
        
        if y > 0:
            ratio = y / (length / 2)
            if ratio > 1.0: ratio = 1.0
            factor = (1.0 - ratio) ** 0.6
            x *= factor
        outline.append((x, y))
        
    table_scale = 0.5
    for x, y in outline:
        verts.append((x * table_scale, y * table_scale - length*0.03, z_top))
        
    for x, y in outline:
        verts.append((x, y, 0.0))
        
    verts.append((0.0, -length*0.05, z_bot))
    
    faces.append(list(range(segments)))
    
    for i in range(segments):
        next_i = (i + 1) % segments
        faces.append([i, next_i, next_i + segments, i + segments])
        
    bot_idx = 2 * segments
    for i in range(segments):
        next_i = (i + 1) % segments
        faces.append([i + segments, next_i + segments, bot_idx])
        
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    
    for poly in mesh.polygons:
        poly.use_smooth = False
        
    obj.location = location
    obj.data.materials.append(material)
    return obj

def add_teardrop_bezel(name, width, length, depth, location, material, segments=32):
    mesh = bpy.data.meshes.new(name + "_mesh")
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    
    verts = []
    faces = []
    
    for i in range(segments):
        t = 2 * math.pi * i / segments
        x = (width / 2) * math.cos(t)
        y = (length / 2) * math.sin(t)
        if y > 0:
            ratio = y / (length / 2)
            if ratio > 1.0: ratio = 1.0
            x *= (1.0 - ratio) ** 0.6
            
        verts.append((x * 0.95, y * 0.95, -depth/2))
        verts.append((x * 0.95, y * 0.95, depth/2))
        verts.append((x * 1.15, y * 1.15, depth/2))
        verts.append((x * 1.15, y * 1.15, -depth/2))
        
    for i in range(segments):
        next_i = (i + 1) % segments
        base = i * 4
        next_base = next_i * 4
        
        faces.append([base, base+1, next_base+1, next_base])
        faces.append([base+1, base+2, next_base+2, next_base+1])
        faces.append([base+2, base+3, next_base+3, next_base+2])
        faces.append([base+3, base, next_base, next_base+3])
        
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    
    for poly in mesh.polygons:
        poly.use_smooth = True
        
    obj.modifiers.new("Subdivision", "SUBSURF").levels = 1
    
    obj.location = location
    obj.data.materials.append(material)
    return obj

def get_teardrop_halo_points(width, length, scale, count):
    hires = 150
    pts = []
    for i in range(hires):
        t = 2 * math.pi * i / hires
        x = (width / 2) * math.cos(t) * scale
        y = (length / 2) * math.sin(t) * scale
        if y > 0:
            ratio = y / (length * scale / 2)
            if ratio > 1.0: ratio = 1.0
            x *= (1.0 - ratio) ** 0.6
        pts.append((x, y))
    
    total_len = 0
    lengths = [0]
    for i in range(hires):
        p1 = pts[i]
        p2 = pts[(i+1)%hires]
        d = math.hypot(p2[0]-p1[0], p2[1]-p1[1])
        total_len += d
        lengths.append(total_len)
        
    step = total_len / count
    halo_pts = []
    current_dist = 0
    idx = 0
    for _ in range(count):
        while idx < hires and lengths[idx+1] < current_dist:
            idx += 1
        if idx >= hires: idx = hires - 1
        
        segment_len = lengths[idx+1] - lengths[idx]
        t_interp = 0 if segment_len == 0 else (current_dist - lengths[idx]) / segment_len
            
        p1 = pts[idx]
        p2 = pts[(idx+1)%hires]
        hx = p1[0] + (p2[0] - p1[0]) * t_interp
        hy = p1[1] + (p2[1] - p1[1]) * t_interp
        halo_pts.append((hx, hy))
        
        current_dist += step
        
    return halo_pts

# ========= 組合吊墜 =========
gem_width = 0.38
gem_length = 0.55
gem_depth = 0.16

# 將項鍊整理為適合 AR 穿戴的三維座標：
# 視覺錨點 (0,0,0) 為脖子中心
# 垂墜方向為 -Z (往下)
# 往前挺出胸口的深度為 -Y (往前)
chain_drop = 1.2    # 鏈條往下垂的深度 (Z)
chain_width = 0.8   # 單邊寬度 (X)
chest_forward = -0.2 # 往前挺的深度 (Y)

# 新的吊墜中心 (對齊鏈條最低點下方)
cx = 0.0
cz = -chain_drop - 0.355  # 從扣環往下算
cy = chest_forward - 0.02 # 稍微往前突出，避免與鏈條打架

main_gem = add_teardrop_gem(
    name="水滴形主寶石",
    width=gem_width,
    length=gem_length,
    depth=gem_depth,
    location=(cx, cy, cz),
    material=blue_gem,
    segments=32
)
# 旋轉90度使其站立，並面向前方
main_gem.rotation_euler = (math.radians(90), 0, 0)

bezel = add_teardrop_bezel(
    name="金屬鑲邊",
    width=gem_width,
    length=gem_length,
    depth=0.08,
    location=(cx, cy + 0.02, cz),
    material=silver,
    segments=48
)
bezel.rotation_euler = (math.radians(90), 0, 0)

halo_points = get_teardrop_halo_points(gem_width, gem_length, 1.18, 26)
for i, (hx, hy) in enumerate(halo_points):
    add_round_gem(
        name=f"配鑽_{i+1}",
        radius=0.016,
        location=(cx + hx, cy - 0.01, cz + hy),
        material=diamond,
        segments=8
    ).rotation_euler = (math.radians(90), 0, 0)

# ========= 上方扣環 =========
bail = add_torus(
    name="上方扣環",
    major_radius=0.08,
    minor_radius=0.018,
    location=(cx, cy, -chain_drop),
    material=silver,
)
# 讓扣環直立並橫向開孔，連接鏈條與吊墜
bail.rotation_euler = (0, math.radians(90), 0)

# ========= U 型項鍊鏈條 =========
# 鏈條使用三維拋物線
# Z = a * X^2 + b
b = -chain_drop
a = chain_drop / (chain_width**2)

link_length = 0.12

# 1. 產生右半邊路徑點 (X, Y, Z)
points_right = [(0.0, chest_forward, b)]
current_p = (0.0, chest_forward, b)

while True:
    step = 0.005
    test_x = current_p[0]
    while True:
        test_x += step
        test_z = a * (test_x ** 2) + b
        t = test_x / chain_width
        test_y = chest_forward * (1 - t)
        dist = math.sqrt((test_x - current_p[0])**2 + (test_y - current_p[1])**2 + (test_z - current_p[2])**2)
        if dist >= link_length:
            break
    
    if test_x > chain_width + 0.3:
        break
        
    current_p = (test_x, test_y, test_z)
    points_right.append(current_p)

# 2. 鏡像左半邊並合併
all_points = []
for p in reversed(points_right[1:]):
    all_points.append((-p[0], p[1], p[2]))
all_points.extend(points_right)

import mathutils

# 3. 沿著三維路徑生成鏈節
for i, p in enumerate(all_points):
    # 計算切線向量
    if i == 0:
        p_next = all_points[i+1]
        tangent = (p_next[0]-p[0], p_next[1]-p[1], p_next[2]-p[2])
    elif i == len(all_points)-1:
        p_prev = all_points[i-1]
        tangent = (p[0]-p_prev[0], p[1]-p_prev[1], p[2]-p_prev[2])
    else:
        p_prev = all_points[i-1]
        p_next = all_points[i+1]
        tangent = (p_next[0]-p_prev[0], p_next[1]-p_prev[1], p_next[2]-p_prev[2])
        
    direction = mathutils.Vector(tangent).normalized()
    # 讓圓環的X軸(長軸)對齊切線
    rot_quat = mathutils.Vector((1,0,0)).rotation_difference(direction)
    
    link = add_torus(
        name=f"鏈節_{i+1}",
        major_radius=0.045,
        minor_radius=0.012,
        location=p,
        material=silver,
    )
    link.scale = (1.5, 1.0, 1.0)
    
    # 相鄰鏈環交錯扭轉 90 度
    twist = 0 if i % 2 == 0 else math.radians(90)
    q_twist = mathutils.Quaternion((1,0,0), twist)
    link.rotation_mode = 'QUATERNION'
    link.rotation_quaternion = rot_quat @ q_twist

# ========= 燈光 =========
bpy.ops.object.light_add(type="AREA", location=(0, -3, 2))
key_light = bpy.context.object
key_light.name = "主柔光"
key_light.data.energy = 600
key_light.data.size = 5

bpy.ops.object.light_add(type="POINT", location=(2.5, -1, 1))
rim_light = bpy.context.object
rim_light.name = "側光"
rim_light.data.energy = 120

# ========= 相機 =========
# 調整相機預覽角度，對準項鍊中心 (-0.8)
bpy.ops.object.camera_add(location=(0, -4.5, -0.8), rotation=(math.radians(90), 0, 0))
bpy.context.scene.camera = bpy.context.object

# ========= 校正與縮放模型 =========
# 1. 取消全選，只選取 Mesh 物件
bpy.ops.object.select_all(action='DESELECT')
meshes = [obj for obj in bpy.context.scene.objects if obj.type == 'MESH']
for obj in meshes:
    obj.select_set(True)

if meshes:
    bpy.context.view_layer.objects.active = meshes[0]
    
    # 2. 計算所有 mesh 的 Bounding Box (世界座標)
    min_x = min_y = min_z = float('inf')
    max_x = max_y = max_z = float('-inf')
    
    bpy.context.view_layer.update()
    for obj in meshes:
        bbox_corners = [obj.matrix_world @ mathutils.Vector(corner) for corner in obj.bound_box]
        for corner in bbox_corners:
            min_x = min(min_x, corner.x)
            min_y = min(min_y, corner.y)
            min_z = min(min_z, corner.z)
            max_x = max(max_x, corner.x)
            max_y = max(max_y, corner.y)
            max_z = max(max_z, corner.z)
            
    # 3. 計算中心點與最大尺寸
    center_x = (min_x + max_x) / 2
    center_y = (min_y + max_y) / 2
    center_z = (min_z + max_z) / 2
    
    size_x = max_x - min_x
    size_y = max_y - min_y
    size_z = max_z - min_z
    max_dim = max(size_x, size_y, size_z)
    
    # 4. 將整個模型的 bounding box 中心移到原點附近
    bpy.ops.transform.translate(value=(-center_x, -center_y, -center_z))
    
    # 5. 縮放至最大約 2 Blender units
    target_size = 2.0
    if max_dim > 0:
        scale_factor = target_size / max_dim
        bpy.ops.transform.resize(value=(scale_factor, scale_factor, scale_factor))
        
    # 7. 套用 Transform，確保 model-viewer 正確讀取
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

# 全選所有物件以供匯出
bpy.ops.object.select_all(action='SELECT')

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