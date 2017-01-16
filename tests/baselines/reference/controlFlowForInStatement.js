//// [controlFlowForInStatement.ts]
let x: string | number | boolean | RegExp | Function;
let obj: any;
let cond: boolean;

x = /a/;
for (let y in obj) {
    x = y;
    if (cond) {
        x = 42;
        continue;
    }
    if (cond) {
        x = true;
        break;
    }
}
x; // RegExp | string | number | boolean


//// [controlFlowForInStatement.js]
var x;
var obj;
var cond;
x = /a/;
for (var y in obj) {
    x = y;
    if (cond) {
        x = 42;
        continue;
    }
    if (cond) {
        x = true;
        break;
    }
}
x; // RegExp | string | number | boolean
