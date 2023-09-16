//// [tests/cases/conformance/controlFlow/controlFlowBindingElement.ts] ////

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

{
    interface Window {
        window: Window;
    }

    let foo: string | undefined;
    let window = {} as Window;
    window.window = window;

    const { [(() => { foo = ""; return 'window' as const })()]:
        { [(() => { return 'window' as const })()]: bar } } = window;

    foo;  // should be string
}

{
    interface Window {
        window: Window;
    }

    let foo: string | undefined;
    let window = {} as Window;
    window.window = window;

    const { [(() => {  return 'window' as const })()]:
        { [(() => { foo = ""; return 'window' as const })()]: bar } } = window;

    foo;  // should be string
}

{
    interface Window {
        window: Window;
    }

    let foo: string | undefined;
    let window = {} as Window;
    window.window = window;

    const { [(() => { return 'window' as const })()]:
        { [(() => { return 'window' as const })()]: bar = (() => { foo = ""; return window; })() } } = window;

    foo;  // should be string | undefined
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
{
    var foo_2;
    var window_1 = {};
    window_1.window = window_1;
    var _e = window_1, _f = (function () { foo_2 = ""; return 'window'; })(), _g = (function () { return 'window'; })(), bar = _e[_f][_g];
    foo_2; // should be string
}
{
    var foo_3;
    var window_2 = {};
    window_2.window = window_2;
    var _h = window_2, _j = (function () { return 'window'; })(), _k = (function () { foo_3 = ""; return 'window'; })(), bar = _h[_j][_k];
    foo_3; // should be string
}
{
    var foo_4;
    var window_3 = {};
    window_3.window = window_3;
    var _l = window_3, _m = (function () { return 'window'; })(), _o = (function () { return 'window'; })(), _p = _l[_m][_o], bar = _p === void 0 ? (function () { foo_4 = ""; return window_3; })() : _p;
    foo_4; // should be string | undefined
}
