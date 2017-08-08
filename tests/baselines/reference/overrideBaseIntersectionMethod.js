//// [overrideBaseIntersectionMethod.ts]
// Repro from #14615

type Constructor<T> = new (...args: any[]) => T;

const WithLocation = <T extends Constructor<Point>>(Base: T) => class extends Base {
  getLocation(): [number, number] {
    const [x,y] = super.getLocation();
    return [this.x | x, this.y | y];
  }
}

class Point {
  constructor(public x: number, public y: number) { }
  getLocation(): [number, number] {
    return [0,0];
  }
}

class Foo extends WithLocation(Point) {
  calculate() {
    return this.x + this.y;
  }
  getLocation() {
    return super.getLocation()
  }
  whereAmI() {
    return this.getLocation();
  }
}


//// [overrideBaseIntersectionMethod.js]
"use strict";
// Repro from #14615
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
var WithLocation = function (Base) { return (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.getLocation = function () {
        var _a = _super.prototype.getLocation.call(this), x = _a[0], y = _a[1];
        return [this.x | x, this.y | y];
    };
    __names(class_1.prototype, ["getLocation"]);
    return class_1;
}(Base)); };
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getLocation = function () {
        return [0, 0];
    };
    __names(Point.prototype, ["getLocation"]);
    return Point;
}());
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Foo.prototype.calculate = function () {
        return this.x + this.y;
    };
    Foo.prototype.getLocation = function () {
        return _super.prototype.getLocation.call(this);
    };
    Foo.prototype.whereAmI = function () {
        return this.getLocation();
    };
    __names(Foo.prototype, ["calculate", "getLocation", "whereAmI"]);
    return Foo;
}(WithLocation(Point)));
