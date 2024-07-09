// @declaration: true
// @emitDeclarationOnly: true

export const fn1 = ({ prop: a, prop: b }: { prop: number }) => a + b;

export const fn2 = ({ prop: a }: { prop: number }, { prop: b }: { prop: number }) => a + b;
