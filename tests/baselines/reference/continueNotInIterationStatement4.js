//// [tests/cases/compiler/continueNotInIterationStatement4.ts] ////

//// [continueNotInIterationStatement4.ts]
TWO:
while (true){
  var x = () => {
    continue TWO;
  }
}


//// [continueNotInIterationStatement4.js]
TWO: while (true) {
    var x = function () {
        continue TWO;
    };
}
