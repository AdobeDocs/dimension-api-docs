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
       "bookmark_path": "/scenes/scene/render_camera_n3d4"
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
