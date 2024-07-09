/// <reference path="fourslash.ts" />

//// interface X {
////     bla: string;
//// }
//// class Y implements X {
////     private blub = "";
////     /**/
//// }


verify.completions({ marker: "", includes: "bla", isNewIdentifierLocation: true });
