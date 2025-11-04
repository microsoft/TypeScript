//// [tests/cases/compiler/spreadTupleGenerator.ts] ////

//// [spreadTupleGenerator.ts]
class V {
  *[Symbol.iterator](): TupleGenerator<[number, number]> {
    yield 1; yield 2;
  }
}

declare const v: V;
declare function foo(x: number, y: number): void;

foo(...v);
const a: [number, number] = [...v];


//// [spreadTupleGenerator.js]
class V {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
    }
}
foo(...v);
const a = [...v];
