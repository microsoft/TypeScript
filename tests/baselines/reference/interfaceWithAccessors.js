//// [interfaceWithAccessors.ts]
interface I0 {
    get x(): number;
    set x(value);
}

interface I1 {
    get x(): number;
}

interface I1 {
    set x(value);
}



//// [interfaceWithAccessors.js]


//// [interfaceWithAccessors.d.ts]
interface I0 {
    get x(): number;
    set x(value: number);
}
interface I1 {
    get x(): number;
}
interface I1 {
    set x(value: number);
}
