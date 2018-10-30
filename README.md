[![npm version](https://badge.fury.io/js/wit.ai-http-api.svg)](https://badge.fury.io/js/wit.ai-http-api)
--
[![NPM](https://nodei.co/npm/wit.ai-http-api.png)](https://nodei.co/npm/wit.ai-http-api/)
# wit.ai-http-api
A promise / callback API for the NLP platform wit.ai.

This library is aimed at people, which try to automate the creation and deployment of a wit.ai application.


## Installation
`npm i --save wit.ai-http-api`

## Usage
###Initialization
```javascript
let WitAi = require('wit.ai-http-api');
let wit = new WitAi(process.env.WIT_TOKEN);
```

##Calllback Style
###Creating an app
```javascript
let params = {name: 'MyAwesomeApp', lang: 'en', private: 'true', desc: 'Test'};
wit.apps.postApp(params, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
    /**
    * data will contain an object like this:
    * {
    *   "access_token" : "NEW_ACCESS_TOKEN",
    *   "app_id" : "NEW_APP_ID"
    * }
    */
  }
})
```
##Promise support
This library supports native promises.
###Creating an app
```javascript
let params = {name: 'MyAwesomeApp', lang: 'en', private: 'true', desc: 'Test'};
try {
  let result = await wit.apps.postApp(params);
} catch (e) {
  throw e;
}
```

##Parameters
Currently the needed parameters are not documented.
Please refer to the official [Wit.ai HTTP API](https://wit.ai/docs/http/20170307) documentation.

##Contributing
Contributions are highly appreciated.
Please make sure your contribution align with the eslint standards in this project.
If you feel like your code belongs in the master, feel free to submit a 
[pull request](https://github.com/Nop0x/wit.ai-http-api/pulls).

##Issues
In case of issues, submit a [Github Issue here](https://github.com/Nop0x/wit.ai-http-api/issues).
