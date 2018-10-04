//// [reachabilityChecks3.ts]
let x = 1;
loop: while (true) {
    if (x == 100) {
        break;
    }
    else {
        x++;
    }
}
{
    x: 100
}

var y = () => { f: 1 }

//// [reachabilityChecks3.js]
var x = 1;
loop: while (true) {
    if (x == 100) {
        break;
    }
    else {
        x++;
    }
}
{
    x: 100;
}
var y = function () { f: 1; };
