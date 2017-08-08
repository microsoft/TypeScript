//// [accessOverriddenBaseClassMember1.ts]
class Point {
    constructor(public x: number, public y: number) { }
    public toString() {
        return "x=" + this.x + " y=" + this.y;
    }
}
class ColoredPoint extends Point {
    constructor(x: number, y: number, public color: string) {
        super(x, y);
    }
    public toString() {
        return super.toString() + " color=" + this.color;
    }
}


//// [accessOverriddenBaseClassMember1.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.toString = function () {
        return "x=" + this.x + " y=" + this.y;
    };
    __names(Point.prototype, ["toString"]);
    return Point;
}());
var ColoredPoint = (function (_super) {
    __extends(ColoredPoint, _super);
    function ColoredPoint(x, y, color) {
        var _this = _super.call(this, x, y) || this;
        _this.color = color;
        return _this;
    }
    ColoredPoint.prototype.toString = function () {
        return _super.prototype.toString.call(this) + " color=" + this.color;
    };
    __names(ColoredPoint.prototype, ["toString"]);
    return ColoredPoint;
}(Point));
