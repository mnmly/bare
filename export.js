const exec = require('child_process').exec
exec( "git log -p screenshot.png", (err, stdout, stderr) => {
  let chunks = stdout.split( /(^commit|\n\ncommit)/g ).filter(  ( d ) => {
    return /[a-z0-9]{40}/.test( d )
  } ).map( ( d ) => {
    let res = d.split(/\n/).filter( (d) => /gitwatch/g.test( d ) || /[a-z0-9]{40}/g.test( d ) ).map( (d ) => d.trim() )
    if ( res.length == 2 ) {
      res[ 1 ] = res[1].replace(/Scripted auto-commit on change \((\d\d\d\d\-\d\d\-\d\d\s\d\d\:\d\d\:\d\d)\) by gitwatch.sh/g, ( a, b, c) => {
        return new Date( b ).toISOString()
      })
    }
    return res
  } ).filter( ( d ) => d.length > 1 )
   chunks.forEach( (d) => {
      exec( `git show ${ d[0] }:screenshot.png > exports/${ d[1].replace(/\:/g, '') }-${ d[0].substring(0, 7) }-screenshot.png`, ( err ) => {
        console.log( err )
    })
   } )
})
