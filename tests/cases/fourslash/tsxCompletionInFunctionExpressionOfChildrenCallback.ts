/// <reference path='fourslash.ts' />
//@module: commonjs
//@jsx: preserve

// @Filename: 1.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
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

verify.completions({ marker: "", exact: undefined });
