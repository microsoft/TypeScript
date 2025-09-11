///<reference path="fourslash.ts" />

//// declare class BaseClass {
////   /** some documentation for static method */
////   static staticMethod(): number;
////
////   /** some documentation for instance method */
////   instanceMethod(): string;
//// }
////
//// type AnyConstructor = abstract new (...args: any[]) => object;
////
//// function Mix<T extends AnyConstructor>(BaseClass: T) {
////   abstract class MixinClass extends BaseClass {
////     constructor(...args: any[]) {
////       super(...args);
////     }
////   }
////
////   return MixinClass;
//// }
////
//// declare class Mixed extends Mix(BaseClass) {
////   static staticMethod(): number;
////
////   instanceMethod(): string;
//// }
////
//// Mixed.staticMethod/*1*/;
////
//// const m = new Mixed();
//// m.instanceMethod/*2*/;

verify.quickInfoAt("1", "(method) Mixed.staticMethod(): number", "some documentation for static method");
verify.quickInfoAt("2", "(method) Mixed.instanceMethod(): string", "some documentation for instance method");