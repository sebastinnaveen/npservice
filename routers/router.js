var express = require("express");
var router = express.Router();
var controller = require(rootdir+'/controllers/controller'); 
/**
 * @swagger
 * /dashboard:
 *   get:
 *     description: Sample Data
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: dashboard
*/
router.get("/dashboard",async function(req,res,next){
    await controller.getDashboard(req,res,next);
});



router.post("/np",async function(req,res,next){
    //console.log(req.body);
    await controller.neuralprocess(req,res,next);
});

module.exports=router;





