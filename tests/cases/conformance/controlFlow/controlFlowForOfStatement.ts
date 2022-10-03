let obj: number[];
let x: string | number | boolean | RegExp;

function a() {
    x = true;
    for (x of obj) {
        x = x.toExponential();
    }
    x; // string | boolean
}
