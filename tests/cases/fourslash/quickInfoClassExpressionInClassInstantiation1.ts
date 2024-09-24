/// <reference path="fourslash.ts"/>

//// class A1<T> {
////   /*1*/child!: InstanceType<typeof A1.B<T>>;
////   static B = class B<T> {
////     parent!: T;
////   };
//// };
////
//// const A2 = class<T> {
////   /*2*/child!: InstanceType<typeof A2.B<T>>;
////   static B = class B<T> {
////     parent!: T;
////   };
//// };
////
//// const A3 = class A3<T> {
////   /*3*/child!: InstanceType<typeof A3.B<T>>;
////   static B = class B<T> {
////     parent!: T;
////   };
//// };
////
//// const A4 = class C<T> {
////   /*4*/child!: InstanceType<typeof C.B<T>>;
////   static B = class B<T> {
////     parent!: T;
////   };
//// };
////
//// class A5<T> {
////   /*5*/child!: typeof A5.B<T>;
////   static B = class B<T> {
////     parent!: T;
////   };
//// };
////
//// const A6 = class<T> {
////   /*6*/child!: typeof A6.B<T>;
////   static B = class B<T> {
////     parent!: T;
////   };
//// };
////
//// const A7 = class A7<T> {
////   /*7*/child!: typeof A7.B<T>;
////   static B = class B<T> {
////     parent!: T;
////   };
//// };
////
//// const A8 = class C<T> {
////   /*8*/child!: typeof C.B<T>;
////   static B = class B<T> {
////     parent!: T;
////   };
//// };

verify.quickInfos({
    1: "(property) A1<T>.child: B<T>",
    2: "(property) A2<T>.child: B<T>",
    3: "(property) A3<T>.child: B<T>",
    4: "(property) C<T>.child: B<T>",
    5: "(property) A5<T>.child: typeof A5.B<T>",
    6: "(property) A6<T>.child: typeof A6.B<T>",
    7: `(property) A7<T>.child: {
    new (): B<T>;
    prototype: A7<any>.B<any>;
}`,
    8: `(property) C<T>.child: {
    new (): B<T>;
    prototype: C<any>.B<any>;
}`
});
