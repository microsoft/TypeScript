//// [tests/cases/compiler/arrayAssignmentTest6.ts] ////

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
    class Bug {
        tokenize(line, tokens, includeStates) {
            return null;
        }
    }
    Test.Bug = Bug;
})(Test || (Test = {}));
