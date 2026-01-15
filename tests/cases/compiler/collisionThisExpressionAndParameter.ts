// @lib: es5
class Foo {
    x() {
        var _this = 10; // Local var. No this capture in x(), so no conflict.
        function inner(_this: number) { // Error 
            return x => this;   // New scope.  So should inject new _this capture into function inner
        }
    }
    y() {
        var lamda = (_this: number) => { // Error 
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    z(_this: number) { // Error 
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }

    x1() {
        var _this = 10; // Local var. No this capture in x(), so no conflict.
        function inner(_this: number) { // No Error 
        }
    }
    y1() {
        var lamda = (_this: number) => { // No Error 
        }
    }
    z1(_this: number) { // No Error 
        var lambda = () => {
        }
    }
}
class Foo1 {
    constructor(_this: number) { // Error
        var x2 = {
            doStuff: (callback) => () => {
                return callback(this);
            }
        }
    }
}
declare var console: {
    log(msg: any);
}

function f1(_this: number) {
    x => { console.log(this.x); };
}

declare class Foo2 {
    constructor(_this: number); // no error - no code gen
    z(_this: number); // no error - no code gen
}
declare function f2(_this: number); // no error

class Foo3 {
    constructor(_this: string); // no code gen - no error
    constructor(_this: number); // no code gen - no error
    constructor(_this: any) { // Error
        var x2 = {
            doStuff: (callback) => () => {
                return callback(this);
            }
        }
    }

    z(_this: string); // no code gen - no error
    z(_this: number); // no code gen - no error
    z(_this: any) { // Error 
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}
declare var console: {
    log(msg: any);
}

function f3(_this: number); // no code gen - no error
function f3(_this: string); // no code gen - no error
function f3(_this: any) {
    x => { console.log(this.x); };
}

declare class Foo4 {
    constructor(_this: string); // no code gen - no error
    constructor(_this: number); // no code gen - no error
    z(_this: string); // no code gen - no error
    z(_this: number); // no code gen - no error
}

declare function f4(_this: number); // no code gen - no error
declare function f4(_this: string); // no code gen - no error