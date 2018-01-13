let fiw = function (module) {
  try {
    return require('./' + module)
  } catch (e) {
    console.error('import module:', module, 'error!')
    throw e
  }
}

let proxy = new Proxy(fiw, {
  get: function(target, module) {
    return fiw(module)
  }
})

module.exports = proxy