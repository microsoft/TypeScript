// @target: ES6
async function fAsync() {
    // Without explicit type annotation, this is just an array.
    return [1, true];
}

async function fAsyncExplicit(): Promise<[number, boolean]> {
    // This is contextually typed as a tuple.
    return [1, true];
}

// https://github.com/Microsoft/TypeScript/issues/13128
interface Obj {
    stringProp: string;
    anyProp: any;
}

async function fIndexedTypeForStringProp(obj: Obj): Promise<Obj["stringProp"]> {
    return obj.stringProp;
}

async function fIndexedTypeForPromiseOfStringProp(obj: Obj): Promise<Obj["stringProp"]> {
    return Promise.resolve(obj.stringProp);
}

async function fIndexedTypeForExplicitPromiseOfStringProp(obj: Obj): Promise<Obj["stringProp"]> {
    return Promise.resolve<Obj["stringProp"]>(obj.stringProp);
}

async function fIndexedTypeForAnyProp(obj: Obj): Promise<Obj["anyProp"]> {
    return obj.anyProp;
}

async function fIndexedTypeForPromiseOfAnyProp(obj: Obj): Promise<Obj["anyProp"]> {
    return Promise.resolve(obj.anyProp);
}

async function fIndexedTypeForExplicitPromiseOfAnyProp(obj: Obj): Promise<Obj["anyProp"]> {
    return Promise.resolve<Obj["anyProp"]>(obj.anyProp);
}

async function fGenericIndexedTypeForStringProp<TObj extends Obj>(obj: TObj): Promise<TObj["stringProp"]> {
    return obj.stringProp;
}

async function fGenericIndexedTypeForPromiseOfStringProp<TObj extends Obj>(obj: TObj): Promise<TObj["stringProp"]> {
    return Promise.resolve(obj.stringProp);
}

async function fGenericIndexedTypeForExplicitPromiseOfStringProp<TObj extends Obj>(obj: TObj): Promise<TObj["stringProp"]> {
    return Promise.resolve<TObj["stringProp"]>(obj.stringProp);
}

async function fGenericIndexedTypeForAnyProp<TObj extends Obj>(obj: TObj): Promise<TObj["anyProp"]> {
    return obj.anyProp;
}

async function fGenericIndexedTypeForPromiseOfAnyProp<TObj extends Obj>(obj: TObj): Promise<TObj["anyProp"]> {
    return Promise.resolve(obj.anyProp);
}

async function fGenericIndexedTypeForExplicitPromiseOfAnyProp<TObj extends Obj>(obj: TObj): Promise<TObj["anyProp"]> {
    return Promise.resolve<TObj["anyProp"]>(obj.anyProp);
}

async function fGenericIndexedTypeForKProp<TObj extends Obj, K extends keyof TObj>(obj: TObj, key: K): Promise<TObj[K]> {
    return obj[key];
}

async function fGenericIndexedTypeForPromiseOfKProp<TObj extends Obj, K extends keyof TObj>(obj: TObj, key: K): Promise<TObj[K]> {
    return Promise.resolve(obj[key]);
}

async function fGenericIndexedTypeForExplicitPromiseOfKProp<TObj extends Obj, K extends keyof TObj>(obj: TObj, key: K): Promise<TObj[K]> {
    return Promise.resolve<TObj[K]>(obj[key]);
}