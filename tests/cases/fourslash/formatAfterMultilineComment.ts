/// <reference path="fourslash.ts"/>
/////*foo
////*/"123123";

format.document();
verify.currentFileContentIs(`/*foo
*/"123123";`)
