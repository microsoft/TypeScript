//// [valueOfTypedArray.ts]
// All declarations should pass, as valueOf has been specialized for all TypedArrays
const typedArray0: Int8Array = (new Int8Array()).valueOf();
const typedArray1: Uint8Array = (new Uint8Array()).valueOf();
const typedArray2: Int16Array = (new Int16Array()).valueOf();
const typedArray3: Uint16Array = (new Uint16Array()).valueOf();
const typedArray4: Int32Array = (new Int32Array()).valueOf();
const typedArray5: Uint32Array = (new Uint32Array()).valueOf();
const typedArray6: Float32Array = (new Float32Array()).valueOf();
const typedArray7: Float64Array = (new Float64Array()).valueOf();
const typedArray8: BigInt64Array = (new BigInt64Array()).valueOf();
const typedArray9: BigUint64Array = (new BigUint64Array()).valueOf();


//// [valueOfTypedArray.js]
// All declarations should pass, as valueOf has been specialized for all TypedArrays
const typedArray0 = (new Int8Array()).valueOf();
const typedArray1 = (new Uint8Array()).valueOf();
const typedArray2 = (new Int16Array()).valueOf();
const typedArray3 = (new Uint16Array()).valueOf();
const typedArray4 = (new Int32Array()).valueOf();
const typedArray5 = (new Uint32Array()).valueOf();
const typedArray6 = (new Float32Array()).valueOf();
const typedArray7 = (new Float64Array()).valueOf();
const typedArray8 = (new BigInt64Array()).valueOf();
const typedArray9 = (new BigUint64Array()).valueOf();
