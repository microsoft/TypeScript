/// <reference path="fourslash.ts"/>

// @Filename: foo.tsx
////<div><p>'</p><p>{function(){return 1;}]}</p></div>

format.document();
verify.currentFileContentIs("<div><p>'</p><p>{function() { return 1; }]}</p></div>");

/*
< 0
p 1
> 2
' 3
< 4
/ 5
p 6
> 7
*/
