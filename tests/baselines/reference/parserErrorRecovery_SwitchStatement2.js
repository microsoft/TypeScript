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
        var D = (function () {
            function D() {
            }
            return D;
        }());
    }
    return C;
}());
