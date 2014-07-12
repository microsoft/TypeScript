module A {
    export var x = 'hello world'
    var y = 12;
}


var x: string;
var x = A.x;

// Error, since y is not exported
var y = A.y;
