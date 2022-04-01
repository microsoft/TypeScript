// @useUnknownInCatchVariables: true, false
// @strict: true, false

try {}
catch ({ name }: unknown) { name; }

try {}
catch ({ name }: unknown) {}

try {}
catch ({ a: { b } }: unknown) { b; }

try {}
catch ({ a: { b } }: unknown) {}

try {}
catch ([a, { b }]: unknown) { a; }

try {}
catch ([a, { b }]: unknown) {}
