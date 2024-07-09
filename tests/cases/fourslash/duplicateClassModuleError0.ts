/// <reference path="fourslash.ts" />

//// module A
//// {
////     class B
////     {
////         public Hello(): string
////         {
////             return "from private B";
////         }
////     }
//// }
//// 
//// module A
//// {
////  /*1*/
//// }

edit.disableFormatting();

goTo.marker("1");

edit.insert("    export class B\n    {\n        public Hello(): string\n        {\n            return \"from export B\";\n        }\n    }\n");

edit.insert("\n");
