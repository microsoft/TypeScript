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
    const data = { param: 'value' };
    const { param = (() => { throw new Error('param is not defined'); })(), } = data;
    console.log(param); // should not trigger 'Unreachable code detected.'    
}
{
    const data = { param: 'value' };
    let foo = "";
    const { param = (() => { throw new Error('param is not defined'); })(), } = data;
    foo; // should be string  
}
{
    const data = { param: 'value' };
    let foo = "";
    const { param = (() => { foo = undefined; })(), } = data;
    foo; // should be string | undefined
}
{
    const data = { param: 'value' };
    let foo = "";
    const { param = (() => { return "" + 1; })(), } = data;
    foo; // should be string
}
{
    let foo;
    let window = {};
    window.window = window;
    const { [(() => { foo = ""; return 'window'; })()]: { [(() => { return 'window'; })()]: bar } } = window;
    foo; // should be string
}
{
    let foo;
    let window = {};
    window.window = window;
    const { [(() => { return 'window'; })()]: { [(() => { foo = ""; return 'window'; })()]: bar } } = window;
    foo; // should be string
}
{
    let foo;
    let window = {};
    window.window = window;
    const { [(() => { return 'window'; })()]: { [(() => { return 'window'; })()]: bar = (() => { foo = ""; return window; })() } } = window;
    foo; // should be string | undefined
}
