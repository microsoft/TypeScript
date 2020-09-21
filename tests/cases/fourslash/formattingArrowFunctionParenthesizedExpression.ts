/// <reference path="fourslash.ts" />

// @Filename: Bar.tsx
//// export const Bar = ({
////     foo,
////     bar,
//// }: any) => (
////     <div>Hello world</div>
//// )
//// 
//// export const Bar2 = ({
////     foo,
////     bar,
//// }) => (<div>Hello world</div>)
////
//// export const Bar2 = ({
////     foo,
////     bar,
//// }) => <div>Hello world</div>
//// 
//// export const Bar3 = ({
////     foo,
////     bar,
//// }) =>
////     (<div>Hello world</div>)
////
//// export const Bar3 = ({
////     foo,
////     bar,
//// }) =>
////     <div>Hello world</div>

verify.formatDocumentChangesNothing();
