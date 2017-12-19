var restify = require('restify');
var query = require('./libs/mysql.js');
var Image = require('./models/images.js');
var server_config = require('./configs/config.js').server;
var promise = new Promise(function () {
  console.log('ok')
});
var image_path = "images";

// db.getConnection(function (connection) {
//   connection.beginTransaction(function (err) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//   })
// })

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

function findImage(req, res, next) {
  var model_name = req.path().split('/')[1];
  query('SELECT * FROM ' + model_name + ' WHERE id=' + req.params.imageId, [1], function (err, results, fields) {
    // console.log(results[0].hex)
    res.send(results[0].hex)

  });
  // console.log(model_name)
  // console.log(req.params.imageId);
  next();
}

function InsertImage(req, res, next) {
  var model_name = req.path().split('/')[1];
  console.log(req.params)
}

var server = restify.createServer();

server.pre(function (req, res, next) {
  res.charSet('utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  return next();
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

// server.get({ path: image_path, version: '0.0.1' }, findAllImage);
server.get({ path: image_path + '/:imageId', version: '0.0.1' }, findImage);
server.post({ path: image_path, version: '0.0.1' }, InsertImage);



server.listen(server_config.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});