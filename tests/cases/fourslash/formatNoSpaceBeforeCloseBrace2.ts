/// <reference path="fourslash.ts"/>

////new Foo(1,     );

format.document();
verify.currentFileContentIs(`new Foo(1,);`);
