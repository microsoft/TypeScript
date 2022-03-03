/// <reference path="fourslash.ts"/>
// @Filename: foo.tsx
////const a = <div>
////    // <a />
////</div>

format.document();
verify.currentFileContentIs(`const a = <div>
    // <a />
</div>`);
