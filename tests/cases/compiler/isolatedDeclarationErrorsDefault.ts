// @declaration: true
// @isolatedDeclarations: true
// @declarationMap: false
// @strict: true
// @target: ESNext

// @fileName: a.ts
export default 1 + 1;


// @fileName: b.ts
export default { foo: 1 + 1 };

// @fileName: c.ts
export default [{ foo: 1 + 1 }];

// @fileName: d.ts
export default [{ foo: 1 + 1 }] as const;

// @fileName: e.ts
export default [{ foo: 1 + 1 }] as const;

// @fileName: f.ts
const a = { foo: 1 };
export default a;