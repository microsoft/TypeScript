/// <reference path="fourslash.ts"/>

////foo( 
//// 1, /* comment */    );

format.document();
verify.currentFileContentIs(`foo(
    1, /* comment */);`);
