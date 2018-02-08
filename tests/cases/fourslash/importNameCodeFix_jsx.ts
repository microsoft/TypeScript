/// <reference path="fourslash.ts" />

// @jsx: react

// @Filename: /a.tsx
////[|<this>|]</this>

// Tests that we don't crash at non-identifier location.

verify.importFixAtPosition([]);
