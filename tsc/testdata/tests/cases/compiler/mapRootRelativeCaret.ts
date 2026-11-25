// @sourceMap: true
// @mapRoot: ^
// @currentDirectory: /proj

// The "mapRoot" value "^" is a relative path, not a root. The compiler
// resolves it against the common source directory, so the map directory is
// "/proj/^". The "sourceMappingURL" comment is "%5E/a.js.map", and the map
// lists the source as "../a.ts".

// @filename: /proj/a.ts
export const a = 1;
