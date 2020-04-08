//// [exportDefaultNamespace.ts]
export default function someFunc() {
    return 'hello!';
}

someFunc.someProp = 'yo';


//// [exportDefaultNamespace.js]
"use strict";
exports.__esModule = true;
function someFunc() {
    return 'hello!';
}
exports["default"] = someFunc;
someFunc.someProp = 'yo';


//// [exportDefaultNamespace.d.ts]
declare function someFunc(): string;
declare namespace someFunc {
    var someProp: string;
}
export default someFunc;
