let fiw = function (module) {
  return require('./' + module)
}

let proxy = new Proxy(fiw, {
  get: function(target, module) {
    return require('./' + module)
  }
})

module.exports = proxy