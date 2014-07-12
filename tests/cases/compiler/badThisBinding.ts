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