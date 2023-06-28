// @target: es5, esnext

declare let obj: { [s: string]: string };

for (let [b, ...c] in obj) {
    b;
    c;
}
