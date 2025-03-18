//// [tests/cases/compiler/selfInLambdas.ts] ////

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
        window.onmousemove = () => {
            this.counter++;
            var f = () => this.counter;
        };
    }
};
class X {
    value = "value";
    foo() {
        var outer = () => {
            var x = this.value;
            var inner = () => {
                var y = this.value;
            };
            inner();
        };
        outer();
    }
}
