// @strict: true
type Errors<T> = { [P in keyof T]: string | undefined } & {all: string | undefined};
function foo<T>() {
    let obj!: Errors<T>
    let x!: keyof T;
    obj[x] = undefined;
}
