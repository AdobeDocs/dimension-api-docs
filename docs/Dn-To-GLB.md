
# Adobe Dimension Conversion Server - Convert DN to GLB
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Adobe Dimension Conversion Server - Convert DN to GLB](#adobe-dimension-conversion-server-convert-dn-to-glb)
	- [Client Storage Workflow](#client-storage-workflow)
		- [Step 1 - Login](#step-1-login)
		- [Step 2 - Generate presinged URLs](#step-2-generate-presinged-urls)
		- [Step 3 - Trigger conversion](#step-3-trigger-conversion)
		- [Step 4 - Check Status](#step-4-check-status)
	- [Upload Method Workflow](#upload-method-workflow)
		- [Step 1 - Login](#step-1-login)
		- [Step 2 - Upload Dimension .dn file](#step-2-upload-dimension-dn-file)
		- [Step 3 - Trigger conversion](#step-3-trigger-conversion)
		- [Step 4 - Check Status](#step-4-check-status)

<!-- /TOC -->

## Client Storage Workflow

### Step 1 - Login
For this initial implementation, clients will be client-id, username and password.  The client-id, username and password will be used to acquire a token that will be used in all other calls.  Please contact Adobe Product and Program Managers to obtain credentials.

```
curl -H "x-api-key: CLIENT_ID" -X GET https://felicity-api.adobedice.com/login -H 'username: USERNAME' -H 'password: PASSWORD'
```
The token
<ul>
  <li>Is JWT format</li>
  <li>Expires after 1 hour</li>
  <li>The token will be used for all other API</li>
</ul>

### Step 2 - Generate presinged URLs
Adobe Dimension Conversion Service support AWS S3 Presigned URL and Dropbox Temporary links.  Other presigned URLs have not been tested.

### Step 3 - Trigger conversion
```
curl -X POST -H "Content-Type: application/json" -H "x-api-key: CLIENT_ID" -H "Authorization: Bearer $token" -d '{
  "src_path": "PRESIGNED_URL_WITH_GET_PERMISSION_THAT_YOU_GENERATE",
  "output_path": "PRESIGNED_URL_WITH_PUT_PERMISSION_THAT_YOU_GENERATE",
  "filename": "test3.dn",
  "is_compressed": false,
  "storage_type": "s3",
  "output_format": [
    "glb"
  ]
}' https://dncr.adobe.io/v1/convert

```
### Step 4 - Check Status
```
curl -X GET -H "x-api-key: CLIENT_ID" -H "authorization: Bearer $token" 'https://dncr.adobe.io/v1/convert/fe21db0b-ffe0-4a8c-9464-ecda076e05e6'
```

## Upload Method Workflow
### Step 1 - Login
For this initial implementation, clients will be client-id, username and password.  The client-id, username and password will be used to acquire a token that will be used in all other calls.  Please contact Adobe Product and Program Managers to obtain credentials.

```
curl -H "x-api-key: CLIENT_ID" -X GET https://felicity-api.adobedice.com/login -H 'username: USERNAME' -H 'password: PASSWORD'
```
The token
<ul>
  <li>Is JWT format</li>
  <li>Expires after 1 hour</li>
  <li>The token will be used for all other API</li>
</ul>

### Step 2 - Upload Dimension .dn file
The upload process is a 2 step process.  First, you will need to obtain a S3 signed URL from the conversion
```
export token=<the token obtained in step 1>
curl -H "Authorization: Bearer $token" -H "x-api-key: CLIENT_ID" -X GET  https://dncr.adobe.io/v1/upload

##will return some thing like this
{
  "url": "https://di3d-felicity-stage-us-east-1.s3-accelerate.amazonaws.com/uploads/8eaceedf-ed54-4345-91bb-edc658b13c97...",
  "upload_path": "uploads/74a82fca-0e2b-4d2c-9b0d-1ca6ff02ef09"
}
```
<ul>
  <li>
    url - the s3 presigned URL you will be using to upload the .DN file
  </li>
  <li>
    upload_path - the upload path you will be sending to GLB conversion API.  This is used by service to find where you have uploaded the .DN (example of where it is used is seen on next steps)
  </li>
  <li>
  Now that we have the presigned URL, we can upload the ASD
  </li>
</ul>

Now that we have the presigned URL, we can upload the ASD
```
curl --upload-file hook.dn '<PRESIGNED_URL_FROM_CONVERSION_SERVICE>'
```

### Step 3 - Trigger conversion
To trigger the conversion job, you must first generate an presigned url, can be from AWS S3 or Dropbox (use s3 as `storage_type` for Dropbox).

Convert API
```
curl -H "Authorization: Bearer $token" -H "x-api-key: CLIENT_ID" -H 'Content-Type: application/json' https://dncr.adobe.io/v1/convert -X POST -d '{
  "src_path": "uploads/74a82fca-0e2b-4d2c-9b0d-1ca6ff02ef09",
  "output_path": "YOUR_GENERATED_PRESIGNED_URL",
  "filename": "hook.dn",
  "is_compressed": false,
  "storage_type": "s3",
  "output_format": [ "glb" ]
}'
```
Fields used in conversion api call
<ul>
  <li>
    is_compressed -  is a query parameter that tells Conversion Service if the Dn is compressed, we will use false for this example.
  </li>
  <li>
    src_path -  is the upload_path field returned from making the upload call (Step 2)
  </li>
  <li>
    filename - is the name of the file you uploaded.  in this case, it is hook.dn.  
  </li>
  <li>
    is_compressed - instructions to the conversion service to decompress the dn file.  
  </li>
  <li>
    output_path - This will be the a presigned URL that the client generates (not the Conversion Service).  Conversion Service will use this presigned url to upload the GLB to destination storage.   
  </li>
</ul>


If the convert api call is successful, you'll get the following output to obtain the job id.  The job id will be used to track progress and obtain information about the job

```
{"id":"fe21db0b-ffe0-4a8c-9464-ecda076e05e6"}
```
### Step 4 - Check Status
```
curl -X GET -H "x-api-key: CLIENT_ID" -H "authorization: Bearer $token" 'https://dncr.adobe.io/v1/convert/fe21db0b-ffe0-4a8c-9464-ecda076e05e6'
```
