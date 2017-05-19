//// [emptyArrayBindingPatternParameter01.ts]
function f([]) {
    var x, y, z;
}

//// [emptyArrayBindingPatternParameter01.js]
function f(_a) {
    var x, y, z;
}


//// [emptyArrayBindingPatternParameter01.d.ts]
declare function f([]: any[]): void;
