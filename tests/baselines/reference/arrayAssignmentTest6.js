//// [arrayAssignmentTest6.ts]
module Test {
    interface IState {
    }
    interface IToken {
        startIndex: number;
    }
    interface ILineTokens {
        tokens: IToken[];
        endState: IState;
    }
    interface IMode {
        tokenize(line:string, state:IState, includeStates:boolean):ILineTokens;
    }
    export class Bug implements IMode {
        public tokenize(line:string, tokens:IToken[], includeStates:boolean):ILineTokens {
            return null;
        }
    }    
}


//// [arrayAssignmentTest6.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Test;
(function (Test) {
    var Bug = (function () {
        function Bug() {
        }
        Bug.prototype.tokenize = function (line, tokens, includeStates) {
            return null;
        };
        __names(Bug.prototype, ["tokenize"]);
        return Bug;
    }());
    Test.Bug = Bug;
})(Test || (Test = {}));
