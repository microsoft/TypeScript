//// [tests/cases/compiler/newArrays.ts] ////

//// [newArrays.ts]
namespace M {
	class Foo {}
	class Gar {
		public fa: Foo[];
		public x = 10;
		public y = 10;

		public m () {
			this.fa = new Array<Foo>(this.x * this.y);		
		}
	}
}

//// [newArrays.js]
"use strict";
var M;
(function (M) {
    class Foo {
    }
    class Gar {
        fa;
        x = 10;
        y = 10;
        m() {
            this.fa = new Array(this.x * this.y);
        }
    }
})(M || (M = {}));
