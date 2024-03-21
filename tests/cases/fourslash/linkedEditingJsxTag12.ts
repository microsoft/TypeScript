/// <reference path='fourslash.ts' />

// @Filename: /incomplete.tsx
//// function Test() {
////     return <div>
////         </*0*/
////         <div {...{}}>
////         </div>
////     </div>
//// }

// @Filename: /incompleteMismatched.tsx
//// function Test() {
////     return <div>
////         <T
////         <div {...{}}>
////         </div>
////     </div>
//// }

// @Filename: /incompleteMismatched2.tsx
//// function Test() {
////     return <div>
////         <T
////         <div {...{}}>
////         T</div>
////     </div>
//// }

// @Filename: /incompleteMismatched3.tsx
//// function Test() {
////     return <div>
////         <div {...{}}>
////         </div>
////         <T
////     </div>
//// }

// @Filename: /mismatched.tsx
//// function Test() {
////     return <div>
////         <T>
////         <div {...{}}>
////         </div>
////     </div>
//// }

// @Filename: /matched.tsx
//// function Test() {
////     return <div>
////
////         <div {...{}}>
////         </div>
////     </div>
//// }

verify.linkedEditing({ 0 : undefined });
verify.baselineLinkedEditing();