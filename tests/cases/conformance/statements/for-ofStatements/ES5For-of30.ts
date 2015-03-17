var a: string, b: number;
var tuple: [number, string] = [2, "3"];
for ([a = 1, b = ""] of tuple) {
    a;
    b;
}