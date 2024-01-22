/// <reference path='fourslash.ts' />

// @Filename: /incomplete.tsx
//// function Test() {
////     return <div>
////         </*0*/
////         <div {...{}}>
////         </div>
////     </div>
//// }

verify.linkedEditing({ 0 : undefined });
// verify.baselineLinkedEditing();