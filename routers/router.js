var express = require("express");
const router=express.Router({mergeParams:true});
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

module.exports=router;





