//// [tests/cases/compiler/infinitelyExpandingTypes5.ts] ////

//// [infinitelyExpandingTypes5.ts]
interface Query<T> {
    foo(x: T): Query<T[]>;
}

interface Enumerator<T> {
    (action: (item: T, index: number) => boolean): boolean;
}

function from<T>(array: T[]): Query<T>;
function from<T>(enumerator: Enumerator<T>): Query<T>;
function from(arg: any): any {
    return undefined;
}


//// [infinitelyExpandingTypes5.js]
function from(arg) {
    return undefined;
}
