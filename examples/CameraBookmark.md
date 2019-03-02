## Camera Variation Examples
<a href="Properties.md" >Properties Definitions</a>

### CameraRotation
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
       "bookmark_path": "/scenes/scene/render_camera_n3d4",
       "properties": [
          {
            "name": "setPropertyValue",
            "property": "Scene/Beverage Can/Can/Materials/Can Material/Base Color",
            "value": {
              "type": "image",
              "file": "https://signed-url-GET-variation-image..."
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
