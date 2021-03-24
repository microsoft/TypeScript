//// [tests/cases/compiler/exportClassExtendingIntersection.ts] ////

//// [BaseClass.ts]
export type Constructor<T> = new (...args: any[]) => T;

export class MyBaseClass<T> {
    baseProperty: string;
    constructor(value: T) {}
}
//// [MixinClass.ts]
import { Constructor, MyBaseClass } from './BaseClass';

export interface MyMixin {
    mixinProperty: string;
}

export function MyMixin<T extends Constructor<MyBaseClass<any>>>(base: T): T & Constructor<MyMixin> {
    return class extends base {
        mixinProperty: string;
    }
}
//// [FinalClass.ts]
import { MyBaseClass } from './BaseClass';
import { MyMixin } from './MixinClass';

export class MyExtendedClass extends MyMixin(MyBaseClass)<string> {
    extendedClassProperty: number;
}
//// [Main.ts]
import { MyExtendedClass } from './FinalClass';
import { MyMixin } from './MixinClass';

const myExtendedClass = new MyExtendedClass('string');

const AnotherMixedClass = MyMixin(MyExtendedClass);


//// [BaseClass.js]
"use strict";
exports.__esModule = true;
exports.MyBaseClass = void 0;
var MyBaseClass = /** @class */ (function () {
    function MyBaseClass(value) {
    }
    return MyBaseClass;
}());
exports.MyBaseClass = MyBaseClass;
//// [MixinClass.js]
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
exports.__esModule = true;
exports.MyMixin = void 0;
function MyMixin(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class_1;
    }(base));
}
exports.MyMixin = MyMixin;
//// [FinalClass.js]
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
exports.__esModule = true;
exports.MyExtendedClass = void 0;
var BaseClass_1 = require("./BaseClass");
var MixinClass_1 = require("./MixinClass");
var MyExtendedClass = /** @class */ (function (_super) {
    __extends(MyExtendedClass, _super);
    function MyExtendedClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyExtendedClass;
}((0, MixinClass_1.MyMixin)(BaseClass_1.MyBaseClass)));
exports.MyExtendedClass = MyExtendedClass;
//// [Main.js]
"use strict";
exports.__esModule = true;
var FinalClass_1 = require("./FinalClass");
var MixinClass_1 = require("./MixinClass");
var myExtendedClass = new FinalClass_1.MyExtendedClass('string');
var AnotherMixedClass = (0, MixinClass_1.MyMixin)(FinalClass_1.MyExtendedClass);


//// [BaseClass.d.ts]
export declare type Constructor<T> = new (...args: any[]) => T;
export declare class MyBaseClass<T> {
    baseProperty: string;
    constructor(value: T);
}
//// [MixinClass.d.ts]
import { Constructor, MyBaseClass } from './BaseClass';
export interface MyMixin {
    mixinProperty: string;
}
export declare function MyMixin<T extends Constructor<MyBaseClass<any>>>(base: T): T & Constructor<MyMixin>;
//// [FinalClass.d.ts]
import { MyBaseClass } from './BaseClass';
import { MyMixin } from './MixinClass';
declare const MyExtendedClass_base: typeof MyBaseClass & import("./BaseClass").Constructor<MyMixin>;
export declare class MyExtendedClass extends MyExtendedClass_base<string> {
    extendedClassProperty: number;
}
export {};
//// [Main.d.ts]
export {};
