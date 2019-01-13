var request = require('request');

function generateBody(baseDNURL, variationURL, outputURL){
  let payload = {
    "input": baseDNURL,
    "name": "test-variation",
    "variations": [
      {
        "render_settings": {
          "name": "test-variation-name",
          "properties": [
            {
              "name": "setPropertyValue",
              "property": "Scene/Beverage Can/Can/Materials/Can Material/Base Color",
              "value": {
                "type": "image",
                "file": variationURL
              }
            }
          ],
          "return_url": outputURL,
          "preset": "preset-low",
          "outputs": [
            {
              "pixel_depth": 16,
              "output_format": "png"
            }
          ]
        }
      }
    ]
  }
  return payload;
}

function submitRenderVariation(url, token, baseDnURL, variationURL, outputURL, next){
  let body = generateBody(baseDnURL, variationURL, outputURL)
  let options = {
    url: url,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: body,
    json: true
  }
  request(options, (err, res, body) => {
    if(err || res.statusCode >= 400){
      next(err || res.statusCode)
    }else{
      next(null, body)
    }
  })
}

exports.submitRenderVariation = submitRenderVariation;
