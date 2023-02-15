// @strict: true
// @noEmit: true

declare function fx4<T extends [string, string, string, 'a' | 'b']>(x: T): T;

const t3 = ['x', 'y', 'z'] as const;

fx4(['x', 'y', 'z', 'a']);
fx4([...t3, 'a']);

// Repro from #52684

const staticPath1Level = ["home"] as const;
const staticPath2Level = ["home", "user"] as const;
const staticPath3Level = ["home", "user", "downloads"] as const;

const randomID = 'id' as string;

declare function foo<const T>(path: T): T;

const a1 = foo([...staticPath1Level, randomID, 'doc.pdf']);
const a2 = foo([...staticPath2Level, randomID, 'doc.pdf']);
const a3 = foo([...staticPath3Level, randomID, 'doc.pdf']);

const b1 = foo([...staticPath1Level, randomID, 'folder', 'doc.pdf']);
const b2 = foo([...staticPath2Level, randomID, 'folder', 'doc.pdf']);
const b3 = foo([...staticPath3Level, randomID, 'folder', 'doc.pdf']);

const c1 = foo([...staticPath1Level, randomID, 'folder', 'subfolder', 'doc.pdf']);
const c2 = foo([...staticPath2Level, randomID, 'folder', 'subfolder', 'doc.pdf']);
const c3 = foo([...staticPath3Level, randomID, 'folder', 'subfolder', 'doc.pdf']);

const d1 = foo([...staticPath1Level, randomID, 'folder', 'subfolder', 'another-subfolder', 'doc.pdf']);
const d2 = foo([...staticPath2Level, randomID, 'folder', 'subfolder', 'another-subfolder', 'doc.pdf']);
const d3 = foo([...staticPath3Level, randomID, 'folder', 'subfolder', 'another-subfolder', 'doc.pdf']);
