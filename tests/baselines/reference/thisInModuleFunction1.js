//// [thisInModuleFunction1.ts]
module bar {
 export function bar() {
  return this;
 } 
} 
var z = bar.bar();

//// [thisInModuleFunction1.js]
var bar;
(function (_bar) {
    function bar() {
        return this;
    }
    _bar.bar = bar;
})(bar || (bar = {}));
var z = bar.bar();
