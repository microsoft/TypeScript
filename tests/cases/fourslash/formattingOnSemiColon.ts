/// <reference path='fourslash.ts' />

////var  a=b+c^d-e*++f

goTo.eof();
edit.insert(";");
verify.currentFileContentIs("var a = b + c ^ d - e * ++f;");