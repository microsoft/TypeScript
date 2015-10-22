//// [tests/cases/compiler/optimizationEntrypoint8.ts] ////

//// [index.d.ts]

declare class Foo {}
declare namespace Foo {
	export interface Bar {
		member: number;
	}
}
export = Foo;


//// [main.ts]
import * as Foo from "foo";
export class Baz extends Foo implements Foo.Bar {
	member = 42;
}



//// [main.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "foo"], function (require, exports, Foo) {
    var Baz = (function (_super) {
        __extends(Baz, _super);
        function Baz() {
            _super.apply(this, arguments);
            this.member = 42;
        }
        return Baz;
    })(Foo);
    exports.Baz = Baz;
});
//// [bundled.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("tests/cases/compiler/node_modules/foo/index", ["require", "exports"], function (require, exports) {
    return Foo;
});
define("tests/cases/compiler/main", ["require", "exports", "foo"], function (require, exports, Foo) {
    var Baz = (function (_super) {
        __extends(Baz, _super);
        function Baz() {
            _super.apply(this, arguments);
            this.member = 42;
        }
        return Baz;
    })(Foo);
    exports.Baz = Baz;
});


//// [main.d.ts]
import * as Foo from "foo";
export declare class Baz extends Foo implements Foo.Bar {
    member: number;
}
//// [bundled.d.ts]
import * as foo from "foo";
export declare class Baz extends foo implements foo.Bar {
    member: number;
}


//// [DtsFileErrors]


bundled.d.ts(1,22): error TS2307: Cannot find module 'foo'.


==== tests/cases/compiler/node_modules/foo/index.d.ts (0 errors) ====
    
    declare class Foo {}
    declare namespace Foo {
    	export interface Bar {
    		member: number;
    	}
    }
    export = Foo;
    
    
==== tests/cases/compiler/main.d.ts (0 errors) ====
    import * as Foo from "foo";
    export declare class Baz extends Foo implements Foo.Bar {
        member: number;
    }
    
==== bundled.d.ts (1 errors) ====
    import * as foo from "foo";
                         ~~~~~
!!! error TS2307: Cannot find module 'foo'.
    export declare class Baz extends foo implements foo.Bar {
        member: number;
    }
    