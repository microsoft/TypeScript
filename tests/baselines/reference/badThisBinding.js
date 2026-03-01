//// [tests/cases/compiler/badThisBinding.ts] ////

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
"use strict";
class Greeter {
    constructor() {
        foo(() => {
            bar(() => {
                var x = this;
            });
        });
    }
}
