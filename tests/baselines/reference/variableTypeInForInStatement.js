//// [variableTypeInForInStatement.ts]
let x = {};
for (const c in x) {
    
}

let arr = [1];
for (const c in arr) {
    
}

//// [variableTypeInForInStatement.js]
var x = {};
for (var c in x) {
}
var arr = [1];
for (var c in arr) {
}
