var async = require("async");
module.exports = function(app) {

    var sessionModel = app.models.Session;
    var buildingModel = app.models.Building;
    var officeModel = app.models.Office;
    
    var tempDate = new Date();
        tempDate.setMonth(10);
        tempDate.setDate(5);
        console.log(tempDate);

        var tempBuilding = {
            "buildingName": "Camino",
            "id": "1"
        };

        var tempOffice1 = {
            "officeName": "A",
            "buildingID": "1",
            "id": "1"
        };
        
        var tempOffice2 = {
            "officeName": "B",
            "buildingID": "1",
            "id": "2"
        };

        var tempSessions1 = {
            "officeID": "1",
            "createdDate": new Date(),
            "sessionDate": tempDate,
            "userID": "null",
            "id": "1"
        };
        
        var tempSessions2 = {
            "officeID": "1",
            "createdDate": new Date(),
            "sessionDate": tempDate,
            "userID": "null",
            "id": "2"
        };
        
        var tempHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
        
        var tempOneSessionId = ["1", "2", "3", "4", "5", "6", "7", "8"];
        
        var tempTwoSessionId = ["9", "10", "11", "12", "13", "14", "15", "16"];

        function checkBuilding(){
            buildingModel.find({
                where:{
                    id: "1"
                }
            },function(err, success){
                if(err){
                    console.log(err);
                }else{
                    if(success.length == 0){
                        buildingModel.upsert(tempBuilding);
                        checkOffice1();
                    }else{
                        checkOffice1();
                    }
                }
            })
        }
        
        function checkOffice1(){
            officeModel.find({
                where:{
                    id: "1"
                }
            },function(err, success){
                if(err){
                    console.log(err);
                }else{
                    if(success.length == 0){
                        officeModel.upsert(tempOffice1);
                        checkOffice2();
                    }else{
                        checkOffice2();
                    }
                }
            });
        }

        function checkOffice2(){
            officeModel.find({
                where:{
                    id: "2"
                }
            },function(err, success){
                if(err){
                    console.log(err);
                }else{
                    if(success.length == 0){
                        officeModel.upsert(tempOffice2);
                        checkSessions1();
                    }else{
                        checkSessions1();
                    }
                }
            });
        }
        
        function checkSessions1(){
            async.forEachOf(tempOneSessionId, function(k, indexNum, next) {
                
                tempSessions1.id = tempOneSessionId[indexNum];
                tempSessions1.sessionDate = tempDate;
                // tempSessions1.sessionDate.setHours(tempHours[indexNum], 0, 0, 0);
                console.log("test");
                
                sessionModel.find({
                    where:{
                        id: tempSessions1.id
                    }
                },function(err, success){
                    if(err){
                        
                    }else{
                        if(success.length == 0){
                            console.log("test2");
                            sessionModel.upsert(tempSessions1);
                            // console.log("hitUpsert?");
                            next();
                        }else{
                            next();
                        }
                    }
                });
            },function(err, success){
                if(err){
                    
                }else{
                    checkSessions2();
                }
            });
        }
        
        
        function checkSessions2(){
            async.forEachOf(tempTwoSessionId, function(k, indexNum, next) {
                tempSessions2.id = tempTwoSessionId[indexNum];
                tempSessions2.sessionDate = tempDate;
                tempSessions2.sessionDate.setHours(tempHours[indexNum], 0, 0, 0);
                console.log(tempSessions2.sessionDate);
                sessionModel.find({
                    where:{
                        id: tempSessions2.id
                    }
                },function(err, success){
                    if(err){
                        
                    }else{
                        if(success.length == 0){
                            sessionModel.upsert(tempSessions2);
                            next();
                        }else{
                            next();
                        }
                    }
                });
            },function(err, success){
                if(err){
                    
                }else{
                    console.log("DB set up");
                }
            });
        }
        
    // checkBuilding();
};
