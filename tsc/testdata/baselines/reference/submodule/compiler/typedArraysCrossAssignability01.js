//// [tests/cases/compiler/typedArraysCrossAssignability01.ts] ////

//// [typedArraysCrossAssignability01.ts]
function CheckAssignability() {
    let arr_Int8Array           = new Int8Array(1);
    let arr_Uint8Array          = new Uint8Array(1);
    let arr_Int16Array          = new Int16Array(1);
    let arr_Uint16Array         = new Uint16Array(1);
    let arr_Int32Array          = new Int32Array(1);
    let arr_Uint32Array         = new Uint32Array(1);
    let arr_Float32Array        = new Float32Array(1);
    let arr_Float64Array        = new Float64Array(1);
    let arr_Uint8ClampedArray   = new Uint8ClampedArray(1);

    arr_Int8Array = arr_Int8Array;
    arr_Int8Array = arr_Uint8Array;
    arr_Int8Array = arr_Int16Array;
    arr_Int8Array = arr_Uint16Array;
    arr_Int8Array = arr_Int32Array;
    arr_Int8Array = arr_Uint32Array;
    arr_Int8Array = arr_Float32Array;
    arr_Int8Array = arr_Float64Array;
    arr_Int8Array = arr_Uint8ClampedArray;

    arr_Uint8Array = arr_Int8Array;
    arr_Uint8Array = arr_Uint8Array;
    arr_Uint8Array = arr_Int16Array;
    arr_Uint8Array = arr_Uint16Array;
    arr_Uint8Array = arr_Int32Array;
    arr_Uint8Array = arr_Uint32Array;
    arr_Uint8Array = arr_Float32Array;
    arr_Uint8Array = arr_Float64Array;
    arr_Uint8Array = arr_Uint8ClampedArray;

    arr_Int16Array = arr_Int8Array;
    arr_Int16Array = arr_Uint8Array;
    arr_Int16Array = arr_Int16Array;
    arr_Int16Array = arr_Uint16Array;
    arr_Int16Array = arr_Int32Array;
    arr_Int16Array = arr_Uint32Array;
    arr_Int16Array = arr_Float32Array;
    arr_Int16Array = arr_Float64Array;
    arr_Int16Array = arr_Uint8ClampedArray;

    arr_Uint16Array = arr_Int8Array;
    arr_Uint16Array = arr_Uint8Array;
    arr_Uint16Array = arr_Int16Array;
    arr_Uint16Array = arr_Uint16Array;
    arr_Uint16Array = arr_Int32Array;
    arr_Uint16Array = arr_Uint32Array;
    arr_Uint16Array = arr_Float32Array;
    arr_Uint16Array = arr_Float64Array;
    arr_Uint16Array = arr_Uint8ClampedArray;

    arr_Int32Array = arr_Int8Array;
    arr_Int32Array = arr_Uint8Array;
    arr_Int32Array = arr_Int16Array;
    arr_Int32Array = arr_Uint16Array;
    arr_Int32Array = arr_Int32Array;
    arr_Int32Array = arr_Uint32Array;
    arr_Int32Array = arr_Float32Array;
    arr_Int32Array = arr_Float64Array;
    arr_Int32Array = arr_Uint8ClampedArray;

    arr_Float32Array = arr_Int8Array;
    arr_Float32Array = arr_Uint8Array;
    arr_Float32Array = arr_Int16Array;
    arr_Float32Array = arr_Uint16Array;
    arr_Float32Array = arr_Int32Array;
    arr_Float32Array = arr_Uint32Array;
    arr_Float32Array = arr_Float32Array;
    arr_Float32Array = arr_Float64Array;
    arr_Float32Array = arr_Uint8ClampedArray;

    arr_Float64Array = arr_Int8Array;
    arr_Float64Array = arr_Uint8Array;
    arr_Float64Array = arr_Int16Array;
    arr_Float64Array = arr_Uint16Array;
    arr_Float64Array = arr_Int32Array;
    arr_Float64Array = arr_Uint32Array;
    arr_Float64Array = arr_Float32Array;
    arr_Float64Array = arr_Float64Array;
    arr_Float64Array = arr_Uint8ClampedArray;

    arr_Uint8ClampedArray = arr_Int8Array;
    arr_Uint8ClampedArray = arr_Uint8Array;
    arr_Uint8ClampedArray = arr_Int16Array;
    arr_Uint8ClampedArray = arr_Uint16Array;
    arr_Uint8ClampedArray = arr_Int32Array;
    arr_Uint8ClampedArray = arr_Uint32Array;
    arr_Uint8ClampedArray = arr_Float32Array;
    arr_Uint8ClampedArray = arr_Float64Array;
    arr_Uint8ClampedArray = arr_Uint8ClampedArray;
    
}


//// [typedArraysCrossAssignability01.js]
function CheckAssignability() {
    let arr_Int8Array = new Int8Array(1);
    let arr_Uint8Array = new Uint8Array(1);
    let arr_Int16Array = new Int16Array(1);
    let arr_Uint16Array = new Uint16Array(1);
    let arr_Int32Array = new Int32Array(1);
    let arr_Uint32Array = new Uint32Array(1);
    let arr_Float32Array = new Float32Array(1);
    let arr_Float64Array = new Float64Array(1);
    let arr_Uint8ClampedArray = new Uint8ClampedArray(1);
    arr_Int8Array = arr_Int8Array;
    arr_Int8Array = arr_Uint8Array;
    arr_Int8Array = arr_Int16Array;
    arr_Int8Array = arr_Uint16Array;
    arr_Int8Array = arr_Int32Array;
    arr_Int8Array = arr_Uint32Array;
    arr_Int8Array = arr_Float32Array;
    arr_Int8Array = arr_Float64Array;
    arr_Int8Array = arr_Uint8ClampedArray;
    arr_Uint8Array = arr_Int8Array;
    arr_Uint8Array = arr_Uint8Array;
    arr_Uint8Array = arr_Int16Array;
    arr_Uint8Array = arr_Uint16Array;
    arr_Uint8Array = arr_Int32Array;
    arr_Uint8Array = arr_Uint32Array;
    arr_Uint8Array = arr_Float32Array;
    arr_Uint8Array = arr_Float64Array;
    arr_Uint8Array = arr_Uint8ClampedArray;
    arr_Int16Array = arr_Int8Array;
    arr_Int16Array = arr_Uint8Array;
    arr_Int16Array = arr_Int16Array;
    arr_Int16Array = arr_Uint16Array;
    arr_Int16Array = arr_Int32Array;
    arr_Int16Array = arr_Uint32Array;
    arr_Int16Array = arr_Float32Array;
    arr_Int16Array = arr_Float64Array;
    arr_Int16Array = arr_Uint8ClampedArray;
    arr_Uint16Array = arr_Int8Array;
    arr_Uint16Array = arr_Uint8Array;
    arr_Uint16Array = arr_Int16Array;
    arr_Uint16Array = arr_Uint16Array;
    arr_Uint16Array = arr_Int32Array;
    arr_Uint16Array = arr_Uint32Array;
    arr_Uint16Array = arr_Float32Array;
    arr_Uint16Array = arr_Float64Array;
    arr_Uint16Array = arr_Uint8ClampedArray;
    arr_Int32Array = arr_Int8Array;
    arr_Int32Array = arr_Uint8Array;
    arr_Int32Array = arr_Int16Array;
    arr_Int32Array = arr_Uint16Array;
    arr_Int32Array = arr_Int32Array;
    arr_Int32Array = arr_Uint32Array;
    arr_Int32Array = arr_Float32Array;
    arr_Int32Array = arr_Float64Array;
    arr_Int32Array = arr_Uint8ClampedArray;
    arr_Float32Array = arr_Int8Array;
    arr_Float32Array = arr_Uint8Array;
    arr_Float32Array = arr_Int16Array;
    arr_Float32Array = arr_Uint16Array;
    arr_Float32Array = arr_Int32Array;
    arr_Float32Array = arr_Uint32Array;
    arr_Float32Array = arr_Float32Array;
    arr_Float32Array = arr_Float64Array;
    arr_Float32Array = arr_Uint8ClampedArray;
    arr_Float64Array = arr_Int8Array;
    arr_Float64Array = arr_Uint8Array;
    arr_Float64Array = arr_Int16Array;
    arr_Float64Array = arr_Uint16Array;
    arr_Float64Array = arr_Int32Array;
    arr_Float64Array = arr_Uint32Array;
    arr_Float64Array = arr_Float32Array;
    arr_Float64Array = arr_Float64Array;
    arr_Float64Array = arr_Uint8ClampedArray;
    arr_Uint8ClampedArray = arr_Int8Array;
    arr_Uint8ClampedArray = arr_Uint8Array;
    arr_Uint8ClampedArray = arr_Int16Array;
    arr_Uint8ClampedArray = arr_Uint16Array;
    arr_Uint8ClampedArray = arr_Int32Array;
    arr_Uint8ClampedArray = arr_Uint32Array;
    arr_Uint8ClampedArray = arr_Float32Array;
    arr_Uint8ClampedArray = arr_Float64Array;
    arr_Uint8ClampedArray = arr_Uint8ClampedArray;
}
