// @target: es2015
// @useDefineForClassFields: false

// Bug 2: Named evaluation missing in destructuring assignment elements.
// Anonymous class expressions used as default values in destructuring
// assignments should receive their inferred name.

let x: any;

// Array destructuring assignment with anonymous class default
[x = class { static #y = 1; }] = [];

// Object destructuring assignment (shorthand) with anonymous class default
({ x = class { static #z = 2; } } = {} as any);

// Object destructuring assignment (property) with anonymous class default
({ y: x = class { static #w = 3; } } = {} as any);
