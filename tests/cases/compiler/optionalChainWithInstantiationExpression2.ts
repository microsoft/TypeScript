// @target: es2019,es2020

declare interface A {
    c: number;
    <T>(): T;
}

type b = 'b type';

declare const a: A | undefined;

a?.<b>();

a<b>?.();
