//// [thisInModuleFunction1.ts]
module bar {
 export function bar() {
  return this;
 } 
} 
var z = bar.bar();

//// [thisInModuleFunction1.js]
var bar;
(function (bar) {
    function bar() {
        return this;
    }
    bar.bar = bar;
})(bar || (bar = {}));
var z = bar.bar();
