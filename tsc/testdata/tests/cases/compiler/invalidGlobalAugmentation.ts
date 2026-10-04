// @noTypesAndSymbols: true
// @noEmit: true

// @Filename: globals.ts
declare global {
  const __FOO__: any;
}

// @Filename: react-native.ts
export {}
declare module "react-native" {
  const __FOO__: any;
}
