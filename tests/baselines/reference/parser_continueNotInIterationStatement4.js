//// [tests/cases/conformance/parser/ecmascript5/Statements/ContinueStatements/parser_continueNotInIterationStatement4.ts] ////

//// [parser_continueNotInIterationStatement4.ts]
TWO:
while (true){
  var x = () => {
    continue TWO;
  }
}


//// [parser_continueNotInIterationStatement4.js]
"use strict";
TWO: while (true) {
    var x = () => {
        continue TWO;
    };
}
