// @target: es5
function foo<T>() { return '' }
interface I<T> {
    bar(): string;
    [foo<T>()](): void;
}