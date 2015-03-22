//// [parserErrorRecovery_SwitchStatement2.ts]
class C {
  constructor() {
    switch (e) {

class D {
}

//// [parserErrorRecovery_SwitchStatement2.js]
var C = (function () {
    function C() {
        switch (e) {
        }
    }
    return C;
})();
var D = (function () {
    function D() {
    }
    return D;
})();
