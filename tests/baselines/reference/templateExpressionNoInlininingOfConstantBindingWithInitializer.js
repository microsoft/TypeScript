//// [tests/cases/compiler/templateExpressionNoInlininingOfConstantBindingWithInitializer.ts] ////

//// [templateExpressionNoInlininingOfConstantBindingWithInitializer.ts]
type Params = {
  value?: string | number
}

function example(parameters: Params) {
  const { value = '123' } = parameters
  return `${value}` === '345'
}

function example2(parameters: Params) {
  const { value = '123' } = parameters
  const b = `${value}`;
  return b;
}


//// [templateExpressionNoInlininingOfConstantBindingWithInitializer.js]
function example(parameters) {
    var _a = parameters.value, value = _a === void 0 ? '123' : _a;
    return "".concat(value) === '345';
}
function example2(parameters) {
    var _a = parameters.value, value = _a === void 0 ? '123' : _a;
    var b = "".concat(value);
    return b;
}
