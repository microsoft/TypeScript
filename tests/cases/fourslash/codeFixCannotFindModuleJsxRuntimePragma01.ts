/// <reference path='fourslash.ts' />

// @module: preserve
// @target: esnext
// @moduleResolution: bundler
// @jsx: react-jsx

// @Filename: /file.tsx
/////** @jsxImportSource @emotion/react */
////export let jsxExpr = <div />;

test.setTypesRegistry({
    "@emotion/react": undefined,
});

verify.codeFixAvailable([{
    description: "Install '@types/emotion__react'",
    commands: [{
        file: "/file.tsx",
        type: "install package",
        packageName: "@types/emotion__react",
    }],
}]);
