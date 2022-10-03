declare class C1 {
    x : number;
}

interface C1 {
    y : number;
}

class C2 implements C1 { // error -- missing x
}

class C3 implements C1 { // error -- missing y
    x : number;
}

class C4 implements C1 { // error -- missing x
    y : number;
}

class C5 implements C1 { // okay
    x : number;
    y : number;
}