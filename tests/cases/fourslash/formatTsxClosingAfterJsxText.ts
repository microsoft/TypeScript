/// <reference path="fourslash.ts"/>
////
////const a = (
////  <div>
////      text
////      </div>
////)
////
////const b = (
////  <div>
////  <span />
////  </div>
////)

format.document();
verify.currentFileContentIs(`
const a = (
  <div>
    text
  </div>
)

const b = (
  <div>
    <span />
  </div>
);`);
