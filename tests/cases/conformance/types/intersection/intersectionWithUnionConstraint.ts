// @strict: true

function f1<T extends string | number, U extends string | number>(x: T & U) {
    // Combined constraint of 'T & U' is 'string | number'
    let y: string | number = x;
}

function f2<T extends string | number | undefined, U extends string | null | undefined>(x: T & U) {
    let y1: string | number = x;     // Error
    let y2: string | null = x;       // Error
    let y3: string | undefined = x;
    let y4: number | null = x;       // Error
    let y5: number | undefined = x;  // Error
    let y6: null | undefined = x;    // Error
}

type T1 = (string | number | undefined) & (string | null | undefined);  // string | undefined

function f3<T extends string | number | undefined>(x: T & (number | object | undefined)) {
    const y: number | undefined = x;
}

function f4<T extends string | number>(x: T & (number | object)) {
    const y: number = x;
}

function f5<T, U extends keyof T>(x: keyof T & U) {
    let y: keyof any = x;
}

// Repro from #23648

type Example<T, U> = { [K in keyof T]: K extends keyof U ? UnexpectedError<K> : NoErrorHere<K> }

type UnexpectedError<T extends PropertyKey> = T
type NoErrorHere<T extends PropertyKey> = T

// Repro from #30331

type a<T> = T extends Array<infer U> ? U : never;
type b<T> = { [K in a<T> & keyof T ]: 42 };
