// @strictNullChecks: true
// @allowUnreachableCode: false
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
