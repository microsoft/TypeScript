// @declaration: true
type Apple = /apple/i;
export type Banana = /banana/i;
const x = {
    a: "apple" as Apple,
    b: "banana" as Banana,
    c: "banana" as /banana/i
}
export default x;