// @strict: true
// @declaration: true

const a: string | undefined = 'ff';
const foo = { a! }

const bar = {
    a ? () { }
}