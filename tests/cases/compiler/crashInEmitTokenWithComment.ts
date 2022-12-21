// @noTypesAndSymbols: true

// GH#32358
const fn = (param: string) => undefined;

const foo = {bar: 'a'};
fn(({[foo.bar]: c}) => undefined);