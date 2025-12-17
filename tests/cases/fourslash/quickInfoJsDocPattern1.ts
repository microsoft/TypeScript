///<reference path="fourslash.ts" />

//// class Test {
////   /**
////    * @pattern ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$
////    */
////   public emailPattern/*1*/: string;
//// }

verify.quickInfoAt("1", "(property) Test.emailPattern: string", undefined, [{
    name: "pattern",
    text: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\\\.[a-zA-Z0-9-.]+$"
}]);
