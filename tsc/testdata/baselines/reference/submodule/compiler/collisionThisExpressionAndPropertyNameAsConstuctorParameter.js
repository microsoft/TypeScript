//// [tests/cases/compiler/collisionThisExpressionAndPropertyNameAsConstuctorParameter.ts] ////

//// [collisionThisExpressionAndPropertyNameAsConstuctorParameter.ts]
class Foo2 {
    constructor(_this: number) { //Error
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}

class Foo3 {
    constructor(private _this: number) { // Error
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}   

class Foo4 {
    constructor(_this: number); // No code gen - no error
    constructor(_this: string); // No code gen - no error
    constructor(_this: any) { // Error
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}  

class Foo5 {
    constructor(_this: number); // No code gen - no error
    constructor(_this: string); // No code gen - no error
    constructor(private _this: any) { // Error
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}  

//// [collisionThisExpressionAndPropertyNameAsConstuctorParameter.js]
class Foo2 {
    constructor(_this) {
        var lambda = () => {
            return x => this;
        };
    }
}
class Foo3 {
    _this;
    constructor(_this) {
        this._this = _this;
        var lambda = () => {
            return x => this;
        };
    }
}
class Foo4 {
    constructor(_this) {
        var lambda = () => {
            return x => this;
        };
    }
}
class Foo5 {
    _this;
    constructor(_this) {
        this._this = _this;
        var lambda = () => {
            return x => this;
        };
    }
}
