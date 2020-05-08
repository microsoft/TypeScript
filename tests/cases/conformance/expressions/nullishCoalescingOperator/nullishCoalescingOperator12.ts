// @strict: true
// @target: ES2015

const obj: { arr: any[] } = { arr: [] };
for (const i of obj?.arr ?? []) { }
