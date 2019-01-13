## Background Variation Examples
<a href="Properties.md" >Properties Definitions</a>
### Example of rotating the camera against Y-axis from the origin or the Scene

```
curl -H "Authorization: Bearer $token" -X POST https://dncr.adobe.io/v1/render/variation -d \
'{
  "input": "https://signed-url-GET-base-dn-file....",
  "name": "variation-name",
  "engine_type": "lantern",
  "variations": [
    {
      "render_settings": {
        "name": "variation-name",
        "properties": [
          {
            "name": "setPropertyValue",
            "property": "Environment/Background",
            "value": {
                "type": "image",
                "file": "https://signed-url-GET-image..."
            }
          }
        ],
        "des_path": "https://signed-url-PUT-for-render-result...",
			  "preset": "preset-low",
        "outputs": [{
          "pixel_depth": 16,
          "output_format": "psd"
        }]
      }
    }
  ]
}'
```
