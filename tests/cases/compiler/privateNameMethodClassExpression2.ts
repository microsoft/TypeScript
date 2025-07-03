// @strict: true
// @target: es2015
// @noEmit: true

new (class {
  #method() {
    return 42;
  }
})().#method; // error

new (class {
  #field = 42;
})().#field; // error
