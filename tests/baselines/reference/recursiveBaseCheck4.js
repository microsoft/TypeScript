//// [tests/cases/compiler/recursiveBaseCheck4.ts] ////

//// [recursiveBaseCheck4.ts]
class M<T> extends M<string> { }
(new M).blah;

//// [recursiveBaseCheck4.js]
class M extends M {
}
(new M).blah;
