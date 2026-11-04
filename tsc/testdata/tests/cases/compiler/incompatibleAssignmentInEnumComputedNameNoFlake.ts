// @declaration: true

// TS2322: Type 'string' is not assignable to type 'number'.
let target: number;
enum E {
    [(() => {
        const text = (target = "value");
        return text.length;
    })()]
}