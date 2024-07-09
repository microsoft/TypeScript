//// [tests/cases/compiler/jsDeclarationEmitExportedClassWithExtends.ts] ////

//// [package.json]
{
    "name": "lit",
    "version": "0.0.1",
    "type": "module",
    "exports": {
      ".": {
        "types": "./development/index.d.ts"
      }
    }
}
//// [index.d.ts]
export * from "lit-element/lit-element.js";
//// [package.json]
{
    "name": "lit-element",
    "version": "0.0.1",
    "type": "module",
    "exports": {
      ".": {
        "types": "./development/index.d.ts"
      },
      "./lit-element.js": {
        "types": "./development/lit-element.d.ts"
      }
    }
}
//// [index.d.ts]
export * from "./lit-element.js";
//// [lit-element.d.ts]
export class LitElement {}
//// [package.json]
{
    "type": "module",
    "private": true
}
//// [index.js]
import { LitElement, LitElement as LitElement2 } from "lit";
export class ElementB extends LitElement {}
export class ElementC extends LitElement2 {}

//// [index.js]
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
import { LitElement, LitElement as LitElement2 } from "lit";
var ElementB = /** @class */ (function (_super) {
    __extends(ElementB, _super);
    function ElementB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ElementB;
}(LitElement));
export { ElementB };
var ElementC = /** @class */ (function (_super) {
    __extends(ElementC, _super);
    function ElementC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ElementC;
}(LitElement2));
export { ElementC };


//// [index.d.ts]
export class ElementB extends LitElement {
}
export class ElementC extends LitElement {
}
import { LitElement } from "lit";
