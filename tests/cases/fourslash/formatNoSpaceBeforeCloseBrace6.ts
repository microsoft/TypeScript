/// <reference path="fourslash.ts"/>

////new Foo(1, /* comment */  
////  );

format.document();
verify.currentFileContentIs(`new Foo(1, /* comment */
);`);
