/**
 * @LoggerService
 * custom logger providing wrapper around winston
 */

var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({'level': process.env.LOG_LEVEL || 'debug' })
    ]
});

var customLogger = Object.create(logger);

customLogger.info = function(obj) {
    if(process.env.NODE_ENV != "test") {
       console.log('\n');
       logger.info.apply(this, arguments); 
    }   
}

module.exports = customLogger;
