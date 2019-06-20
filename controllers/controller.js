var npService = require(rootdir+'/services/npservice.js');

var finalObject={};
finalObject.getDashboard = async function(req,res,next){
    try {
              responsedata = [{"message":"Service Started"}];
        res.status(200).json(responsedata);
    } catch (error) {
        res.send(error);
    }
};

finalObject.neuralprocess = async function(req,res,next){
    //console.log(req.body)
    var searchStr = req.body.searchStr;
    try {
       var result = await npService.doNP(searchStr);
       res.status(200).json({"message":result});
    } catch (error) {
        res.send(error);
    }
   // res.send("err");
};


module.exports=finalObject; 
