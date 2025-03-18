//// [tests/cases/compiler/privacyCheckCallbackOfInterfaceMethodWithTypeParameter.ts] ////

//// [privacyCheckCallbackOfInterfaceMethodWithTypeParameter.ts]
export interface A<T> {
    f1(callback: (p: T) => any); 
}
 
export interface B<T> extends A<T> {
}


//// [privacyCheckCallbackOfInterfaceMethodWithTypeParameter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
