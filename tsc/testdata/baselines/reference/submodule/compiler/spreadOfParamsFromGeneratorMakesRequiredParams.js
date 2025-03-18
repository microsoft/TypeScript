//// [tests/cases/compiler/spreadOfParamsFromGeneratorMakesRequiredParams.ts] ////

//// [spreadOfParamsFromGeneratorMakesRequiredParams.ts]
declare function call<Fn extends (...args: any[]) => any>(
    fn: Fn,
    ...args: Parameters<Fn>
): any;

call(function* (a: 'a') { }); // error, 2nd argument required

//// [spreadOfParamsFromGeneratorMakesRequiredParams.js]
call(function* (a) { });
