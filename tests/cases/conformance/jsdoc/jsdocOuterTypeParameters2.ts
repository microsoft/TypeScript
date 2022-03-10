// @checkjs: true
// @filename: jsdocOuterTypeParameters1.js
/** @return {T} */
const dedupingMixin = function(mixin) {};

 /** @template T */
const PropertyAccessors = dedupingMixin(() => {
  class Bar {
    static bar() { this.prototype.foo(); }
  }
});

