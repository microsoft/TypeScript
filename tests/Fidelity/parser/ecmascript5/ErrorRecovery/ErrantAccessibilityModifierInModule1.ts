module M {
    var x=10;  // variable local to this module body
    private y=x;  // property visible only in module
    export var z=y;  // property visible to any code
}