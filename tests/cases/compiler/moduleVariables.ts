// @lib: es5
declare var console: any;
 
var x = 1;
module M {
    export var x = 2;
    console.log(x); // 2
}
 
module M {
    console.log(x); // 2
}
 
module M {
    var x = 3;
    console.log(x); // 3
}
