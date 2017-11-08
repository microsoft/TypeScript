//// [badThisBinding.ts]
declare function foo(a:any): any;
declare function bar(a:any): any;

class Greeter {
    constructor() {
		foo(() => {
            bar(() => {
                var x = this;
			});
		});
	}

} 

//// [badThisBinding.js]
var Greeter = /** @class */ (function () {
    function Greeter() {
        var _this = this;
        foo(function () {
            bar(function () {
                var x = _this;
            });
        });
    }
    return Greeter;
}());
