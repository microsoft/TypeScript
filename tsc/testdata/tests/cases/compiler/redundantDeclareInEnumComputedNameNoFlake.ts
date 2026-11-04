// @target: esnext
// @declaration: true

// TS1038: A 'declare' modifier cannot be used in an already ambient context.
export enum Values {
    [(function () {
        declare namespace Nested {
            declare const value: number;
        }
    }).name] = 1,
}