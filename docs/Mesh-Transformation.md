## Mesh Transformation Examples
<a href="Properties.md" >Properties Definitions</a>
### Example Mesh Rotation

```
curl -H "Authorization: Bearer $token" -X POST -v https://felicity-api.adobedice.com/v1/render/variation -d \
'{
  "input": "https://signed-url-GET-base-dn-file....",
  "name": "test-variation",
  "engine_type": "lantern",
  "variations": [
    {
      "render_settings": {
        "name": "test-variation-name",
        "properties": [
          {
            "name": "setPropertyValue",
            "property": "Scene/MyGroup1/Transform",
            "value": {
              "type": "transform",
              "rx": 0,
              "ry": 180,
              "rz": 0
            }
          }
        ],
        "return_url": "https://signed-url-PUT-for-render-result...",
        "preset": "preset-low",
        "outputs": [
          {
            "pixel_depth": 16,
            "output_format": "psd"
          }
        ]
      }
    }
  ]
}'

```
