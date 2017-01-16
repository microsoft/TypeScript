/// <reference path="lib.es2015.symbol.d.ts" />
/// <reference path="lib.es2015.symbol.wellknown.d.ts" />

interface SharedArrayBuffer {
    /**
      * Read-only. The length of the ArrayBuffer (in bytes).
      */
    readonly byteLength: number;

    /*
     * The SharedArrayBuffer constructor's length property whose value is 1.
     */
    length: number;
    /**
      * Returns a section of an SharedArrayBuffer.
      */ 
    slice(begin:number, end?:number): SharedArrayBuffer;
    readonly [Symbol.species]: SharedArrayBuffer;
    readonly [Symbol.toStringTag]: "SharedArrayBuffer";
}

interface SharedArrayBufferConstructor {
    readonly prototype: SharedArrayBuffer;
    new (byteLength: number): SharedArrayBuffer;
}

declare var SharedArrayBuffer: SharedArrayBufferConstructor;