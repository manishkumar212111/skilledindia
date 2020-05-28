let configs = {};
if(process && process.env && process.env.configs){
    configs = require('../../conf-'+process.env.configs).default;
} else{
    configs = require('../../conf-local').default;
}

export default configs;