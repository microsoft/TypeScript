/// <reference path="fourslash.ts" />

// @jsx: react

// @Filename: /types.d.ts
//// declare namespace JSX {
////   interface IntrinsicElements { a }
//// }

// @Filename: /Box.tsx
//// export function Box(props: any) { return null; }

// @Filename: /App.tsx
//// export function App() {
////   return (
////     <div className="App">
////       <Box/**/
////     </div>
////   )
//// }

verify.applyCodeActionFromCompletion("", {
  name: "Box",
  source: "/Box",
  description: `Add import from "./Box"`,
  newFileContent: `import { Box } from "./Box";

export function App() {
  return (
    <div className="App">
      <Box
    </div>
  )
}`
});
