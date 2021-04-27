//// [classExtendedDiscriminatedUnionInference.ts]
declare class LocalController<T, U> {
    isLocal: true;
    getProps(a: T, b: U): void;
}
declare class GlobalController<T, U> {
    isLocal: false;
    // N.B.: Parameter type order is reversed
    getProps(a: U, b: T): void;
}

class FailWithTS42 extends LocalController<{ foo: any }, { bar: any }> { }
const p = new FailWithTS42();

declare function createEnhancer1<T, U>(Wrapper: GlobalController<T, U> | LocalController<T, U>): [T, U];
const q1 = createEnhancer1(p);
const q2 = createEnhancer1(p as LocalController<{ foo: any }, { bar: any }>); // structurally identical type to the above


//// [classExtendedDiscriminatedUnionInference.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FailWithTS42 = /** @class */ (function (_super) {
    __extends(FailWithTS42, _super);
    function FailWithTS42() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FailWithTS42;
}(LocalController));
var p = new FailWithTS42();
var q1 = createEnhancer1(p);
var q2 = createEnhancer1(p); // structurally identical type to the above
