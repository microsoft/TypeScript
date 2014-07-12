//@module: amd
export var a = 1;
class c5 { public foo() { } }
module c5 { } // bug made this an error only in external modules, should be ok everywhere