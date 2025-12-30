// @strict: true

// Issue #62779: Type parameter leak caused by `this` and reverse mapped type
declare function testReverseMapped<T extends Record<string, unknown>>(obj: {
    [K in keyof T]: () => T[K];
}): T;

const obj = testReverseMapped({
    a() {
        return 0;
    },
    b() {
        return this.a();
    },
});

// Intersection with mapped type
declare function testReverseMapped2<T extends Record<string, unknown>, T2>(
    obj: T2 & {
        [K in keyof T]: () => T[K];
    },
): T;

const obj2 = testReverseMapped2({
    a() {
        return 0;
    },
    b() {
        return this.a();
    },
});

// Union with mapped type
declare function testReverseMapped3<T extends Record<string, unknown>, T2>(
    obj: T2 | {
        [K in keyof T]: () => T[K];
    },
): T;

const obj3 = testReverseMapped3({
    a() {
        return 0;
    },
    b() {
        return this.a();
    },
});
