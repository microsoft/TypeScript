//// [tests/cases/compiler/defaultPropsEmptyCurlyBecomesAnyForJs.ts] ////

//// [library.d.ts]
export class Foo<T = {}, U = {}> {
    props: T;
    state: U;
    constructor(props: T, state: U);
}

//// [component.js]
import { Foo } from "./library";
export class MyFoo extends Foo {
    member;
}

//// [typed_component.ts]
import { MyFoo } from "./component";
export class TypedFoo extends MyFoo {
    constructor() {
        super({x: "string", y: 42}, { value: undefined });
        this.props.x;
        this.props.y;
        this.state.value;
        this.member;
    }
}

//// [component.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFoo = void 0;
var library_1 = require("./library");
var MyFoo = /** @class */ (function (_super) {
    __extends(MyFoo, _super);
    function MyFoo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyFoo;
}(library_1.Foo));
exports.MyFoo = MyFoo;
//// [typed_component.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedFoo = void 0;
var component_1 = require("./component");
var TypedFoo = /** @class */ (function (_super) {
    __extends(TypedFoo, _super);
    function TypedFoo() {
        var _this = _super.call(this, { x: "string", y: 42 }, { value: undefined }) || this;
        _this.props.x;
        _this.props.y;
        _this.state.value;
        _this.member;
        return _this;
    }
    return TypedFoo;
}(component_1.MyFoo));
exports.TypedFoo = TypedFoo;
