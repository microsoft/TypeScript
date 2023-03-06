// @strict: true
// @noUncheckedIndexedAccess: true

const match = ''.match(/ /)

if (match !== null) {
    const foo: string = match[0]
    const bar: string = match[1]
}
