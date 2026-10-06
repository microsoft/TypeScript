// @target: esnext
// @declaration: true

export enum Values {
    [(function () {
        declare namespace Nested {
            declare const value: number;
        }
    }).name] = 1,
}