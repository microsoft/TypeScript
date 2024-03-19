//// [tests/cases/compiler/computedEnumMemberSyntacticallyString2.ts] ////

//// [foo.ts]
import { BAR } from './bar';
enum Foo { A = `${BAR}` }

//// [bar.ts]
export const BAR = 'bar';

//// [bar.js]
export const BAR = 'bar';
//// [foo.js]
import { BAR } from './bar';
var Foo;
(function (Foo) {
    Foo["A"] = "bar";
})(Foo || (Foo = {}));
