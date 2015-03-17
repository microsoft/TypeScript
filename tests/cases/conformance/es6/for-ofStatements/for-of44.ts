//@target: ES6
var array: [number, string | boolean | symbol][] = [[0, ""], [0, true], [1, Symbol()]]
for (var [num, strBoolSym] of array) {
    num;
    strBoolSym;
}