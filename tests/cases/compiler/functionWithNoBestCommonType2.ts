// @target: es2015
// @allowUnreachableCode: true

var v = function () {
   return true;
   return bar();
};

function bar(): void {
}