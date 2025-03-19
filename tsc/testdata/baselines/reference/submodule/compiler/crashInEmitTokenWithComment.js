//// [tests/cases/compiler/crashInEmitTokenWithComment.ts] ////

//// [crashInEmitTokenWithComment.ts]
// GH#32358
const fn = (param: string) => undefined;

const foo = {bar: 'a'};
fn(({[foo.bar]: c}) => undefined);

//// [crashInEmitTokenWithComment.js]
// GH#32358
const fn = (param) => undefined;
const foo = { bar: 'a' };
fn(({ [foo.bar]: c }) => undefined);
