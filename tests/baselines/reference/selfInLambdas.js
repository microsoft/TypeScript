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
var X = (function () {
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
    __names(X.prototype, ["foo"]);
    return X;
}());
