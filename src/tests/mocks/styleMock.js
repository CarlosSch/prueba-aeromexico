const proxy = new Proxy(
  {},
  {
    get: (_target, prop) => {
      if (prop === '__esModule') return true;
      if (prop === 'default') return proxy;
      return prop;
    },
  }
);

module.exports = proxy;
module.exports.default = proxy;
module.exports.__esModule = true;
