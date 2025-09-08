//// [tests/cases/compiler/aliasesInSystemModule1.ts] ////

//// [aliasesInSystemModule1.ts]
import alias = require('foo');
import cls = alias.Class;
export import cls2 = alias.Class;

let x = new alias.Class();
let y = new cls();
let z = new cls2();

namespace M {
  export import cls = alias.Class;
  let x = new alias.Class();
  let y = new cls(); 
  let z = new cls2();
}
  

//// [aliasesInSystemModule1.js]
System.register(["foo"], function (exports_1, context_1) {
    "use strict";
    var alias, cls, cls2, x, y, z, M;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (alias_1) {
                alias = alias_1;
            }
        ],
        execute: function () {
            cls = alias.Class;
            exports_1("cls2", cls2 = alias.Class);
            x = new alias.Class();
            y = new cls();
            z = new cls2();
            (function (M) {
                M.cls = alias.Class;
                var x = new alias.Class();
                var y = new M.cls();
                var z = new cls2();
            })(M || (M = {}));
        }
    };
});
