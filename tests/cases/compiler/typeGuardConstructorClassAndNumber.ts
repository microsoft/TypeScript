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
