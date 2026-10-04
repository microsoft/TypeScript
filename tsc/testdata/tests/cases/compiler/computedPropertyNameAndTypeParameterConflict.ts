// @target: es2015
// @declaration: true
declare const O: unique symbol;
declare class Bar<O> {
    [O]: number;
}

