/// <reference path="fourslash.ts"/>

////() => {
////    var foo = 0;
////    /*requestCompletion*/
////    foo./*memberCompletion*/toString;
////}/*editDeclaration*/

function check() {
    verify.completions(
        { marker: "requestCompletion", includes: "foo" },
        { marker: "memberCompletion", includes: "toExponential" },
    );
}

check();

// Now change the decl by adding a semicolon
goTo.marker("editDeclaration");
edit.insert(";");

// foo should still be there
check();
