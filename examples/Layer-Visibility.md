## Layer Visibility Examples
<a href="Properties.md" >Properties Definitions</a>
### Example of make one layer visible and invisible

```
curl -H "Authorization: Bearer $token" -H "x-api-key: $client_id" -X POST -v https://dncr.adobe.io/v1/render/variation -d \
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
            "property": "Scene/SomeLayerMakeVisible",
            "value": true
          },
          {
            "name": "setPropertyValue",
            "property": "Scene/SomeLayerHide",
            "value": false
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
