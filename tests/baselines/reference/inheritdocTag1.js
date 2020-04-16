//// [inheritdocTag1.ts]
class Foo {
    /**
     * @param {number} entity -
     * @param {string} attribute -
     */
    something(entity, attribute) { }
}

class Bar extends Foo {
    /**
     * @inheritdoc
     */
    something(entity, attribute) {
   }
}


//// [inheritdocTag1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Foo = /** @class */ (function () {
    function Foo() {
    }
    /**
     * @param {number} entity -
     * @param {string} attribute -
     */
    Foo.prototype.something = function (entity, attribute) { };
    return Foo;
}());
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    Bar.prototype.something = function (entity, attribute) {
    };
    return Bar;
}(Foo));


//// [inheritdocTag1.d.ts]
declare class Foo {
    /**
     * @param {number} entity -
     * @param {string} attribute -
     */
    something(entity: any, attribute: any): void;
}
declare class Bar extends Foo {
    /**
     * @inheritdoc
     */
    something(entity: any, attribute: any): void;
}
