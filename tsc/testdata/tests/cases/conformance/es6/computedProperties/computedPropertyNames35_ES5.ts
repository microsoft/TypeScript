// @target: es5, es2015
function foo<T>() { return '' }
interface I<T> {
    bar(): string;
    [foo<T>()](): void;
}