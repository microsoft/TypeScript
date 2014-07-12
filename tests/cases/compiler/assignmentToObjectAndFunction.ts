var errObj: Object = { toString: 0 }; // Error, incompatible toString
var goodObj: Object = {
    toString(x?) {
        return "";
    }
}; // Ok, because toString is a subtype of Object's toString

var errFun: Function = {}; // Error for no call signature

function foo() { }
module foo {
    export var boom = 0;
}

var goodFundule: Function = foo; // ok

function bar() { }
module bar {
    export function apply(thisArg: string, argArray?: string) { }
}

var goodFundule2: Function = bar; // ok

function bad() { }
module bad {
    export var apply = 0;
}

var badFundule: Function = bad; // error