# Adobe Dimension Cloud Rendering API
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Adobe Dimension Cloud Rendering API](#adobe-dimension-cloud-rendering-api)
- [Examples](#examples)
- [Getting Started](#getting-started)
	- [Credentials](#credentials)
	- [Workflow Automation Render](#workflow-automation-render)
		- [Example Request](#example-request)
		- [Example Output](#example-output)
		- [Parameters Details](#parameters-details)
	- [Check status of renders](#check-status-of-renders)
- [Example App Quick Start](#example-app-quick-start)
	- [Requirements](#requirements)
		- [Render Variation API - POST](#render-variation-api-post)
			- [Request syntax](#request-syntax)
			- [Required Headers](#required-headers)
			- [Response syntax](#response-syntax)
			- [Examples](#examples)
		- [Render Status - GET](#render-status-get)
			- [Request syntax](#request-syntax)
			- [Required Headers](#required-headers)
			- [Render status](#render-status)
			- [Response syntax](#response-syntax)
			- [Examples](#examples)

<!-- /TOC -->
# Examples
<ul>
	<li>
		<a href="examples/Background.md">Background Examples</a>
	</li>
	<li>
		<a href="examples/Camera.md">Camera Examples</a>
	</li>
	<li>
		<a href="examples/Dn-To-GLB.md">Dn-To-GLB Example</a>
	</li>
	<li>
		<a href="examples/Layer-Visibility.md">Layer-Visibility Examples</a>
	</li>
	<li>
		<a href="examples/Materials.md">Materials/Texture Examples</a>
	</li>
	<li>
		<a href="examples/Mesh-Transformation.md">Mesh Transformation Examples</a>
	</li>
</ul>

# Getting Started
## Credentials
TBD

## Workflow Automation Render
Using the token generated with the credentials process, substitute `$token` and `$client_id` with your token and client_id.

### Example Request
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

### Example Output
```
{
  "id": [
    "2c575577-30d6-4eb3-b7e5-988c94783f41"
  ]
}

### Parameters Details

| Field | Type | Description |
| ----- | ---- | ----------- |
| input | string | A signed url where Adobe DnCR can download the base dn file.  This could be a AWS S3 presigned URL, Microsoft Azure Blob Storage Shared Access Signature URL, or a public url |
| name | string | This is free formed, can be anything you want. |
| variations | array | holds the render_settings and desired output format |
| variations[].render_settings | hashmap | holds the properties for the render variation a user wants to produce |
| variations[].render_settings.name | string | This is free formed, can be anything you want. |
| variations[].render_settings.properties | array | holds the properties that you want to change in the base dn file |
| variations[].render_settings.properties[].name | string | right now, it only supports `setPropertyValue`.  Other values TBD |
| variations[].render_settings.properties[].property | string | The identifier of the element you would like to replace.  The identifier format is as follows `Scene/GROUP_NAME/NAME/PROPERTY/PROPERTY_TYPE/PROPERTY` or if your model is not part of a group `Scene/NAME/PROPERTY/PROPERTY_TYPE/PROPERTY` <br /><a href="examples/Materials.md">Materials Examples</a> or <a href="examples/Camera.md">Camera Examples</a>  |
| variations[].render_settings.properties[].value | hashmap | Properties of the variation asset and location of the asset |
| variations[].render_settings.properties[].value.type | string | Current only supports `image`, `color`, `vector2D`, `vector3D`, `transform` |
| variations[].render_settings.properties[].value.file | string | The Adobe Illustrator design to apply to the input model |
| variations[].render_settings.return_url | string | The AWS S3 Pre-signed URL for the rendered output to be sent |
| variations[].render_settings.preset | string | Render quality.  Allowed values `preset-low`, `preset-medium`, or `preset-high` |
| variations[].render_settings.outputs | array | information about the desired pixel/color depth and file format |
| variations[].render_settings.outputs[].pixel_depth | integer | The color depth of the rendered image. Allowed values `8`, `16`, or `32`.  Note, 32-bit pixel depth is only valid for `psd` |
| variations[].render_settings.outputs[].output_format | string | The format of the output file.  Allowed values `png` or `psd` |

## Check status of renders
A request to render will return a list of job ids.  To check on the status, make the following call
```
curl -H "Authorization: Bearer $token" -H "x-api-key: $client_id" -X GET https://dncr.adobe.io/v1/render/<JOB_ID>
```
Example Request
```
curl -H "Authorization: Bearer $token" -H "x-api-key: $client_id" -X GET https://dncr.adobe.io/v1/render/2c575577-30d6-4eb3-b7e5-988c94783f41
```
Example output
```
{
  "outputs": [
    {
      "pixel_depth": 16,
      "output_format": "psd"
    }
  ],
  "is_internal_user": false,
  "render_size": 1934350,
  "start_time": 1541125333794,
  "output_format": "psd",
  "end_time": 1541125384097,
  "name": "test-variation-name",
  "pixel_depth": 16,
  "user_id": "test-user",
  "render_status_percentage": 100,
  "file_size": 12461228,
  "input": "https://s3-us-west-2.amazonaws.com/di3d-jotran-bucket/in.dn",
  "variations": [
    {
      "render_settings": {
        "name": "test-variation-name",
        "outputs": [
          {
            "pixel_depth": 16,
            "output_format": "psd"
          }
        ],
        "return_url": "https://signed-url-PUT-for-render-result...",
        "preset": "preset-low",
        "properties": [
          {
            "name": "setPropertyValue",
            "property": "Scene/Coke Can/Materials/Label/Base Color",
            "value": {
              "type": "image",
              "file": "https://signed-url-GET-variation-image..."
            }
          }
        ]
      }
    }
  ],
  "preset": "preset-low",
  "id": "2c575577-30d6-4eb3-b7e5-988c94783f41",
  "render_status": "complete",
}
```

# Example App Quick Start
For a quick start to experience what the DnCR API can achieve, an example app is included in this repository.  

## Requirements
* AWS S3 Bucket -  For more information on how to create an AWS S3 bucket click <a href="https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html">here</a>
* AWS Credentials - For more information on AWS credential click <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html">here</a>
* Node.js Version 8 or 10.  Recommended version 8. https://nodejs.org/en/download/

The example files can be found in `assets/` directory if you would like to inspect.  The quick start app will use `base.dn` in the `assets/` directory and apply different materials (`black.psd`, `blue.psd`, `green.psd`, `red.psd`, `yellow.psd`) to the base model.
```
npm install
//Replace with BUCKET, USERNAME, PASSWORD and REGION with your own

//variation with black label
node scripts/app.js --bucket BUCKET --region REGION --username USERNAME --password PASSWORD --example black

//variation with green label
node scripts/app.js --bucket BUCKET --region REGION --username USERNAME --password PASSWORD --example green

//variation with blue label
node scripts/app.js --bucket BUCKET --region REGION --username USERNAME --password PASSWORD --example blue

//variation with green label
node scripts/app.js --bucket BUCKET --region REGION --username USERNAME --password PASSWORD --example green

//variation with red label
node scripts/app.js --bucket BUCKET --region REGION --username USERNAME --password PASSWORD --example red

//Example
node scripts/app.js --bucket adobe-bucket --region us-east-1 --username adobe-user --password MyPassword --example black

```

### Render Variation API - POST
Submits a job for cloud rendering
#### Request syntax
```
Request Method: POST
Authorization required: token
x-api-key required: client_id
Endpoint: /v1/render/variation
```
#### Required Headers
```
x-api-key: client_id
Authorization: Bearer $token
```
#### Response syntax
<ul>
	<li>
		A success response has status HTTP 200 (OK) and returns list of job ids.
	</li>
	<li>
		A failure response has status HTTP 401 (Unauthorized) and returns JSON-formatted error information in the response body. The call fails if the username or password that authorizes the request is not present or is not valid.
	</li>
</ul>

#### Examples
Request
```
POST /v1/render/variation HTTP/2
x-api-key: $client_id
Authorization: Bearer $token
{
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
}
```
[Link To Paramter Details](#parameter-details)

Response
```
{
  "id": [
    "2c575577-30d6-4eb3-b7e5-988c94783f41"
  ]
}
```

### Render Status - GET
Check status for a render

#### Request syntax
```
Request Method: GET
Authorization required: token
x-api-key required: client_id
Endpoint: /v1/render/<job_id>
```
#### Required Headers
```
x-api-key: client_id
Authorization: Bearer $token
```

#### Render status
<ui>
	<li>pending - submitted to dncr, waiting for job to be picked up</li>
	<li>start_conversion - converter service has picked up the job</li>
	<li>pull_dcx - pull dcx component from CCFiles</li>
	<li>downloading - download files</li>
	<li>uncompressing - extract files</li>
	<li>rendering - render the scene</li>
	<li>uploading - upload the rendered image to CCFiles and external URL</li>
	<li>complete - render has completed</li>
	<li>error - render has errored</li>
</ui>

#### Response syntax
<ul>
	<li>
		A success response has status HTTP 200 (OK) and returns information about the render progress
	</li>
	<li>
		A failure response has status HTTP 401 (Unauthorized) and returns JSON-formatted error information in the response body. The call fails if the username or password that authorizes the request is not present or is not valid.
	</li>
</ul>

#### Examples
Request
```
GET /v1/render/2c575577-30d6-4eb3-b7e5-988c94783f41 HTTP/2
x-api-key: $client_id
Authorization: Bearer $token
```
Response
```
{
  "outputs": [
    {
      "pixel_depth": 16,
      "output_format": "psd"
    }
  ],
  "is_internal_user": false,
  "render_size": 1934350,
  "start_time": 1541125333794,
  "output_format": "psd",
  "end_time": 1541125384097,
  "name": "test-variation-name",
  "pixel_depth": 16,
  "user_id": "test-user",
  "render_status_percentage": 100,
  "file_size": 12461228,
  "input": "https://s3-us-west-2.amazonaws.com/di3d-jotran-bucket/in.dn",
  "variations": [
    {
      "render_settings": {
        "name": "test-variation-name",
        "outputs": [
          {
            "pixel_depth": 16,
            "output_format": "psd"
          }
        ],
        "return_url": "https://signed-url-PUT-for-render-result...",
        "preset": "preset-low",
        "properties": [
          {
            "name": "setPropertyValue",
            "property": "Scene/Coke Can/Materials/Label/Base Color",
            "value": {
              "type": "image",
              "file": "https://signed-url-GET-variation-image..."
            }
          }
        ]
      }
    }
  ],
  "preset": "preset-low",
  "id": "2c575577-30d6-4eb3-b7e5-988c94783f41",
  "render_status": "complete",
}
```
