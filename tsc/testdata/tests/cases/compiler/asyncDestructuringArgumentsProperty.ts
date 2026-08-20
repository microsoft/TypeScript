// @target: es2015

async function f() {
  const { arguments: args } = await { arguments: 42 };
  return args;
}
