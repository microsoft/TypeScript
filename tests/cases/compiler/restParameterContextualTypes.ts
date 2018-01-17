// @strictNullChecks: true
type ComplexCalls = {
    (): string;
    (a: number): string;
    (a: {x: number}, b: string): string;
    (a: symbol, ...rest: {y: string}[]): string;
    (...rest: {z: string}[]): string;
};

const x: ComplexCalls = (...rest) => rest.toString();

const y: ComplexCalls = (_a = 1, ...rest) => rest.toString();

const z: ComplexCalls = (_a = 1, _b = "", ...rest) => rest.toString();

const more: ComplexCalls = (_a = 1, _b = "", _c = { z: "" }, ...rest) => rest.toString();
