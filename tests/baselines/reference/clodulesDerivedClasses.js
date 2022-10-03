//// [clodulesDerivedClasses.ts]
class Shape {
    id: number;
}

module Shape.Utils {
    export function convert(): Shape { return null;}
}

class Path extends Shape {
    name: string;

}

module Path.Utils {
    export function convert2(): Path {
        return null;
    }
}





//// [clodulesDerivedClasses.js]
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
var Shape = /** @class */ (function () {
    function Shape() {
    }
    return Shape;
}());
(function (Shape) {
    var Utils;
    (function (Utils) {
        function convert() { return null; }
        Utils.convert = convert;
    })(Utils = Shape.Utils || (Shape.Utils = {}));
})(Shape || (Shape = {}));
var Path = /** @class */ (function (_super) {
    __extends(Path, _super);
    function Path() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Path;
}(Shape));
(function (Path) {
    var Utils;
    (function (Utils) {
        function convert2() {
            return null;
        }
        Utils.convert2 = convert2;
    })(Utils = Path.Utils || (Path.Utils = {}));
})(Path || (Path = {}));
