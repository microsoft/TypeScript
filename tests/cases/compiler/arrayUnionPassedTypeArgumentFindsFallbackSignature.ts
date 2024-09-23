export function groupBy<T>(array: Array<T> | ReadonlyArray<T>) {
    array.reduce<any>((acc, element) => {
        throw new Error();
    }, {});
}
