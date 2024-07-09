/// <reference path="fourslash.ts" />

// @Filename: foo.tsx
////let x = <div>
////    /*$*/</div >

goTo.marker("$");
verify.not.quickInfoExists();
