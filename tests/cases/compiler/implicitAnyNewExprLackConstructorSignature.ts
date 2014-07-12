//@noimplicitany: true
function Point() { this.x = 3; }
var x: any = new Point();  // error at "new"