## Mesh Transformation Examples
<a href="Properties.md" >Properties Definitions</a>
### Example Mesh Rotation

```
curl -H "Authorization: Bearer $token" -H "x-api-key: $client_id" -X POST -v https://dncr.adobe.io/v1/variation/render -d \
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
