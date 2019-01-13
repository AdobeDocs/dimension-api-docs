## Properties

These are the currently supported properties and their types:

### name
will be `setPropertyValue` for now. Reserved for later use...

### property
Specifies the property to change. The user will be able to identify just the visible user interface names of meshes, decals etc. The property description will be a path to it visible in the tree view. Some additional path parts are required for further specification like "Material" for meshes.

### Value
This needs to match the type of object. For example a material color object will need to receive an object with a type and color components if its a color or an file path if its an image. These are the current value types:

```
property: "Environment/Background" value: <Image>
property: "Environment/Background" value: <Color>

property: "Camera/View Angle" value: <Vector3D> // Camera view angle rotation around scene zero point of x, y, z axis in degrees
property: "Camera/Transform" value: <Transform> // 3D Camera transformation

property: "Scene/<group>/...<group>/Visible" value: <Boolean> // Group visibility
property: "Scene/<group>/...<group>/<mesh>/Visible" value: <Boolean> // Mesh visibility

property: "Scene/<group>/...<group>/Transform" value: <Transform> // 3D Group transformation
property: "Scene/<group>/...<group>/<mesh>/Transform" value: <Transform> // 3D Mesh transformation

property: "Scene/<group>/...<group>/<mesh>/Materials/<materialName>/Base Color" value: <Image> // Mesh material base color texture
property: "Scene/<group>/...<group>/<mesh>/Materials/<materialName>/Base Color" value: <Color> // Mesh material base color
property: "Scene/<group>/...<group>/<mesh>/Materials/<materialName>/Offset" value: <Vector2D> // Mesh material texture uv-offset
property: "Scene/<group>/...<group>/<mesh>/Materials/<materialName>/Scale" value: <Vector2D> // Mesh material texture scale

property: "Scene/<group>/...<group>/<mesh>/Materials/<decalName>/Image" value: <Image> // Mesh material decal texture
```
