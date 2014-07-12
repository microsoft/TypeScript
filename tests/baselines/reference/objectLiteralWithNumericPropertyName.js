//// [objectLiteralWithNumericPropertyName.ts]
interface A {
    0: string;
}
var x: A = {
    0: 3
};


//// [objectLiteralWithNumericPropertyName.js]
var x = {
    0: 3
};
