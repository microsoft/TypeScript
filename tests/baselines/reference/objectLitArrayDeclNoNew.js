//// [objectLitArrayDeclNoNew.ts]
declare var console;
"use strict";
module Test {
    export interface IState {
    }

    export interface IToken {
    }

    export interface ILineTokens {
        tokens: IToken[];
        endState: IState;
    }

    export class Gar {
        public moo: number = 0;
    }

    export function bug(): ILineTokens {
      var state:IState= null;
      return {
       tokens: Gar[],//IToken[],  // Missing new. Correct syntax is: tokens: new IToken[]
       endState: state
      };
     }
    }
}

//// [objectLitArrayDeclNoNew.js]
"use strict";
var Test;
(function (Test) {
    var Gar = /** @class */ (function () {
        function Gar() {
            this.moo = 0;
        }
        return Gar;
    }());
    Test.Gar = Gar;
    function bug() {
        var state = null;
        return {
            tokens: Gar[],
            endState: state
        };
    }
    Test.bug = bug;
})(Test || (Test = {}));
