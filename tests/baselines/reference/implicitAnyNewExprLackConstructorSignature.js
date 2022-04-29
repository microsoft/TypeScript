//// [implicitAnyNewExprLackConstructorSignature.ts]
function Point() { this.x = 3; }
var x: any = new Point();  // error at "new"

//// [implicitAnyNewExprLackConstructorSignature.js]
function Point() { this.x = 3; }
var x = new Point(); // error at "new"
