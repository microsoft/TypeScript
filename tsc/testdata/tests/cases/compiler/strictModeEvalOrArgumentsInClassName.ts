// @allowJs: true
// @checkJs: true
// @module: esnext
// @noEmit: true
// @strict: true
// @target: es2015
// @Filename: classDeclarations.ts
class arguments {}
class eval {}
export {};

// @Filename: classExpression.ts
const C = class eval {};
export {};

// @Filename: ambientClassDeclaration.ts
declare class eval {}
export {};

// @Filename: classNames.js
class arguments {}
class eval {}
const C = class eval {};
export {};
