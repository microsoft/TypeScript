//// [tests/cases/compiler/optimizationEntrypoint.ts] ////

//// [index.ts]

export * from "./a";
export {Detail} from "./b";

export interface Inner {
	item4: number;
}

//// [a.ts]
import {Main as BaseMain, Inner as Middle} from "./b";

export class Main extends BaseMain {
	memberc: Middle;
}

export interface Inner {
	item3: number;
}

//// [b.ts]
import {Main as BaseMain, Inner as Innermost} from "./c";

export class Main extends BaseMain {
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
export class Main {
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
    exports.Main = Main;
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
    })(c_1.Main);
    exports.Main = Main;
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
    })(b_1.Main);
    exports.Main = Main;
});
//// [index.js]
define(["require", "exports", "./a"], function (require, exports, a_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(a_1);
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
    exports.Main = Main;
});
define("tests/cases/compiler/b", ["require", "exports", "tests/cases/compiler/c"], function (require, exports, c_1) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        return Main;
    })(c_1.Main);
    exports.Main = Main;
});
define("tests/cases/compiler/a", ["require", "exports", "tests/cases/compiler/b"], function (require, exports, b_1) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        return Main;
    })(b_1.Main);
    exports.Main = Main;
});
define("tests/cases/compiler/index", ["require", "exports", "tests/cases/compiler/a"], function (require, exports, a_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(a_1);
});


//// [c.d.ts]
export declare class Main {
    member1: string;
}
export interface Inner {
    item: number;
}
//// [b.d.ts]
import { Main as BaseMain, Inner as Innermost } from "./c";
export declare class Main extends BaseMain {
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
import { Main as BaseMain, Inner as Middle } from "./b";
export declare class Main extends BaseMain {
    memberc: Middle;
}
export interface Inner {
    item3: number;
}
//// [index.d.ts]
export * from "./a";
export { Detail } from "./b";
export interface Inner {
    item4: number;
}
//// [bundled.d.ts]
export declare class Main_1 {
    member1: string;
}
export interface Inner_1 {
    item: number;
}
export declare class Main_2 extends Main_1 {
    member2: Inner_1;
    details: Detail;
}
export interface Inner_2 {
    item2: number;
}
export interface Detail {
    id: string;
}
export declare class Main extends Main_2 {
    memberc: Inner_2;
}
export interface Inner {
    item4: number;
}
