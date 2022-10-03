//// [mergedInterfacesWithIndexers2.ts]
// indexers should behave like other members when merging interface declarations

interface A {
    [x: number]: string; // error
}


interface A {
    [x: string]: { length: string }; // error
}

interface A2 {
    [x: number]: string;
    'a': number; //error
}


interface A2 {
    [x: string]: { length: number };
    1: { length: number }; // error
}


//// [mergedInterfacesWithIndexers2.js]
// indexers should behave like other members when merging interface declarations
