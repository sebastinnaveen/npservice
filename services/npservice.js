var fbService = require(rootdir+'/services/firebaseservice.js');
var stringSimilarity = require('string-similarity');
var _ = require('lodash');
var parRate = 0.4;

function saveData(data){
    fbService.insertData('/words', data, function(status){
        console.log(status);
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
            console.log(jsonResponse)
            
                var res = stringSimilarity.findBestMatch(str, jsonResponse);	
                var matched =  _.filter(res.ratings, function(o) { return o.rating > parRate });
                if(matched.length >= 2){
                    words = _.map(matched, 'target');
                    var newWords =  _.difference(jsonResponse, words);
                    data = _.clone(newWords);
                }else{
                    jsonResponse.push(str);
                    data = _.clone(jsonResponse);
                }

                fbService.deleteData('/words', function(status){
                    if(status){
                        setTimeout(function () {
                            saveData(data);
                            if(sendApproval){
                                console.log(words);
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