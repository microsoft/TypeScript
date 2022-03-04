/// <reference path="fourslash.ts" />

// @module: commonjs
// @jsx: react

// @Filename: /component.tsx
//// export default function (props: any) {}

// @Filename: /index.tsx
//// export function Index() {
////     return <Component/**/
//// }

goTo.marker("");
verify.completions({
  marker: "",
  includes: {
    name: "Component",
    source: "/component",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  },
  excludes: "component",
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});

verify.applyCodeActionFromCompletion("", {
  name: "Component",
  source: "/component",
  description: `Add import from "./component"`,
  newFileContent:
`import Component from "./component";

export function Index() {
    return <Component
}`,
});
