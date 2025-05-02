/// <reference path="fourslash.ts" />

// @jsx: react

// @Filename: /types.d.ts
////declare namespace JSX {
////    interface IntrinsicElements { ['a:b']: { a: string }; }
////}

// @filename: /a.tsx
////</**/a:b a="accepted" b="rejected" />;

verify.baselineQuickInfo();
