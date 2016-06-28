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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Shape = (function () {
    function Shape() {
    }
    return Shape;
}());
var Shape;
(function (Shape) {
    var Utils;
    (function (Utils) {
        function convert() { return null; }
        Utils.convert = convert;
    })(Utils = Shape.Utils || (Shape.Utils = {}));
})(Shape || (Shape = {}));
var Path = (function (_super) {
    __extends(Path, _super);
    function Path() {
        _super.apply(this, arguments);
    }
    return Path;
}(Shape));
var Path;
(function (Path) {
    var Utils;
    (function (Utils) {
        function convert2() {
            return null;
        }
        Utils.convert2 = convert2;
    })(Utils = Path.Utils || (Path.Utils = {}));
})(Path || (Path = {}));
