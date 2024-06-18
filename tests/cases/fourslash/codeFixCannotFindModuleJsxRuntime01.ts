/// <reference path='fourslash.ts' />

// @module: preserve
// @target: esnext
// @moduleResolution: bundler
// @jsx: react-jsx

// @Filename: /file.tsx
////
////export let jsxExpr = <div />;

test.setTypesRegistry({
    "react": undefined,
});

verify.codeFixAvailable([{
    description: "Install '@types/react'",
    commands: [{
        file: "/file.tsx",
        type: "install package",
        packageName: "@types/react",
    }],
}]);
