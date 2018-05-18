/// <reference path="fourslash.ts" />

// @noLib: true
// @nolib: true
// @jsx: preserve

// @Filename: /a.tsx
////export type Bar = 0;
////export default function Foo() {};

// @Filename: /b.tsx
////<Fo/**/ />;

verify.completions({
    marker: "",
    includes: { name: "Foo", source: "/a.tsx", hasAction: true },
    excludes: "Bar",
    preferences: {
        includeCompletionsForModuleExports: true,
    },
});
