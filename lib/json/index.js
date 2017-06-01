let fs = require('fs')
let path = require('path')

let minify = require('./minify')

function readFile (file) {
  if(!file.match(/.+\.json$/i)) {
    file += '.json'
  }
  file = path.normalize(file)
  //console.debug('file:', file);
  if(fs.exists(file)) {
    var st = fs.stat(file)
    if(st && st.isFile()) {
      var buff = fs.readFile(file)
      if(buff) {
        var str = buff.toString('UTF-8')
        if(str && str.length>1) {
          return JSON.parse(minify(str))
        }
      }
    }
  }
  return null
}

module.exports = {
  readFile,
  minify
}