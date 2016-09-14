/// <reference path='fourslash.ts'/>

////class G<T> {               // Introduce type parameter T
////    self: G<T>;            // Use T as type argument to form instance type
////    f() {
////        this./*1*/self = /*2*/this;  // self and this are both of type G<T>
////    }
////}

verify.quickInfos({
    1: "(property) G<T>.self: G<T>",
    2: "this: this"
});
