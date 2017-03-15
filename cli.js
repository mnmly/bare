#!/usr/bin/env node

let destination = process.env.PWD
let port = process.env.BARE_PORT || 3030

require( './index' )( port, destination )
