//// [genericNewInterface.ts]
function createInstance<T>(ctor: new (s: string) => T): T {
    return new ctor(42); //should be an error
}
                   
interface INewable<T> {
    new (param: string): T;
}

function createInstance2<T>(ctor: INewable<T>): T {
    return new ctor(1024); //should be an error
}

//// [genericNewInterface.js]
function createInstance(ctor) {
    return new ctor(42); //should be an error
}
function createInstance2(ctor) {
    return new ctor(1024); //should be an error
}
