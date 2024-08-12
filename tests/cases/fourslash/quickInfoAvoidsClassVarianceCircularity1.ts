/// <reference path='fourslash.ts'/>

// @strict: true

//// class A<T extends number = number> {
////   value!: T;
////   child!: InstanceType<typeof A.B<A<T>>>;
////
////   static B = class B<T extends A> {
////     parent!: T;
////   };
//// }
////
//// var a = new A();
////
//// a.child.parent.value/**/;

verify.quickInfoAt("", "(property) A<number>.value: number");
verify.getSemanticDiagnostics([]);
