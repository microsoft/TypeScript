//// [tests/cases/compiler/recursiveBaseCheck6.ts] ////

//// [recursiveBaseCheck6.ts]
class S18<A> extends S18<{ S19: A; }>{ }
(new S18()).blah;

//// [recursiveBaseCheck6.js]
class S18 extends S18 {
}
(new S18()).blah;
