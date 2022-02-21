// @useUnknownInCatchVariables: true, false
// @strict: true, false

try {}
catch ({ name }) { name; }

try {}
catch ({ name }) {}

try {}
catch ({ a: { b } }) { b; }

try {}
catch ({ a: { b } }) {}

try {}
catch ([a, { b }]) { a; }

try {}
catch ([a, { b }]) {}
