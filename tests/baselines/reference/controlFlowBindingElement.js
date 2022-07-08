//// [controlFlowBindingElement.ts]
{
    const data =  { param: 'value' };

    const {
        param = (() => { throw new Error('param is not defined') })(),
    } = data;
    
    console.log(param); // should not trigger 'Unreachable code detected.'    
}


{
    const data =  { param: 'value' };

    let foo: string | undefined = "";
    const {
        param = (() => { throw new Error('param is not defined') })(),
    } = data;
    
    foo;  // should be string  
}

{
    const data =  { param: 'value' };

    let foo: string | undefined = "";
    const {
        param = (() => { foo = undefined })(),
    } = data;
    
    foo;  // should be string | undefined
}

{
    const data =  { param: 'value' };

    let foo: string | undefined = "";
    const {
        param = (() => { return "" + 1 })(),
    } = data;
    
    foo;  // should be string
}


//// [controlFlowBindingElement.js]
{
    var data = { param: 'value' };
    var _a = data.param, param = _a === void 0 ? (function () { throw new Error('param is not defined'); })() : _a;
    console.log(param); // should not trigger 'Unreachable code detected.'    
}
{
    var data = { param: 'value' };
    var foo = "";
    var _b = data.param, param = _b === void 0 ? (function () { throw new Error('param is not defined'); })() : _b;
    foo; // should be string  
}
{
    var data = { param: 'value' };
    var foo_1 = "";
    var _c = data.param, param = _c === void 0 ? (function () { foo_1 = undefined; })() : _c;
    foo_1; // should be string | undefined
}
{
    var data = { param: 'value' };
    var foo = "";
    var _d = data.param, param = _d === void 0 ? (function () { return "" + 1; })() : _d;
    foo; // should be string
}
