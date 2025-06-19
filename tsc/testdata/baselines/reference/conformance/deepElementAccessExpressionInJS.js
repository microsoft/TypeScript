//// [tests/cases/conformance/salsa/deepElementAccessExpressionInJS.ts] ////

//// [declarations.d.ts]
declare var module: {
    exports: {
        [key: string]: any;
    };
}
//// [elementAccessExpressionInJS.js]
if (module[calculatePropertyName(1)]) {
}
function calculatePropertyName(index) {
    // this would be some webpack index in real life
    return `property${index}`;
}


//// [elementAccessExpressionInJS.js]
if (module[calculatePropertyName(1)]) {
}
function calculatePropertyName(index) {
    // this would be some webpack index in real life
    return `property${index}`;
}
