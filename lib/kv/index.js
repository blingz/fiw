let util = {
  isFunction: fn => {return typeof fn === 'function' },
  isObject: o => { return typeof o === "object" && o }
}

function KV(origin) {

  let handlers = {
    get: k => { return Reflect.get(store, k, proxy) },
    set: (k,v) => { },
    has: k => { return Reflect.has(store, k) },
    reload: k => { }
  }
  
  let store = {
    get: (key, defaultValue) => {
      if(util.isFunction(defaultValue)) {
        return defaultValue(proxy[key])
      }else {
        var val = proxy[key]
        return (val!==null && val!==undefined) ? val : (defaultValue!==undefined?defaultValue:val)
      }
    },
    set: (key, value) => { key && (proxy[key] = value) },
    has: key => { return key in proxy },
    reload: key => {
      if(key) {
        handlers.reload(key)
      }else {
        for(var k in proxy) {
          handlers.reload(k)
        }
      }
    }
  }

  let hideKeys = {}
  for(var k in store) {
    hideKeys[k] = true
  }

  let proxy = new Proxy(store, {
    get: function(target, key) {
      //console.debug('proxy-get:', key)
      return hideKeys[key] ? target[key] : handlers.get(key)
    },
    set: function(target, key, value) {
      //console.debug('proxy-set:', key, value)
      if (hideKeys[key]) {
        return false
      }
      handlers.set(key, value)
      target[key] = value
      return true;
    },
    has (target, key) {
      //console.debug('proxy-has:', key)
      return hideKeys[key]? false : handlers.has(key)
    },
    ownKeys(target) {
      //console.debug('proxy-ownKeys ...')
      return Reflect.ownKeys(target).filter((key) => !hideKeys[key])
    },
    getOwnPropertyDescriptor(target, key) {
      //console.debug('proxy-getOwnPropertyDescriptor:', key)
      return hideKeys[key] ? undefined : Reflect.getOwnPropertyDescriptor(target, key)
    }
  })

  if(util.isObject(origin)) {
    for(var k in origin) {
      if(handlers.has(k) && util.isFunction(origin[k])) {
        handlers[k] = origin[k]
      }else {
        proxy[k] = origin[k]
      }
    }
    //console.debug('handlers:', handlers, origin)
  }

  return proxy
}

module.exports = KV