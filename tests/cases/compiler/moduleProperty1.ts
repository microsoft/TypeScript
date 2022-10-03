module M {
    var x=10;  // variable local to this module body
    var y=x;  // property visible only in module
    export var z=y;  // property visible to any code
}

module M2 {
    var x = 10;  // variable local to this module body
    private y = x;  // can't use private in modules
    export var z = y;  // property visible to any code
}