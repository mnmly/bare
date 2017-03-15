const fs = require( 'fs' )
const http = require('http')
const connect = require('connect')
const bodyParser = require('body-parser');

module.exports = run

function run( port, destination ) {

  const app = connect()

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.use(function(req, res){

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if ( req.body.img ) {
      const base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(`${destination}/${req.body.name || 'screenshot'}.png`, base64Data, 'base64', function(err) {
        err && console.log(err);
      });
    }
    res.end('');
  });

  http.createServer(app).listen( port, () => {
    console.log( `bare-server is running at ${ port }` );
  } )

}


if (require.main === module) {
  let destination = process.env.PWD
  let port = process.env.BARE_PORT || 3030
  run( port, destination )
}
