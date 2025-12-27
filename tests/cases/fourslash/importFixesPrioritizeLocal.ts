/// <reference path="fourslash.ts" />

// Test that local imports are prioritized over external node_modules imports
// when the same symbol is exported from both

// @Filename: /node_modules/@mui/material/index.d.ts
//// export function useTheme(): { palette: string };

// @Filename: /node_modules/@mui/material/package.json
//// { "name": "@mui/material", "version": "5.0.0", "types": "index.d.ts" }

// @Filename: /node_modules/zustand/index.d.ts
//// export function useStore(): any;

// @Filename: /node_modules/zustand/package.json
//// { "name": "zustand", "version": "4.0.0", "types": "index.d.ts" }

// @Filename: /utils/store.ts
//// export function useTheme() {
////   return { palette: 'light' };
//// }
//// export function useStore() {
////   return {};
//// }

// @Filename: /components/Button.tsx
//// // Local useTheme should be suggested first
//// const theme = useTheme/*1*/();

// @Filename: /components/Header.tsx
//// // Local useStore should be suggested first
//// const store = useStore/*2*/();

// Test 1: useTheme - should prioritize local import over @mui/material
goTo.marker("1");
verify.importFixAtPosition([
`import { useTheme } from "../utils/store";

// Local useTheme should be suggested first
const theme = useTheme();`,
`import { useTheme } from "@mui/material";

// Local useTheme should be suggested first
const theme = useTheme();`
]);

// Test 2: useStore - should prioritize local import over zustand
goTo.marker("2");
verify.importFixAtPosition([
`import { useStore } from "../utils/store";

// Local useStore should be suggested first
const store = useStore();`,
`import { useStore } from "zustand";

// Local useStore should be suggested first
const store = useStore();`
]);

