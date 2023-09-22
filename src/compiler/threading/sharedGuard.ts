// import { Shared, SharedStructBase } from "../_namespaces/ts";
// import { AtomicValue } from "../sharing/atomicValue";

// @Shared()
// class DataStruct<T extends Shareable> extends SharedStructBase {
//     @Shared() internalCounter = new AtomicValue<number>(0);
//     @Shared() object: T;

//     constructor(object: T) {
//         super();
//         this.object = object;
//     }

//     static releaseRef<T extends Shareable>(self: DataStruct<T>) {
//         if (AtomicValue.add(self.internalCounter, 1) == -1) {
//             DataStruct.destroy(self);
//         }
//     }

//     static destroy<T extends Shareable>(self: DataStruct<T>) {
//         self.internalCounter = undefined!;
//         self.object = undefined!;
//     }
// }

// @Shared()
// class DataPtrStruct<T extends Shareable> extends SharedStructBase {
//     @Shared() externalCounter: number;
//     @Shared() ptr: DataStruct<T> | undefined;
//     constructor(ptr: DataStruct<T> | undefined, externalCounter = 0) {
//         super();
//         this.ptr = ptr;
//         this.externalCounter = externalCounter;
//     }
// }

// class DataGuard<T extends Shareable> {
//     private _ptr: DataStruct<T> | undefined;

//     constructor(ptr: DataStruct<T> | undefined) {
//         this._ptr = ptr;
//     }

//     get isValid() { return !!this._ptr; }

//     get object() {
//         if (!this._ptr) throw new ReferenceError("Object is disposed");
//         return this._ptr.object;
//     }

//     replaceWith(other: DataGuard<T>) {
//         if (this._ptr) {
//             DataStruct.releaseRef(this._ptr);
//         }
//         this._ptr = other._ptr;
//         other._ptr = undefined;
//         return this;
//     }

//     move() {
//         const obj = new DataGuard<T>(this._ptr);
//         this._ptr = undefined;
//         return obj;
//     }

//     [Symbol.dispose]() {
//         if (this._ptr) {
//             DataStruct.releaseRef(this._ptr);
//             this._ptr = undefined;
//         }
//     }
// }

// @Shared()
// class SharedGuard<T extends Shareable> extends SharedStructBase {
//     @Shared() private data_ptr = new AtomicValue<DataPtrStruct<T>>(new DataPtrStruct<T>(undefined));

//     private static release<T extends Shareable>(old_data_ptr: DataPtrStruct<T>) {
//         if (!old_data_ptr.ptr) return;
//         const external = old_data_ptr.externalCounter;
//         if (AtomicValue.sub(old_data_ptr.ptr.internalCounter, external) === external - 1) {
//             DataStruct.destroy(old_data_ptr.ptr);
//         }
//         else {
//             DataStruct.releaseRef(old_data_ptr.ptr);
//         }
//     }

//     static destroy<T extends Shareable>(self: SharedGuard<T>) {
//         const old_data_ptr = AtomicValue.load(self.data_ptr);
//         SharedGuard.release(old_data_ptr);
//     }

//     static acquire<T extends Shareable>(self: SharedGuard<T>) {
//         let new_data_ptr: DataPtrStruct<T>;
//         const old_data_ptr = AtomicValue.load(self.data_ptr);
//         do {
//             new_data_ptr = new DataPtrStruct(old_data_ptr.ptr, old_data_ptr.externalCounter + 1);
//         }
//         while (!AtomicValue.compareAndSwap(self.data_ptr, old_data_ptr, new_data_ptr));
//     }
// }