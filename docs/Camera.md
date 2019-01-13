## Camera Variation Examples
<a href="Properties.md" >Properties Definitions</a>

### CameraRotation
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
        	"property": "Camera/View Angle",
        	"value": {
        	    "type": "vector3D",
        	    "x": 0.0,
        	    "y": 180.0,
        	    "z": 0.0
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

### CameraTransformation
Transform camera to the absolute position
```
curl -H "Authorization: Bearer $token" -H "x-api-key: $client_id" -X POST https://dncr.adobe.io/v1/render/variation -d \
'{
  "input": "https://signed-url-GET-base-dn-file....",
  "name": "variation",
  "engine_type": "lantern",
  "variations": [
    {
      "render_settings": {
        "name": "variation",
        "properties": [
          {
            "name": "setPropertyValue",
            "property": "Camera/Transform",
            "value": {
              "type": "transform",
              "tx": -300,
              "ty": 1600,
              "tz": 2000
            }
          }
        ],
        "des_path": "https://signed-url-PUT-for-render-result...",
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
