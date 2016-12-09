var async = require("async");
module.exports = function(Building) {

    Building.remoteMethod('findOffices', {
        http: {
            path: '/findOffices',
            verb: 'Post'
        },
        accepts: [{
            arg: 'buildingID',
            type: 'number',
            description: 'This is the office id to find all the sessions by'
        }, {
            arg: 'date',
            type: 'date',
            description: 'This is the date the user has selected'
        }],
        returns: {
            type: 'array',
            root: true
        }
    });

    Building.findOffices = function(buildingID, date, cb) {

        //These are the models that you are using in the call
        var officeModel = Building.app.models.Office;
        var sessionModel = Building.app.models.Session;

        //buildingID id here so if you want to use officeId in a later function you have it saved in a variable
        var offices;
        var buildingId = buildingID;
        var firstDate = date;
        var lastDate = new Date(firstDate.getTime());
        lastDate.setHours(23);

        firstDate.setHours(0,0,0,0);
       
        // /*
        // This is a basic find all find's will take the form of this
        // model.find({
        //     where:{
        //         property: property
        //     }
        // },function(err, success){
        //     if(err){
        //         cb(err)
        //     }else{
        //         do stuff here
        //     }
        // })
        // */
        officeModel.find({
            where: {
                buildingID: buildingId
            }
        }, function(err, success) {
            if (err) {
                cb(err);
            }
            else {
                offices = success;
                findSessions();
            }
        });

        function findSessions() {
            async.forEachOf(offices, function(k, indexNum, next) {
                console.log(firstDate);
                console.log(lastDate);
                sessionModel.find({
                    where: {
                        and:[
                            {officeID: offices[indexNum].id},
                            {sessionDate: {gt: firstDate}},
                            {sessionDate: {lt: lastDate}}
                            ]
                    }
                }, function(err, success) {
                    if (err) {
                        cb(err);
                    }
                    else {
                        //This should never happen this is just so it doesn't crash your backend
                        if (success.length == 0) {
                            next();
                        }
                        else {
                            offices[indexNum].sessions = success;
                            next();
                        }
                    }
                });
            }, function(err, success) {
                if (err) {
                    //this checks if there is an error in the async for loop
                    //it will return the error if there is one
                    cb(err);
                }
                else {
                    //use a cb to end the call and return what you want
                    cb(null, offices);
                }
            });
        }
    };
};
