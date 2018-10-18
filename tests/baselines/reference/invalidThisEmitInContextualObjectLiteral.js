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
var TestController = /** @class */ (function () {
    function TestController() {
        var _this = this;
        this.p = this.m({
            p1: function (e) { },
            p2: function () { return function (vvvvvvvvv) { return _this; }; }
        });
    }
    TestController.prototype.m = function (def) { };
    return TestController;
}());
