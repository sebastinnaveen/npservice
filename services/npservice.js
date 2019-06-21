var fbService = require(rootdir+'/services/firebaseservice.js');
var stringSimilarity = require('string-similarity');
var _ = require('lodash');
const axios = require('axios');
var parRate = 0.4;
const apiurl = 'https://instbotrpa.appspot.com/instbot/getnlpwords'

function saveData(data){
    fbService.insertData('/words', data, function(status){
        console.log(status);
    });
}

function saveNPData(words, callBack){
    var npArrData = [];
    var npData = {
        id:0,
        status: 'pending',
        words:words
    }
    fbService.getData('/npwords', function(res){
         
        if(res){
           npArrData = _.clone(res);
           var max = _.maxBy(res, 'id');
           npData.id = max.id + 1;
           npArrData.push(npData);
           fbService.updateData('/npwords', npArrData, function(res){
                callBack(npData.id);
            });
        }else{
            npData.id=1;
            npArrData.push(npData);
            fbService.insertData('/npwords', npArrData, function(res){
                callBack(npData.id);
            });
        }
        
        
    });
}
module.exports = {
    doNP: async function(str){
        var data = [];
        var words;
        var sendApproval = false;
        fbService.getData('/words', function(jsonResponse){
            if(jsonResponse)
           {
            //console.log(jsonResponse)
            
                var res = stringSimilarity.findBestMatch(str, jsonResponse);	
                var matched =  _.filter(res.ratings, function(o) { return o.rating > parRate });
                if(matched.length >= 2){
                    words = _.map(matched, 'target');
                    var newWords =  _.difference(jsonResponse, words);
                    data = _.clone(newWords);
                    sendApproval = true;
                }else{
                    jsonResponse.push(str);
                    data = _.clone(jsonResponse);
                }

                fbService.deleteData('/words', function(status){
                    if(status){
                        setTimeout(function () {
                            saveData(data);
                            if(sendApproval){
                                var npWords = _.clone(words);
                                npWords.push(str);
                               saveNPData(npWords, function(id){
                                console.log(id);
                                axios.post(apiurl, {
                                    approvalId: id                                    
                                  })
                                  .then(function (response) {
                                    //console.log(response);
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                  });
                               });
                                
                            }
                          }, 1000)
                        
                    }
                });

           }else{
            console.log('notnull')
               data.push(str);
                saveData(data);
           }
            
           return 'success';

				
        });
    }
}