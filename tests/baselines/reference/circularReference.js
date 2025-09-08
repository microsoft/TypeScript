//// [tests/cases/conformance/externalModules/circularReference.ts] ////

//// [foo1.ts]
import foo2 = require('./foo2');
export module M1 {
	export class C1 {
		m1: foo2.M1.C1;
		x: number;
		constructor(){
			this.m1 = new foo2.M1.C1();
			this.m1.y = 10; // OK
			this.m1.x = 20; // Error
		}
	}
}

//// [foo2.ts]
import foo1 = require('./foo1');
export module M1 {
	export class C1 {
		m1: foo1.M1.C1;
		y: number
		constructor(){
			this.m1 = new foo1.M1.C1();
			this.m1.y = 10; // Error
			this.m1.x = 20; // OK

			var tmp = new M1.C1();
			tmp.y = 10; // OK
			tmp.x = 20; // Error			
		}
	}
}


//// [foo1.js]
export var M1;
(function (M1) {
    class C1 {
        m1;
        x;
        constructor() {
            this.m1 = new foo2.M1.C1();
            this.m1.y = 10; // OK
            this.m1.x = 20; // Error
        }
    }
    M1.C1 = C1;
})(M1 || (M1 = {}));
//// [foo2.js]
export var M1;
(function (M1) {
    class C1 {
        m1;
        y;
        constructor() {
            this.m1 = new foo1.M1.C1();
            this.m1.y = 10; // Error
            this.m1.x = 20; // OK
            var tmp = new M1.C1();
            tmp.y = 10; // OK
            tmp.x = 20; // Error			
        }
    }
    M1.C1 = C1;
})(M1 || (M1 = {}));
