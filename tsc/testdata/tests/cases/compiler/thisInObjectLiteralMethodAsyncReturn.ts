// @strict: true
// @target: es2017
// https://github.com/microsoft/TypeScript/issues/64954

const test1 = async () => {
    return {
        value: 5,
        method() {
            this satisfies { value: number, method(): void };
        },
    };
};

const test2: () => Promise<{
    value: number;
    method(): void;
}> = async () => {
    return {
        value: 5,
        method() {
            this satisfies { value: number, method(): void };
        },
    };
};

// Ordinary, non-async object literal with thenable contextual type
type T = {
    then(cb: (n: number) => void): void;
    value?: number;
    method(): void;
};
const x: T = {
    then() {},
    method() {
        this.value = 1;
    },
};

