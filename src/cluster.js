// 'use strict';

require('babel-core/register')({
     presets: ["react"],
      "plugins": [
		  "dynamic-import-node",
		  "transform-object-rest-spread",
	  ]
});

const cluster = require('cluster'); 
const app = require("./server.js");

const env = process.env.NODE_ENV || 'production';
const serverEnv = process.env.configs || 'production';

if (cluster.isMaster) {  
    let cpus = require('os').cpus().length;
    console.log("Total Cpus:", cpus);

    for (let i = 0; i < cpus; i += 1) {

    	if ((env == 'dev' || serverEnv == 'local') && i > 0) {
    		break;
    	}

        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker) {

        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

} else {

   	app();

    console.log(`worker ${cluster.worker.id} started...`);

}
