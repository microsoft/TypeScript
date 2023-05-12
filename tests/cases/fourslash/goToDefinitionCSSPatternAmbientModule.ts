/// <reference path="fourslash.ts" />

// @esModuleInterop: true

// @Filename: index.css
//// /*2a*/html { font-size: 16px; }

// @Filename: types.ts
//// declare module /*2b*/"*.css" {
////   const styles: any;
////   export = styles;
//// }

// @Filename: index.ts
//// import styles from [|/*1*/"./index.css"|];

verify.baselineGoToDefinition("1");
