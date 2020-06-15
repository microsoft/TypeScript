//// [topLevelAwaitErrors.ts]
export const x = 1;

// reparse call as invalid await should error
await (x,);
await <number, string>(x);

// reparse tagged template as invalid await should error
await <number, string> ``;

// reparse variable names and patterns as await should fail
var await = 1;
var {await} = {await:1};
var [await] = [1];

// reparse class extends clause should fail
class C extends await<string> {
}

//// [topLevelAwaitErrors.js]
export const x = 1;
// reparse call as invalid await should error
await (x, );
await , string > (x);
// reparse tagged template as invalid await should error
await , string > ``;
// reparse variable names and patterns as await should fail
var await = 1;
var { await } = { await: 1 };
var [await] = [1];
// reparse class extends clause should fail
class C extends  {
}
