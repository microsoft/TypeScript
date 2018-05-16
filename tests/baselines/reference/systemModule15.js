//// [tests/cases/compiler/systemModule15.ts] ////

//// [file1.ts]
import * as moduleB from "./file2"

declare function use(v: any): void;

use(moduleB.value);
use(moduleB.moduleC);
use(moduleB.moduleCStar);

//// [file2.ts]
import * as moduleCStar from "./file3"
import {value2} from "./file4"
import moduleC from "./file3"
import {value} from "./file3"

export {
    moduleCStar,
    moduleC,
    value
}

//// [file3.ts]
export var value = "youpi";
export default value;

//// [file4.ts]
export var value2 = "v";

//// [file3.js]
System.register([], function (exports_1, context_1) {
    var value;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("value", value = "youpi");
            exports_1("default", value);
        }
    };
});
//// [file4.js]
System.register([], function (exports_1, context_1) {
    var value2;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("value2", value2 = "v");
        }
    };
});
//// [file2.js]
System.register(["./file3"], function (exports_1, context_1) {
    var moduleCStar, file3_1, file3_2;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (moduleCStar_1) {
                moduleCStar = moduleCStar_1;
                file3_1 = moduleCStar_1;
                file3_2 = moduleCStar_1;
            }
        ],
        execute: function () {
            exports_1("moduleCStar", moduleCStar);
            exports_1("moduleC", file3_1["default"]);
            exports_1("value", file3_2.value);
        }
    };
});
//// [file1.js]
System.register(["./file2"], function (exports_1, context_1) {
    var moduleB;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (moduleB_1) {
                moduleB = moduleB_1;
            }
        ],
        execute: function () {
            use(moduleB.value);
            use(moduleB.moduleC);
            use(moduleB.moduleCStar);
        }
    };
});
