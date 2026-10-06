// @declaration: true

let target: number;
enum E {
    [(() => {
        const text = (target = "value");
        return text.length;
    })()]
}