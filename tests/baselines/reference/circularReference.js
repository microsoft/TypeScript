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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M1 = void 0;
var foo2 = require("./foo2");
var M1;
(function (M1) {
    var C1 = /** @class */ (function () {
        function C1() {
            this.m1 = new foo2.M1.C1();
            this.m1.y = 10; // OK
            this.m1.x = 20; // Error
        }
        return C1;
    }());
    M1.C1 = C1;
})(M1 || (exports.M1 = M1 = {}));
//// [foo2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M1 = void 0;
var foo1 = require("./foo1");
var M1;
(function (M1) {
    var C1 = /** @class */ (function () {
        function C1() {
            this.m1 = new foo1.M1.C1();
            this.m1.y = 10; // Error
            this.m1.x = 20; // OK
            var tmp = new M1.C1();
            tmp.y = 10; // OK
            tmp.x = 20; // Error			
        }
        return C1;
    }());
    M1.C1 = C1;
})(M1 || (exports.M1 = M1 = {}));
