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
//// export const Bar4 = ({
////     foo,
////     bar,
//// }) =>
////     <div>Hello world</div>
////
//// export const Bar5 = () => (
////     <div>Hello world</div>
//// )
//// 
//// export const Bar6 = () => (<div>Hello world</div>)
//// 
//// export const Bar7 = () => <div>Hello world</div>
//// 
//// export const Bar8 = () =>
////     (<div>Hello world</div>)
//// 
//// export const Bar9 = () =>
////     <div>Hello world</div>

verify.formatDocumentChangesNothing();
