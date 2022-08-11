///<reference path="fourslash.ts" />

//// interface Literal1Example {
////     /** Something generic */
////     [key: `prefix${string}`]: number | string;
////     /** Something else */
////     [key: `prefix${number}`]: number;
//// }
//// function literal1Example(e: Literal1Example) {
////     console.log(e./*literal1*/prefixMember);
////     console.log(e./*literal2*/anything);
////     console.log(e./*literal3*/prefix0);
//// }

verify.quickInfoAt("literal1", "(index) Literal1Example[`prefix${string}`]: string | number", "Something generic");
verify.quickInfoAt("literal2", "any");
verify.quickInfoAt("literal3", "(index) Literal1Example[`prefix${string}` | `prefix${number}`]: string | number", "Something generic\nSomething else");