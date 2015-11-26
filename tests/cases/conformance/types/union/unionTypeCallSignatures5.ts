interface A {
    (number) : number;
}

var f1: string | number;
f1(); //error TS2658

var f2: string | A;
f2(); //error TS2658

var f3: string[] | number[];
f3.map(value=>value); //should not throw TS2349