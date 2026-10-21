// @declaration: true
// @noUnusedLocals: true

// TS6133 must not report 'unused' as unread: the computed name references it.
const unused = { value: 1 };
export enum Example {
    [unused.value] = 0
}
