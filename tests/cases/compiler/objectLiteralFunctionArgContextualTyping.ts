interface I {
    value: string;
    toString: (t: string) => string;
}

function f2(args: I) { }

f2({ hello: 1 }) // error 
f2({ value: '' }) // missing toString satisfied by Object's member
f2({ value: '', what: 1 }) // missing toString satisfied by Object's member
f2({ toString: (s) => s }) // error, missing property value from ArgsString
f2({ toString: (s: string) => s }) // error, missing property value from ArgsString
f2({ value: '', toString: (s) => s.uhhh }) // error