//// [invalidThisEmitInContextualObjectLiteral.ts]
interface IDef {
	p1: (e:string) => void;
	p2: () => (n: number) => any;
}

class TestController {
	public m(def: IDef) { }
	public p = this.m({
		p1: e => { },
		p2: () => { return vvvvvvvvv => this; },
	});
}


//// [invalidThisEmitInContextualObjectLiteral.js]
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
var TestController = (function () {
    function TestController() {
        var _this = this;
        this.p = this.m({
            p1: function (e) { },
            p2: function () { return function (vvvvvvvvv) { return _this; }; }
        });
    }
    TestController.prototype.m = function (def) { };
    __names(TestController.prototype, ["m"]);
    return TestController;
}());
