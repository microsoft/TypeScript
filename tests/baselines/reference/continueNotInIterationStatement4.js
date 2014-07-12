//// [continueNotInIterationStatement4.js]
TWO:
while (true) {
    var x = function () {
        continue TWO;
    };
}
