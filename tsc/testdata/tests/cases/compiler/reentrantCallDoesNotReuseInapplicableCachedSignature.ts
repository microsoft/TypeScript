// @strict: true
// @noEmit: true

declare const example: (f: (a: string) => number) => string;

const f = (a: string) => g();

const g = () => {
    return example(f);
};
