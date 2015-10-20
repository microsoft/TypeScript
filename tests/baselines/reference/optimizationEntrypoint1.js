//// [tests/cases/compiler/optimizationEntrypoint1.ts] ////

//// [index.ts]

export * from "./a";
export {Detail, Detail as DetailMock, Detail as DetailReal} from "./b";

export interface Inner {
	item4: number;
}

export interface default_1 { // make sure generated names don't clash
	number: number;
}

export {default as BBaseMain, Inner as Middle} from "./b";
export {default as CBaseMain, Inner as Innermost} from "./c";
export {default} from "./a";

//// [a.ts]
import {default as BaseMain, Inner as Middle} from "./b";

export default class Main extends BaseMain {
	memberc: Middle;
}

export interface Inner {
	item3: number;
}

//// [b.ts]
import {default as BaseMain, Inner as Innermost} from "./c";

export default class Main extends BaseMain {
	member2: Innermost;
	details: Detail;
}

export interface Inner {
	item2: number;
}

export interface Detail {
	id: string;
}

//// [c.ts]
export default class Main {
	member1: string;
}

export interface Inner {
	item: number;
}

//// [c.js]
define(["require", "exports"], function (require, exports) {
    var Main = (function () {
        function Main() {
        }
        return Main;
    })();
    exports.__esModule = true;
    exports["default"] = Main;
});
//// [b.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./c"], function (require, exports, c_1) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        return Main;
    })(c_1["default"]);
    exports.__esModule = true;
    exports["default"] = Main;
});
//// [a.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./b"], function (require, exports, b_1) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        return Main;
    })(b_1["default"]);
    exports.__esModule = true;
    exports["default"] = Main;
});
//// [index.js]
define(["require", "exports", "./a", "./b", "./c", "./a"], function (require, exports, a_1, b_1, c_1, a_2) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(a_1);
    exports.BBaseMain = b_1.default;
    exports.CBaseMain = c_1.default;
    exports.default = a_2.default;
});
//// [bundled.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("tests/cases/compiler/c", ["require", "exports"], function (require, exports) {
    var Main = (function () {
        function Main() {
        }
        return Main;
    })();
    exports.__esModule = true;
    exports["default"] = Main;
});
define("tests/cases/compiler/b", ["require", "exports", "tests/cases/compiler/c"], function (require, exports, c_1) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        return Main;
    })(c_1["default"]);
    exports.__esModule = true;
    exports["default"] = Main;
});
define("tests/cases/compiler/a", ["require", "exports", "tests/cases/compiler/b"], function (require, exports, b_1) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        return Main;
    })(b_1["default"]);
    exports.__esModule = true;
    exports["default"] = Main;
});
define("tests/cases/compiler/index", ["require", "exports", "tests/cases/compiler/a", "tests/cases/compiler/b", "tests/cases/compiler/c", "tests/cases/compiler/a"], function (require, exports, a_1, b_2, c_2, a_2) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(a_1);
    exports.BBaseMain = b_2.default;
    exports.CBaseMain = c_2.default;
    exports.default = a_2.default;
});


//// [c.d.ts]
export default class Main {
    member1: string;
}
export interface Inner {
    item: number;
}
//// [b.d.ts]
import { default as BaseMain, Inner as Innermost } from "./c";
export default class Main extends BaseMain {
    member2: Innermost;
    details: Detail;
}
export interface Inner {
    item2: number;
}
export interface Detail {
    id: string;
}
//// [a.d.ts]
import { default as BaseMain, Inner as Middle } from "./b";
export default class Main extends BaseMain {
    memberc: Middle;
}
export interface Inner {
    item3: number;
}
//// [index.d.ts]
export * from "./a";
export { Detail, Detail as DetailMock, Detail as DetailReal } from "./b";
export interface Inner {
    item4: number;
}
export interface default_1 {
    number: number;
}
export { default as BBaseMain, Inner as Middle } from "./b";
export { default as CBaseMain, Inner as Innermost } from "./c";
export { default } from "./a";
//// [bundled.d.ts]
declare class default_2 {
    member1: string;
}
interface Inner_1 {
    item: number;
}
declare class default_3 extends default_2 {
    member2: Inner_1;
    details: Detail;
}
interface Inner_2 {
    item2: number;
}
export interface Detail {
    id: string;
}
export declare class default_1_1 extends default_3 {
    memberc: Inner_2;
}
export interface Inner {
    item4: number;
}
export interface default_1 {
    number: number;
}
export default default_1_1;
export {
    Detail as DetailMock,
    Detail as DetailReal,
    default_3 as BBaseMain,
    Inner_2 as Middle,
    default_2 as CBaseMain,
    Inner_1 as Innermost,
}

//// [DtsFileErrors]


bundled.d.ts(7,33): error TS4020: Extends clause of exported class 'default_3' has or is using private name 'default_2'.
bundled.d.ts(8,14): error TS4031: Public property 'member2' of exported class has or is using private name 'Inner_1'.
bundled.d.ts(17,42): error TS4020: Extends clause of exported class 'default_1_1' has or is using private name 'default_3'.
bundled.d.ts(18,14): error TS4031: Public property 'memberc' of exported class has or is using private name 'Inner_2'.


==== tests/cases/compiler/index.d.ts (0 errors) ====
    export * from "./a";
    export { Detail, Detail as DetailMock, Detail as DetailReal } from "./b";
    export interface Inner {
        item4: number;
    }
    export interface default_1 {
        number: number;
    }
    export { default as BBaseMain, Inner as Middle } from "./b";
    export { default as CBaseMain, Inner as Innermost } from "./c";
    export { default } from "./a";
    
==== tests/cases/compiler/a.d.ts (0 errors) ====
    import { default as BaseMain, Inner as Middle } from "./b";
    export default class Main extends BaseMain {
        memberc: Middle;
    }
    export interface Inner {
        item3: number;
    }
    
==== tests/cases/compiler/b.d.ts (0 errors) ====
    import { default as BaseMain, Inner as Innermost } from "./c";
    export default class Main extends BaseMain {
        member2: Innermost;
        details: Detail;
    }
    export interface Inner {
        item2: number;
    }
    export interface Detail {
        id: string;
    }
    
==== tests/cases/compiler/c.d.ts (0 errors) ====
    export default class Main {
        member1: string;
    }
    export interface Inner {
        item: number;
    }
    
==== bundled.d.ts (4 errors) ====
    declare class default_2 {
        member1: string;
    }
    interface Inner_1 {
        item: number;
    }
    declare class default_3 extends default_2 {
                                    ~~~~~~~~~
!!! error TS4020: Extends clause of exported class 'default_3' has or is using private name 'default_2'.
        member2: Inner_1;
                 ~~~~~~~
!!! error TS4031: Public property 'member2' of exported class has or is using private name 'Inner_1'.
        details: Detail;
    }
    interface Inner_2 {
        item2: number;
    }
    export interface Detail {
        id: string;
    }
    export declare class default_1_1 extends default_3 {
                                             ~~~~~~~~~
!!! error TS4020: Extends clause of exported class 'default_1_1' has or is using private name 'default_3'.
        memberc: Inner_2;
                 ~~~~~~~
!!! error TS4031: Public property 'memberc' of exported class has or is using private name 'Inner_2'.
    }
    export interface Inner {
        item4: number;
    }
    export interface default_1 {
        number: number;
    }
    export default default_1_1;
    export {
        Detail as DetailMock,
        Detail as DetailReal,
        default_3 as BBaseMain,
        Inner_2 as Middle,
        default_2 as CBaseMain,
        Inner_1 as Innermost,
    }