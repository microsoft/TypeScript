/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /node_modules/hooks/useFoo.ts
////declare const _default: () => void;
////export default _default;

// @Filename: /test.ts
////[|useFoo|];

goTo.file("/test.ts");
verify.importFixAtPosition([`import useFoo from "hooks/useFoo";

useFoo`]);
