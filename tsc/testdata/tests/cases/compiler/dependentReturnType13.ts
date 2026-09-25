// @noEmit: true
// @strict: true


// Restrictions on what kind of union types can be narrowed.

function f1<T extends string | string[]>(param: T):
    T extends string ? 1 :
    T extends string[] ? 2 :
    never {
    if (Array.isArray(param)) {
        return 2;
    }
    return 1;
}

function f2<T extends string | string[] | number[]>(param: T):
    T extends string ? 1 :
    T extends string[] | number[] ? 2 :
    never {
    if (Array.isArray(param)) {
        return 2;
    }
    return 1;
}

declare function isNumberArray(x: unknown): x is number[];

function f3<T extends string | string[] | number[]>(param: T): // Bad.
    T extends string ? 1 :
    T extends string[] ? 2 :
    T extends number[] ? 3 :
    never {
    if (isNumberArray(param)) {
        return 3;
    }
    if (Array.isArray(param)) {
        return 2;
    }
    return 1;
}

class Dog {
    bark(): void {}
}

class Cat {
    meow(): void {}

}

function f4<T extends Cat | Dog>(param: T): // Bad.
    T extends Cat ? 1 :
    T extends Dog ? 2 :
    never {
    if ('bark' in param) {
        const _: Dog = param;
        return 2;
    }
    const _: Cat = param;
    return 1;
}

function f5<T extends string | number | string[]>(param: T):
    T extends string ? 1 :
    T extends number | string[] ? 2 :
    never {
    if (Array.isArray(param) || typeof param === "number") {
        const _: string[] | number = param;
        return 2;
    }
    const _: string = param;
    return 1;
}

function f6<T extends string | number[] | string[], U extends boolean>(param: T, other: U):
    T extends number[] ? 2 :
        U extends true ?
            T extends string[] ? 3 :
            T extends string ? 1 :
            never :
        U extends false ?
            T extends string[] ? 4 :
            T extends string ? 5 :
            never :
        never {
    if (isNumberArray(param)) {
        return 2;
    }
    if (other) {
        if (Array.isArray(param)) {
            return 3;
        }
        return 1;
    }
    if (Array.isArray(param)) {
        return 4;
    }
    return 5;
}

function f7<T extends string | string[], U extends number | number[]>(param: T, other: U):
    U extends number ?
        T extends string[] ? 2 :
        T extends string ? 1 :
        never :
    U extends number[] ?
        T extends string[] ? 4 :
        T extends string ? 3 :
        never :
    never {
    if (Array.isArray(other)) {
        if (Array.isArray(param)) {
            return 4;
        }
        return 3;
    }
    if (Array.isArray(param)) {
        return 2;
    }
    return 1;
}