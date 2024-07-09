// @declaration: true

// @Filename: file1.ts

declare class C1 { }

interface C1 { }

interface C2 { }

declare class C2 { }

class C3 { }

interface C3 { }

interface C4 { }

class C4 { }

interface C5 {
    x1: number;
}

declare class C5 {
    x2: number;
}

interface C5 {
    x3: number;
}

interface C5 {
    x4: number;
}

// checks if properties actually were merged
var c5 : C5;
c5.x1;
c5.x2;
c5.x3;
c5.x4;

// @Filename: file2.ts

declare class C6 { }

interface C7 { }

// @Filename: file3.ts

interface C6 { }

declare class C7 { }