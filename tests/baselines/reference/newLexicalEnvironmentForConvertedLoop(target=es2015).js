//// [tests/cases/compiler/newLexicalEnvironmentForConvertedLoop.ts] ////

//// [newLexicalEnvironmentForConvertedLoop.ts]
function baz(x: any) {
  return [[x, x]];
}

function foo(set: any) {
  for (const [value, i] of baz(set.values)) {
    const bar: any = [];
    (() => bar);

    set.values.push(...[]);
  }
};

//// [newLexicalEnvironmentForConvertedLoop.js]
function baz(x) {
    return [[x, x]];
}
function foo(set) {
    for (const [value, i] of baz(set.values)) {
        const bar = [];
        (() => bar);
        set.values.push(...[]);
    }
}
;
