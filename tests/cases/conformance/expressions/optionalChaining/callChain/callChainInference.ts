// @strict: true

// Repro from #42404

interface Y {
    foo<T>(this: T, arg: keyof T): void;
    a: number;
    b: string;
}

declare const value: Y | undefined;

if (value) {
    value?.foo("a");
}

value?.foo("a");
