// @allowJS: true
// @outDir: ./out
// @filename: index.js
function Foo() {}
const x = /* @type */(Foo);
/* @type */(function() {})();

const y = /* @type {} */(Foo);
/* @type {} */(function() {})();

const z = /* @type { */(Foo);
/* @type { */(function() {})();