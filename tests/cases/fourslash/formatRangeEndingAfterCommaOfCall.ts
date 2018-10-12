/// <reference path="fourslash.ts"/>
////export const strong: StrongParser = verify(fmap(build(() =>
////    /*start*/surround('**', compress(some(union([inline]), '**')), '**')),/*end*/
////    ns => [html('strong', ns)]
////), ([el]) => hasTightStartText(el));

format.selection("start", "end");