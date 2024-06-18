// @checkJs: true
// @noEmit: true
// @strict: false

var fn2 = function(name) {
  fn2 = compose(this, 0, 1)
  return fn2(name)

  function compose(child, level, find) {
    if (child === find) {
      return level
    }
    return compose(child, level + 1, find)
  }
}

var d = fn2(1); // d: any
d.redefined();
