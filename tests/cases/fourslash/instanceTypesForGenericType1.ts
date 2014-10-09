/// <reference path='fourslash.ts'/>

////class G<T> {               // Introduce type parameter T
////    self: G<T>;            // Use T as type argument to form instance type
////    f() {
////        this./*1*/self = /*2*/this;  // self and this are both of type G<T>
////    }
////}

goTo.marker('1');
verify.quickInfoIs('(property) G<T>.self: G<T>');

goTo.marker('2');
verify.quickInfoIs('class G<T>');