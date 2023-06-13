//// [tests/cases/compiler/getterSetterSubtypeAssignment.ts] ////

//// [getterSetterSubtypeAssignment.ts]
class NumberOrUndefined {
    _x: number | undefined;
    get x(): number { return this._x ?? 0; }
    set x(value: number | undefined) { this._x = value; }

    additionAssignment() {
        this.x += 1;
    }

    subtractionAssignment() {
        this.x -= 1;
    }

    multiplicationAssignment() {
        this.x *= 1;
    }

    divisionAssignment() {
        this.x /= 1;
    }
}
const numberOrUndefined = new NumberOrUndefined();
numberOrUndefined.x += 1;
numberOrUndefined.x -= 1;
numberOrUndefined.x *= 1;
numberOrUndefined.x /= 1;

class NumberOrString {
    _x: number | string = 0;
    get x(): number { return typeof this._x === 'number' ? this._x : Number(this._x); }
    set x(value: number | string) { this._x = value; }

    additionAssignmentNumber() {
        this.x += 1;
    }
    additionAssignmentString() {
        this.x += '1';
    }

    subtractionAssignment() {
        this.x -= 1;
    }

    multiplicationAssignment() {
        this.x *= 1;
    }

    divisionAssignment() {
        this.x /= 1;
    }
}
const numberOrString = new NumberOrString();
numberOrString.x += 1;
numberOrString.x += '1';
numberOrString.x -= 1;
numberOrString.x *= 1;
numberOrString.x /= 1;

type Foo = { bar: number; };
class NumberOrObject {
    _x: number | Foo = 0;
    get x(): number { return typeof this._x === 'number' ? this._x : this._x.bar; }
    set x(value: number | Foo) { this._x = value; }

    additionAssignment() {
        this.x += 1;
    }

    subtractionAssignment() {
        this.x -= 1;
    }

    multiplicationAssignment() {
        this.x *= 1;
    }

    divisionAssignment() {
        this.x /= 1;
    }
}
const numberOrObject = new NumberOrObject();
numberOrObject.x += 1;
numberOrObject.x -= 1;
numberOrObject.x *= 1;
numberOrObject.x /= 1;

//// [getterSetterSubtypeAssignment.js]
class NumberOrUndefined {
    get x() { var _a; return (_a = this._x) !== null && _a !== void 0 ? _a : 0; }
    set x(value) { this._x = value; }
    additionAssignment() {
        this.x += 1;
    }
    subtractionAssignment() {
        this.x -= 1;
    }
    multiplicationAssignment() {
        this.x *= 1;
    }
    divisionAssignment() {
        this.x /= 1;
    }
}
const numberOrUndefined = new NumberOrUndefined();
numberOrUndefined.x += 1;
numberOrUndefined.x -= 1;
numberOrUndefined.x *= 1;
numberOrUndefined.x /= 1;
class NumberOrString {
    constructor() {
        this._x = 0;
    }
    get x() { return typeof this._x === 'number' ? this._x : Number(this._x); }
    set x(value) { this._x = value; }
    additionAssignmentNumber() {
        this.x += 1;
    }
    additionAssignmentString() {
        this.x += '1';
    }
    subtractionAssignment() {
        this.x -= 1;
    }
    multiplicationAssignment() {
        this.x *= 1;
    }
    divisionAssignment() {
        this.x /= 1;
    }
}
const numberOrString = new NumberOrString();
numberOrString.x += 1;
numberOrString.x += '1';
numberOrString.x -= 1;
numberOrString.x *= 1;
numberOrString.x /= 1;
class NumberOrObject {
    constructor() {
        this._x = 0;
    }
    get x() { return typeof this._x === 'number' ? this._x : this._x.bar; }
    set x(value) { this._x = value; }
    additionAssignment() {
        this.x += 1;
    }
    subtractionAssignment() {
        this.x -= 1;
    }
    multiplicationAssignment() {
        this.x *= 1;
    }
    divisionAssignment() {
        this.x /= 1;
    }
}
const numberOrObject = new NumberOrObject();
numberOrObject.x += 1;
numberOrObject.x -= 1;
numberOrObject.x *= 1;
numberOrObject.x /= 1;
