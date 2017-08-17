//// [parserErrorRecovery_SwitchStatement2.ts]
class C {
  constructor() {
    switch (e) {

class D {
}

//// [parserErrorRecovery_SwitchStatement2.js]
var C = /** @class */ (function () {
    function C() {
        switch (e) {
        }
        var D = /** @class */ (function () {
            function D() {
            }
            return D;
        }());
    }
    return C;
}());
