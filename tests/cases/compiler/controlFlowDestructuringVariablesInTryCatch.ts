// @strict: true

declare function f1(): string;
declare function f2(): [b: string];
declare function f3(): { c: string };

try {
    var a = f1();
    var [b] = f2();
    var { c } = f3();
} catch {
    console.error("error");
}

a;
b;
c;
