/// <reference path="fourslash.ts" />
// #29038

// @allowJs: true
// @checkJs: true
// @esModuleInterop: true
// @moduleResolution: node

// @Filename: /node_modules/moment.d.ts
////declare function moment(): void;
////export = moment;

// @Filename: /b.js
////[|moment;|]

goTo.file("/b.js");
verify.importFixAtPosition([
`import moment from "moment";

moment;`,
]);
