var finalObject={};
finalObject.getDashboard = async function(req,res,next){
    try {
              responsedata = [{"organization":"RIL","description":"Central Platform R-Fabric microservice and DevSecOps framework","title":"Central Platform","version":"1.0.0"}];
        res.status(200).json(responsedata);
    } catch (error) {
        res.send(error);
    }
};


module.exports=finalObject; 
