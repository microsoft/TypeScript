//// [tests/cases/compiler/shadowingViaLocalValueOrBindingElement.ts] ////

//// [shadowingViaLocalValueOrBindingElement.ts]
if (true) {
    let x;
    if (true) {
        var x = 0; // Error
        var { x = 0 } = { x: 0 }; // Error
        var { x: x = 0 } = { x: 0 }; // Error
        var { x } = { x: 0 }; // Error
        var { x: x } = { x: 0 }; // Error
    }
}

//// [shadowingViaLocalValueOrBindingElement.js]
if (true) {
    var x_1;
    if (true) {
        var x = 0; // Error
        var _a = { x: 0 }.x, x = _a === void 0 ? 0 : _a; // Error
        var _b = { x: 0 }.x, x = _b === void 0 ? 0 : _b; // Error
        var x = { x: 0 }.x; // Error
        var x = { x: 0 }.x; // Error
    }
}
