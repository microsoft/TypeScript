// @sourceMap: true
// @mapRoot: https://example.com/a/../m

// The "mapRoot" value is a URL with a ".." segment. The compiler normalizes
// the value, so the "sourceMappingURL" comment is
// "https://example.com/m/a.js.map".

// @filename: /a.ts
export const a = 1;
