//// [tests/cases/compiler/constEnumPreserveEmitNamedExport1.ts] ////

//// [a.ts]
const enum A {
    Foo
};
export { A };

//// [b.ts]
import { A } from './a';
export { A };


//// [a.js]
var A;
(function (A) {
    A[A["Foo"] = 0] = "Foo";
})(A || (A = {}));
;
export { A };
//// [b.js]
import { A } from './a';
export { A };
