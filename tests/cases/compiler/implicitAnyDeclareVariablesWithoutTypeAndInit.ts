// @noimplicitany: true
// this should be an error
var x;                   // no error, control flow typed
var y;                   // error because captured
declare var foo;         // error at "foo"
function func(k) { y };  // error at "k"
func(x);

// this shouldn't be an error
var bar = 3;            
var bar1: any;          
declare var bar2: any; 
var x1: any; var y1 = new x1;