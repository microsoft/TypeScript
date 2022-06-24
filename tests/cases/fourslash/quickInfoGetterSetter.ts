/// <reference path="fourslash.ts" />

// @target: es2015

//// class C {
////     #x = Promise.resolve("")
////     set /*setterDef*/myValue(x: Promise<string> | string) {
////         this.#x = Promise.resolve(x);
////     }
////     get /*getterDef*/myValue(): Promise<string> {
////         return this.#x;
////     }
//// }
//// let instance = new C();
//// instance./*setterUse*/myValue = instance./*getterUse*/myValue;

verify.quickInfoAt("getterUse", "(property) C.myValue: Promise<string>");
verify.quickInfoAt("getterDef", "(getter) C.myValue: Promise<string>");
verify.quickInfoAt("setterUse", "(property) C.myValue: string | Promise<string>");
verify.quickInfoAt("setterDef", "(setter) C.myValue: string | Promise<string>");
