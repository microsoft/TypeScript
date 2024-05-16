//// [tests/cases/compiler/strictInstanceOfTypeParametersWithLocalTypeReferences.ts] ////

//// [strictInstanceOfTypeParametersWithLocalTypeReferences.ts]
class Box<T> {
    value: T;
}

class BoxBox<T, B extends Box<T>> {
    box: B;
}

declare const bb: any;
if (bb instanceof BoxBox) {
    bb.box.value;
}


//// [strictInstanceOfTypeParametersWithLocalTypeReferences.js]
var Box = /** @class */ (function () {
    function Box() {
    }
    return Box;
}());
var BoxBox = /** @class */ (function () {
    function BoxBox() {
    }
    return BoxBox;
}());
if (bb instanceof BoxBox) {
    bb.box.value;
}
