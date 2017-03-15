const xhr = require('xhr')

module.exports = ( obj, done, opt ) => {

  opt = opt || {}
  opt.port = opt.port || 3030
  opt.name = opt.name || 'screenshot'

  done = done || function() {}

  let canvas = obj
  if ( obj._gl ) {
    canvas = obj._gl.canvas
  }

  if ( !( canvas instanceof HTMLCanvasElement) ) console.error( 'Invalid element' )

  let out = canvas.toDataURL( 'image/png' )

  xhr.post({
      body: JSON.stringify({ img: out, name: opt.name }),
      uri: `//${window.location.hostname}:${opt.port}/`,
      headers: { "Content-Type": "application/json" }
  }, done )
}
