class C1 {
    [index: string]: string
    one!: string;
}

class C2 {
    one!: string;
}

class C3 {
    one!: number;
    two!: string;
}

declare var x: C1;
declare var a: C2;
declare var b: C3;

x = a;
x = b;