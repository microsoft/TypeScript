// TODO: FIXME: All the below cases labeled `no error` _should be an error_, and are only prevented from so being
// by incorrect variance-based relationships
// Ref: https://github.com/Microsoft/TypeScript/issues/29698

type Record2<K extends keyof any, T> = {
    [P in K]: T;
};

function defaultRecord(x: Record<'a', string>, y: Record<string, string>) {
    x = y; // no error, but error expected.
}

function customRecord(x: Record2<'a', string>, y: Record2<string, string>) {
    x = y; // no error, but error expected.
}

function mixed1(x: Record2<'a', string>, y: Record<string, string>) {
    x = y; // error
}

function mixed2(x: Record<'a', string>, y: Record2<string, string>) {
    x = y; // error
}

function defaultRecord2<T>(x: Record<'a', T>, y: Record<string, T>) {
    x = y; // no error, but error expected.
}

function customRecord2<T>(x: Record2<'a', T>, y: Record2<string, T>) {
    x = y; // no error, but error expected.
}

function mixed3<T>(x: Record2<'a', T>, y: Record<string, T>) {
    x = y; // error
}

function mixed4<T>(x: Record<'a', T>, y: Record2<string, T>) {
    x = y; // error
}
