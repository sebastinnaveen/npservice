const express= require("express");
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
global.rootdir = __dirname;
var app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const auth = require('basic-auth')
const basicAuth = require('./utils/basic-auth');
const options = {
  definition: {
    info: {
      title: 'Central Platform', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['./routers/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);


app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));

const specs = swaggerJSDoc(options);
//const path=require("path");
var router=express.Router({mergeParams:true});
module.exports = app;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// use basic HTTP auth to secure the api
/*var indexRoutesw = require("./routers/keepalive");
app.use(indexRoutesw);

app.use((req, res, next) => {
  let user = auth(req)

  if (user === undefined || user['name'] !== 'admin' || user['pass'] !== 'admin123') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
    res.end('Unauthorized')
  } else {
    next()
  }
})


app.use(basicAuth);*/


var indexRoutes = require("./routers/router");
app.use(indexRoutes);

    
const port=process.env.PORT||8080;
app.listen(port, function(){
    console.log("Node js server for Test Started on Port : "+port);
 })
