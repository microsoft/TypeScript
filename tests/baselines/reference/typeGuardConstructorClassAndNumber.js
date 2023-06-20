//// [tests/cases/compiler/typeGuardConstructorClassAndNumber.ts] ////

//// [typeGuardConstructorClassAndNumber.ts]
// Typical case
class C1 {
    property1: string;
}

let var1: C1 | number;
if (var1.constructor == C1) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (var1["constructor"] == C1) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (var1.constructor === C1) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (var1["constructor"] === C1) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (C1 == var1.constructor) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (C1 == var1["constructor"]) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (C1 === var1.constructor) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (C1 === var1["constructor"]) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}

if (var1.constructor != C1) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (var1["constructor"] != C1) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (var1.constructor !== C1) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (var1["constructor"] !== C1) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (C1 != var1.constructor) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (C1 != var1["constructor"]) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (C1 !== var1.constructor) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (C1 !== var1["constructor"]) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}

// Repro from #37660

function foo(instance: Function | object) {
    if (typeof instance === 'function') {
        if (instance.prototype == null || instance.prototype.constructor == null) {
            return instance.length;
        }
    }
}


//// [typeGuardConstructorClassAndNumber.js]
// Typical case
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var var1;
if (var1.constructor == C1) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (var1["constructor"] == C1) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (var1.constructor === C1) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (var1["constructor"] === C1) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (C1 == var1.constructor) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (C1 == var1["constructor"]) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (C1 === var1.constructor) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (C1 === var1["constructor"]) {
    var1; // C1
    var1.property1; // string
}
else {
    var1; // number | C1
}
if (var1.constructor != C1) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (var1["constructor"] != C1) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (var1.constructor !== C1) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (var1["constructor"] !== C1) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (C1 != var1.constructor) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (C1 != var1["constructor"]) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (C1 !== var1.constructor) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
if (C1 !== var1["constructor"]) {
    var1; // C1 | number
    var1.property1; // error
}
else {
    var1; // C1
}
// Repro from #37660
function foo(instance) {
    if (typeof instance === 'function') {
        if (instance.prototype == null || instance.prototype.constructor == null) {
            return instance.length;
        }
    }
}
