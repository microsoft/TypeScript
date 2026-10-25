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
