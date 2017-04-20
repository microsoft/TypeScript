/// <reference path='fourslash.ts' />
//@module: commonjs
//@jsx: preserve

// @Filename: 1.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
////     interface ElementChildrenAttribute { children; }
//// }
//// interface IUser {
////     Name: string;
//// }
//// interface IFetchUserProps {
////     children: (user: IUser) => any;
//// }
//// function FetchUser(props: IFetchUserProps) { return undefined; }
//// function UserName() {
////     return (
////         <FetchUser>
////             { user => (
////                 <h1>{ user./**/ }</h1> 
////             )}
////         </FetchUser>
////     );
//// }

goTo.marker();
verify.completionListContains('Name');