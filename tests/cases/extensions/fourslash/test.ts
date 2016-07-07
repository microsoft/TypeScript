/// <reference path="../../fourslash/fourslash.ts" />

goTo.file("hello.ts");
goTo.marker("EOL");
verify.caretAtMarker("EOL");