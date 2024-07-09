interface I2 {
    value: string;
    doStuff: (t: string) => string;
}

function f2(args: I2) { }

f2({ hello: 1 }) 
f2({ value: '' })
f2({ value: '', what: 1 }) 
f2({ toString: (s) => s }) 
f2({ toString: (s: string) => s }) 
f2({ value: '', toString: (s) => s.uhhh }) 