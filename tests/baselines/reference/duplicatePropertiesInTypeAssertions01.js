//// [duplicatePropertiesInTypeAssertions01.ts]
let x = <{a: number; a: number}>{};

//// [duplicatePropertiesInTypeAssertions01.js]
var x = {};


//// [duplicatePropertiesInTypeAssertions01.d.ts]
declare let x: {
    a: number;
};
