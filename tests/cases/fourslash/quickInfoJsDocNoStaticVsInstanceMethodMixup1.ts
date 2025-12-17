///<reference path="fourslash.ts" />

//// declare class BaseClass {
////   /** some documentation for instance method */
////   method(): string;
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
////   static method(): string;
//// }
////
//// Mixed.method/*1*/;

verify.quickInfoAt("1", "(method) Mixed.method(): string", undefined);