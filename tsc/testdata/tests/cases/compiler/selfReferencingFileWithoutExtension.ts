// The reference path "a" has no extension. The file loader adds ".ts" and
// finds "/a.ts", the file that has the reference. So the file has a reference
// to itself.

// @filename: /a.ts
/// <reference path="a" />
export const a = 1;
