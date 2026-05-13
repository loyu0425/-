import sys

file_path = r'c:\Users\user\my-project-antigravity-test\tools\make_necklace_model.py'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if line.startswith('# ========= 主吊墜：縮小比例 ========='):
        skip = True
        
        new_lines.append('# ========= 主吊墜：水滴形寶石與鑽石光環 =========\n')
        new_lines.append('''def add_round_gem(name, radius, location, material, segments=8):
    mesh = bpy.data.meshes.new(name + "_mesh")
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    
    verts = []
    faces = []
    
    top_radius = radius * 0.54
    top_z = radius * 0.15
    mid_z = 0.0
    bot_z = -radius * 0.6
    
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
pendant_x = 0.0
pendant_y = 0.235
pendant_z = 0.05

main_gem = add_teardrop_gem(
    name="水滴形主寶石",
    width=gem_width,
    length=gem_length,
    depth=gem_depth,
    location=(pendant_x, pendant_y, pendant_z),
    material=blue_gem,
    segments=32
)

bezel = add_teardrop_bezel(
    name="金屬鑲邊",
    width=gem_width,
    length=gem_length,
    depth=0.08,
    location=(pendant_x, pendant_y, pendant_z - 0.02),
    material=silver,
    segments=48
)

halo_points = get_teardrop_halo_points(gem_width, gem_length, 1.18, 26)
for i, (hx, hy) in enumerate(halo_points):
    add_round_gem(
        name=f"配鑽_{i+1}",
        radius=0.016,
        location=(hx + pendant_x, hy + pendant_y, pendant_z + 0.01),
        material=diamond,
        segments=8
    )

# ========= 上方扣環 =========
bail = add_torus(
    name="上方扣環",
    major_radius=0.08,
    minor_radius=0.018,
    location=(0, 0.59, 0.055),
    material=silver,
)
bail.rotation_euler[0] = math.radians(90)
''')
        
    if line.startswith('# ========= U 型項鍊鏈條 ========='):
        skip = False
        
    if not skip:
        if line.startswith('blue_gem = make_material'):
            new_lines.append(line)
            new_lines.append('diamond = make_material("真鑽", (0.95, 0.98, 1.0, 1.0), metallic=0.1, roughness=0.01)\n')
        else:
            new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('File updated successfully.')
