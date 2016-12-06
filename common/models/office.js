'use strict';
var async = require("async");
module.exports = function(Office) {

//   Office.remoteMethod("getSessions", {
//         http: {
//             path: "/getSessions",
//             verb: "GET"
//         },
//         description: "Join sessions to a Office",
//         //accepts  arguments
//         accepts: [{
//             arg: 'req',
//             type: 'object',
//             'http': {
//                 source: 'req'
//             }
//         }, {
//             arg: 'res',
//             type: 'object',
//             'http': {
//                 source: 'res'
//             }
//         }],
//         //we will be returning an object
//         returns: {
//             type: 'object',
//             root: true
//         }
//     });

//     Office.getSessions = function(req, res, callback) {
//         var Session = Office.app.models.Session;
        
//         Office.find(req.query.filter, function(error, response) {
//             if (error) {
//                 return callback(error);
//             }
//             async.forEachOf(response, function(index, i, next) {
//                 Session.findOne({
//                     where: {
//                         officeID: index.id
//                     }
//                 }, function(officeError, officeResponse) {
//                     if (officeError) {
//                         next(officeError);
//                     }
//                     else {
//                         response[i].sessionInfo = officeResponse;   
//                         next();
//                     }
//                 });
//             }, function(error) {
//                 if (error) {
//                     var error = new Error('async.forEach operation');
//                     error.statusCode = 500;
//                     callback(error);
//                 }
//                 else {
//                     callback(null, response);
//                 }
//             });
//         });
//     };
};


