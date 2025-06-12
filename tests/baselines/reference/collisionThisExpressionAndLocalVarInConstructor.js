//// [tests/cases/compiler/collisionThisExpressionAndLocalVarInConstructor.ts] ////

//// [collisionThisExpressionAndLocalVarInConstructor.ts]
class class1 {
    constructor() {
        var x2 = {
            doStuff: (callback) => () => {
                var _this = 2;
                return callback(this);
            }
        }
    }
}

class class2 {
    constructor() {
        var _this = 2;
        var x2 = {
            doStuff: (callback) => () => {
                return callback(this);
            }
        }
    }
}

//// [collisionThisExpressionAndLocalVarInConstructor.js]
class class1 {
    constructor() {
        var x2 = {
            doStuff: (callback) => () => {
                var _this = 2;
                return callback(this);
            }
        };
    }
}
class class2 {
    constructor() {
        var _this = 2;
        var x2 = {
            doStuff: (callback) => () => {
                return callback(this);
            }
        };
    }
}
