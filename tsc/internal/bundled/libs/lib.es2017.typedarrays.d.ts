/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

interface Int8ArrayConstructor {
    new (): Int8Array<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Int8Array<TArrayBuffer>;
}

interface Uint8ArrayConstructor {
    new (): Uint8Array<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Uint8Array<TArrayBuffer>;
}

interface Uint8ClampedArrayConstructor {
    new (): Uint8ClampedArray<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Uint8ClampedArray<TArrayBuffer>;
}

interface Int16ArrayConstructor {
    new (): Int16Array<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Int16Array<TArrayBuffer>;
}

interface Uint16ArrayConstructor {
    new (): Uint16Array<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Uint16Array<TArrayBuffer>;
}

interface Int32ArrayConstructor {
    new (): Int32Array<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Int32Array<TArrayBuffer>;
}

interface Uint32ArrayConstructor {
    new (): Uint32Array<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Uint32Array<TArrayBuffer>;
}

interface Float32ArrayConstructor {
    new (): Float32Array<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Float32Array<TArrayBuffer>;
}

interface Float64ArrayConstructor {
    new (): Float64Array<ArrayBuffer>;
    new <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(): Float64Array<TArrayBuffer>;
}
