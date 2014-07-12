//// [implicitAnyNewExprLackConstructorSignature.js]
function Point() {
    this.x = 3;
}
var x = new Point(); // error at "new"
