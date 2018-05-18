//// [aliasesInSystemModule2.ts]
import {alias} from "foo";
import cls = alias.Class;
export import cls2 = alias.Class;

let x = new alias.Class();
let y = new cls();
let z = new cls2();

module M {
  export import cls = alias.Class;
  let x = new alias.Class();
  let y = new cls(); 
  let z = new cls2();
}

//// [aliasesInSystemModule2.js]
System.register(["foo"], function (exports_1, context_1) {
    var foo_1, cls, cls2, x, y, z, M;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (foo_1_1) {
                foo_1 = foo_1_1;
            }
        ],
        execute: function () {
            cls = foo_1.alias.Class;
            exports_1("cls2", cls2 = foo_1.alias.Class);
            x = new foo_1.alias.Class();
            y = new cls();
            z = new cls2();
            (function (M) {
                M.cls = foo_1.alias.Class;
                var x = new foo_1.alias.Class();
                var y = new M.cls();
                var z = new cls2();
            })(M || (M = {}));
        }
    };
});
