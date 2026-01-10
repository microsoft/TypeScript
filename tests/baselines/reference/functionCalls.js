//// [tests/cases/conformance/expressions/functionCalls/functionCalls.ts] ////

//// [functionCalls.ts]
// Invoke function call on value of type 'any' with no type arguments
declare var anyVar: any;
anyVar(0);
anyVar('');

// Invoke function call on value of type 'any' with type arguments
// These should be errors
anyVar<string>('hello');
anyVar<number>();
anyVar<Window>(undefined);


// Invoke function call on value of a subtype of Function with no call signatures with no type arguments
interface SubFunc extends Function {
    prop: number;
}
declare var subFunc: SubFunc;
subFunc(0);
subFunc('');
subFunc();


// Invoke function call on value of a subtype of Function with no call signatures with type arguments
// These should be errors
subFunc<number>(0);
subFunc<string>('');
subFunc<any>();

// Invoke function call on value of type Function with no call signatures with type arguments
// These should be errors
declare var func: Function;
func<number>(0);
func<string>('');
func<any>();


//// [functionCalls.js]
anyVar(0);
anyVar('');
// Invoke function call on value of type 'any' with type arguments
// These should be errors
anyVar('hello');
anyVar();
anyVar(undefined);
subFunc(0);
subFunc('');
subFunc();
// Invoke function call on value of a subtype of Function with no call signatures with type arguments
// These should be errors
subFunc(0);
subFunc('');
subFunc();
func(0);
func('');
func();
