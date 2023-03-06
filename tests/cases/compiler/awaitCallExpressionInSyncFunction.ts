// @target: esnext

function foo() {
   const foo = await(Promise.resolve(1));
   return foo;
}
