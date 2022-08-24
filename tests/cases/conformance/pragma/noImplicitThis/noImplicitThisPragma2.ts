// @noImplicitThis: true
// @filename: file1.ts
// @ts-noImplicitThis
const a = () => this.Math;

// @filename: file2.ts
// @ts-noImplicitThis true
const b = () => this.Math;

// @filename: file3.ts
// @ts-noImplicitThis false
const c = () => this.Math;

// @filename: file4.ts
const d = () => this.Math;