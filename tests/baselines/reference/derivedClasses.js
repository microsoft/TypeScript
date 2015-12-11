//// [derivedClasses.ts]
class Red extends Color {
    public shade() { 
    	var getHue = () => { return this.hue(); };
    	return getHue() + " red"; 
    }
}

class Color {
    public shade() { return "some shade"; }
    public hue() { return "some hue"; }
}

class Blue extends Color {
    
    public shade() { 
    	var getHue = () => { return this.hue(); };
    	return getHue() + " blue"; 
    }
}

var r = new Red();
var b = new Blue();

r.shade();
r.hue();
b.shade();
b.hue();




//// [derivedClasses.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Red = (function (_super) {
    __extends(Red, _super);
    function Red() {
        _super.apply(this, arguments);
    }
    Red.prototype.shade = function () {
        var _this = this;
        var getHue = function () { return _this.hue(); };
        return getHue() + " red";
    };
    return Red;
}(Color));
var Color = (function () {
    function Color() {
    }
    Color.prototype.shade = function () { return "some shade"; };
    Color.prototype.hue = function () { return "some hue"; };
    return Color;
}());
var Blue = (function (_super) {
    __extends(Blue, _super);
    function Blue() {
        _super.apply(this, arguments);
    }
    Blue.prototype.shade = function () {
        var _this = this;
        var getHue = function () { return _this.hue(); };
        return getHue() + " blue";
    };
    return Blue;
}(Color));
var r = new Red();
var b = new Blue();
r.shade();
r.hue();
b.shade();
b.hue();
