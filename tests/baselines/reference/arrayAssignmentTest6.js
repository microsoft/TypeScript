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
var Test;
(function (Test) {
    var Bug = /** @class */ (function () {
        function Bug() {
        }
        Bug.prototype.tokenize = function (line, tokens, includeStates) {
            return null;
        };
        return Bug;
    }());
    Test.Bug = Bug;
})(Test || (Test = {}));
