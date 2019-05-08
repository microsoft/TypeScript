// @target: ES6

function CreateTypedArrayTypes() {
    var typedArrays = [];
    typedArrays[0] = Int8Array;
    typedArrays[1] = Uint8Array;
    typedArrays[2] = Int16Array;
    typedArrays[3] = Uint16Array;
    typedArrays[4] = Int32Array;
    typedArrays[5] = Uint32Array;
    typedArrays[6] = Float32Array;
    typedArrays[7] = Float64Array;
    typedArrays[8] = Uint8ClampedArray;

    return typedArrays;
}

function CreateTypedArrayInstancesFromLength(obj: number) {
    var typedArrays = [];
    typedArrays[0] = new Int8Array(obj);
    typedArrays[1] = new Uint8Array(obj);
    typedArrays[2] = new Int16Array(obj);
    typedArrays[3] = new Uint16Array(obj);
    typedArrays[4] = new Int32Array(obj);
    typedArrays[5] = new Uint32Array(obj);
    typedArrays[6] = new Float32Array(obj);
    typedArrays[7] = new Float64Array(obj);
    typedArrays[8] = new Uint8ClampedArray(obj);

    return typedArrays;
}

function CreateTypedArrayInstancesFromArray(obj: number[]) {
    var typedArrays = [];
    typedArrays[0] = new Int8Array(obj);
    typedArrays[1] = new Uint8Array(obj);
    typedArrays[2] = new Int16Array(obj);
    typedArrays[3] = new Uint16Array(obj);
    typedArrays[4] = new Int32Array(obj);
    typedArrays[5] = new Uint32Array(obj);
    typedArrays[6] = new Float32Array(obj);
    typedArrays[7] = new Float64Array(obj);
    typedArrays[8] = new Uint8ClampedArray(obj);

    return typedArrays;
}

function CreateIntegerTypedArraysFromArray2(obj:number[]) {
    var typedArrays = [];
    typedArrays[0] = Int8Array.from(obj);
    typedArrays[1] = Uint8Array.from(obj);
    typedArrays[2] = Int16Array.from(obj);
    typedArrays[3] = Uint16Array.from(obj);
    typedArrays[4] = Int32Array.from(obj);
    typedArrays[5] = Uint32Array.from(obj);
    typedArrays[6] = Float32Array.from(obj);
    typedArrays[7] = Float64Array.from(obj);
    typedArrays[8] = Uint8ClampedArray.from(obj);

    return typedArrays;
}

function CreateIntegerTypedArraysFromArrayLike(obj:ArrayLike<number>) {
    var typedArrays = [];
    typedArrays[0] = Int8Array.from(obj);
    typedArrays[1] = Uint8Array.from(obj);
    typedArrays[2] = Int16Array.from(obj);
    typedArrays[3] = Uint16Array.from(obj);
    typedArrays[4] = Int32Array.from(obj);
    typedArrays[5] = Uint32Array.from(obj);
    typedArrays[6] = Float32Array.from(obj);
    typedArrays[7] = Float64Array.from(obj);
    typedArrays[8] = Uint8ClampedArray.from(obj);

    return typedArrays;
}

function CreateTypedArraysOf(obj) {
    var typedArrays = [];
    typedArrays[0] = Int8Array.of(...obj);
    typedArrays[1] = Uint8Array.of(...obj);
    typedArrays[2] = Int16Array.of(...obj);
    typedArrays[3] = Uint16Array.of(...obj);
    typedArrays[4] = Int32Array.of(...obj);
    typedArrays[5] = Uint32Array.of(...obj);
    typedArrays[6] = Float32Array.of(...obj);
    typedArrays[7] = Float64Array.of(...obj);
    typedArrays[8] = Uint8ClampedArray.of(...obj);

    return typedArrays;
}

function CreateTypedArraysOf2() {
    var typedArrays = [];
    typedArrays[0] = Int8Array.of(1,2,3,4);
    typedArrays[1] = Uint8Array.of(1,2,3,4);
    typedArrays[2] = Int16Array.of(1,2,3,4);
    typedArrays[3] = Uint16Array.of(1,2,3,4);
    typedArrays[4] = Int32Array.of(1,2,3,4);
    typedArrays[5] = Uint32Array.of(1,2,3,4);
    typedArrays[6] = Float32Array.of(1,2,3,4);
    typedArrays[7] = Float64Array.of(1,2,3,4);
    typedArrays[8] = Uint8ClampedArray.of(1,2,3,4);

    return typedArrays;
}

function CreateTypedArraysFromMapFn2<T>(obj:ArrayLike<T>, mapFn: (n:T, v:number)=> number) {
    var typedArrays = [];
    typedArrays[0] = Int8Array.from(obj, mapFn);
    typedArrays[1] = Uint8Array.from(obj, mapFn);
    typedArrays[2] = Int16Array.from(obj, mapFn);
    typedArrays[3] = Uint16Array.from(obj, mapFn);
    typedArrays[4] = Int32Array.from(obj, mapFn);
    typedArrays[5] = Uint32Array.from(obj, mapFn);
    typedArrays[6] = Float32Array.from(obj, mapFn);
    typedArrays[7] = Float64Array.from(obj, mapFn);
    typedArrays[8] = Uint8ClampedArray.from(obj, mapFn);

    return typedArrays;
}

function CreateTypedArraysFromMapFn(obj:ArrayLike<number>, mapFn: (n:number, v:number)=> number) {
    var typedArrays = [];
    typedArrays[0] = Int8Array.from(obj, mapFn);
    typedArrays[1] = Uint8Array.from(obj, mapFn);
    typedArrays[2] = Int16Array.from(obj, mapFn);
    typedArrays[3] = Uint16Array.from(obj, mapFn);
    typedArrays[4] = Int32Array.from(obj, mapFn);
    typedArrays[5] = Uint32Array.from(obj, mapFn);
    typedArrays[6] = Float32Array.from(obj, mapFn);
    typedArrays[7] = Float64Array.from(obj, mapFn);
    typedArrays[8] = Uint8ClampedArray.from(obj, mapFn);

    return typedArrays;
}

function CreateTypedArraysFromThisObj(obj:ArrayLike<number>, mapFn: (n:number, v:number)=> number, thisArg: {}) {
    var typedArrays = [];
    typedArrays[0] = Int8Array.from(obj, mapFn, thisArg);
    typedArrays[1] = Uint8Array.from(obj, mapFn, thisArg);
    typedArrays[2] = Int16Array.from(obj, mapFn, thisArg);
    typedArrays[3] = Uint16Array.from(obj, mapFn, thisArg);
    typedArrays[4] = Int32Array.from(obj, mapFn, thisArg);
    typedArrays[5] = Uint32Array.from(obj, mapFn, thisArg);
    typedArrays[6] = Float32Array.from(obj, mapFn, thisArg);
    typedArrays[7] = Float64Array.from(obj, mapFn, thisArg);
    typedArrays[8] = Uint8ClampedArray.from(obj, mapFn, thisArg);

    return typedArrays;
}

function CreateTypedArraysFromThisObj2<T>(obj:ArrayLike<T>, mapFn: (n:T, v:number)=> number, thisArg: {}) {
    var typedArrays = [];
    typedArrays[0] = Int8Array.from(obj, mapFn, thisArg);
    typedArrays[1] = Uint8Array.from(obj, mapFn, thisArg);
    typedArrays[2] = Int16Array.from(obj, mapFn, thisArg);
    typedArrays[3] = Uint16Array.from(obj, mapFn, thisArg);
    typedArrays[4] = Int32Array.from(obj, mapFn, thisArg);
    typedArrays[5] = Uint32Array.from(obj, mapFn, thisArg);
    typedArrays[6] = Float32Array.from(obj, mapFn, thisArg);
    typedArrays[7] = Float64Array.from(obj, mapFn, thisArg);
    typedArrays[8] = Uint8ClampedArray.from(obj, mapFn, thisArg);

    return typedArrays;
}