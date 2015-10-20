//// [tests/cases/compiler/optimizationEntrypoint3.ts] ////

//// [index.ts]

import {Foo} from "./foo";

class Bar extends Foo<Foo<number>> {
	primary: Foo<number>;
}

export = Bar;

//// [foo.ts]

export class Foo<T> extends Array<T> {
	self: this;
}


//// [foo.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var Foo = (function (_super) {
        __extends(Foo, _super);
        function Foo() {
            _super.apply(this, arguments);
        }
        return Foo;
    })(Array);
    exports.Foo = Foo;
});
//// [index.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./foo"], function (require, exports, foo_1) {
    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            _super.apply(this, arguments);
        }
        return Bar;
    })(foo_1.Foo);
    return Bar;
});
//// [bundled.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("tests/cases/compiler/foo", ["require", "exports"], function (require, exports) {
    var Foo = (function (_super) {
        __extends(Foo, _super);
        function Foo() {
            _super.apply(this, arguments);
        }
        return Foo;
    })(Array);
    exports.Foo = Foo;
});
define("tests/cases/compiler/index", ["require", "exports", "tests/cases/compiler/foo"], function (require, exports, foo_1) {
    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            _super.apply(this, arguments);
        }
        return Bar;
    })(foo_1.Foo);
    return Bar;
});


//// [foo.d.ts]
export declare class Foo<T> extends Array<T> {
    self: this;
}
//// [index.d.ts]
import { Foo } from "./foo";
declare class Bar extends Foo<Foo<number>> {
    primary: Foo<number>;
}
export = Bar;
//// [bundled.d.ts]
declare class Foo<T> extends Array<T> {
    self: this;
}
declare class Bar extends Foo<Foo<number>> {
    primary: Foo<number>;
}
export = Bar;

//// [DtsFileErrors]


bundled.d.ts(4,27): error TS4020: Extends clause of exported class 'Bar' has or is using private name 'Foo'.
bundled.d.ts(4,31): error TS4020: Extends clause of exported class 'Bar' has or is using private name 'Foo'.
bundled.d.ts(5,14): error TS4031: Public property 'primary' of exported class has or is using private name 'Foo'.


==== tests/cases/compiler/index.d.ts (0 errors) ====
    import { Foo } from "./foo";
    declare class Bar extends Foo<Foo<number>> {
        primary: Foo<number>;
    }
    export = Bar;
    
==== tests/cases/compiler/foo.d.ts (0 errors) ====
    export declare class Foo<T> extends Array<T> {
        self: this;
    }
    
==== bundled.d.ts (3 errors) ====
    declare class Foo<T> extends Array<T> {
        self: this;
    }
    declare class Bar extends Foo<Foo<number>> {
                              ~~~
!!! error TS4020: Extends clause of exported class 'Bar' has or is using private name 'Foo'.
                                  ~~~
!!! error TS4020: Extends clause of exported class 'Bar' has or is using private name 'Foo'.
        primary: Foo<number>;
                 ~~~
!!! error TS4031: Public property 'primary' of exported class has or is using private name 'Foo'.
    }
    export = Bar;