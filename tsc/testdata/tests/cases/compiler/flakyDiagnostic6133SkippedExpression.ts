// @declaration: true
// @noUnusedLocals: true

const unused = { value: 1 };
export enum Example {
    [unused.value] = 0
}
