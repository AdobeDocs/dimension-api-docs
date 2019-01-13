var request = require('request');

function getToken(url, username, password, next){
  let options = {
    url: url,
    method: 'GET',
    headers: {
      username: username,
      password: password
    }
  }

  request(options, (err, res, body) => {
    if(err || res.statusCode >= 400){
      next(err || res.statusCode)
    }else{
      next(null, JSON.parse(body))
    }
  })
}

exports.getToken = getToken
