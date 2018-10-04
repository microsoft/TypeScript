//// [selfInLambdas.ts]
interface MouseEvent {
    x: number;
    y: number;
}

declare var window: Window;
interface Window {
    onmousemove: (ev: MouseEvent) => any;
    
}
var o = {

    counter: 0,

    start: function() {

        window.onmousemove = () => {
            this.counter++
            var f = () => this.counter;

        }

    }

}



class X {
	private value = "value";

	public foo() {
		var outer= () => {
            var x = this.value;
            var inner = () => {
                var y = this.value;
			}

			inner();

		};
		outer();
	}

}


//// [selfInLambdas.js]
var o = {
    counter: 0,
    start: function () {
        var _this = this;
        window.onmousemove = function () {
            _this.counter++;
            var f = function () { return _this.counter; };
        };
    }
};
var X = /** @class */ (function () {
    function X() {
        this.value = "value";
    }
    X.prototype.foo = function () {
        var _this = this;
        var outer = function () {
            var x = _this.value;
            var inner = function () {
                var y = _this.value;
            };
            inner();
        };
        outer();
    };
    return X;
}());
