// @strict: true
const fn1 = <Params>(
    params: Pick<Params, Exclude<keyof Params, never>>,
): Params => params;

function fn2<T>(x: Exclude<T, never>) {
    var y: T = x;
    x = y;
}

const fn3 = <Params>(
    params: Pick<Params, Extract<keyof Params, keyof Params>>,
): Params => params;

function fn4<T>(x: Extract<T, T>) {
    var y: T = x;
    x = y;
}
