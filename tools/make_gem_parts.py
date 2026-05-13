import bpy
import math
from pathlib import Path

OUTPUT_DIR = Path(r"C:\Users\user\my-project-antigravity-test\docs\assets\models\gems")


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()


def make_material(name, color, metallic=0.0, roughness=0.12):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True

    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness

    # Blender 5.x 有些材質輸入名稱可能不同，所以透明度先不強制做。
    return mat


def add_faceted_round_gem(name, radius, height, material, segments=12):
    mesh = bpy.data.meshes.new(name + "_mesh")
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)

    verts = []
    faces = []

    table_radius = radius * 0.55
    girdle_radius = radius
    top_z = height * 0.28
    mid_z = 0.0
    bottom_z = -height * 0.72

    # 上方桌面
    for i in range(segments):
        a = 2 * math.pi * i / segments
        verts.append((table_radius * math.cos(a), table_radius * math.sin(a), top_z))

    # 腰圍
    for i in range(segments):
        a = 2 * math.pi * i / segments
        verts.append((girdle_radius * math.cos(a), girdle_radius * math.sin(a), mid_z))

    # 底部尖端
    verts.append((0.0, 0.0, bottom_z))
    bottom_idx = 2 * segments

    # 頂面
    faces.append(list(range(segments)))

    # 冠部斜面
    for i in range(segments):
        j = (i + 1) % segments
        faces.append([i, j, j + segments, i + segments])

    # 亭部三角面
    for i in range(segments):
        j = (i + 1) % segments
        faces.append([i + segments, j + segments, bottom_idx])

    mesh.from_pydata(verts, [], faces)
    mesh.update()

    for poly in mesh.polygons:
        poly.use_smooth = False

    obj.data.materials.append(material)
    return obj


def add_pearl(name, radius, material):
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=64,
        ring_count=32,
        radius=radius,
        location=(0, 0, 0)
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    return obj


def add_studio_light():
    bpy.ops.object.light_add(type="AREA", location=(0, -2.5, 3))
    light = bpy.context.object
    light.name = "柔光"
    light.data.energy = 350
    light.data.size = 4

    bpy.ops.object.camera_add(
        location=(0, -2.4, 1.2),
        rotation=(math.radians(65), 0, 0)
    )
    bpy.context.scene.camera = bpy.context.object


def export_glb(filename):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / filename

    bpy.ops.export_scene.gltf(
        filepath=str(path),
        export_format="GLB",
        export_apply=True,
        export_materials="EXPORT",
    )

    print(f"已輸出：{path}")


def create_gem_file(filename, name, color):
    clear_scene()

    mat = make_material(name, color, metallic=0.0, roughness=0.035)
    add_faceted_round_gem(name=name, radius=0.12, height=0.13, material=mat, segments=12)
    add_studio_light()
    export_glb(filename)


def create_pearl_file():
    clear_scene()

    pearl_mat = make_material("珍珠", (0.96, 0.92, 0.84, 1.0), metallic=0.0, roughness=0.28)
    add_pearl("珍珠", radius=0.12, material=pearl_mat)
    add_studio_light()
    export_glb("pearl.glb")


def main():
    create_gem_file("blue-sapphire.glb", "藍寶石", (0.02, 0.25, 0.95, 1.0))
    create_gem_file("pink-gem.glb", "粉寶石", (1.0, 0.35, 0.65, 1.0))
    create_gem_file("green-gem.glb", "綠寶石", (0.05, 0.75, 0.35, 1.0))
    create_gem_file("diamond.glb", "小鑽石", (0.95, 0.98, 1.0, 1.0))
    create_pearl_file()


if __name__ == "__main__":
    main()