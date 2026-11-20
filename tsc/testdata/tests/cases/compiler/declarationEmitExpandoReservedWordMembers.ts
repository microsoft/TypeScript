// @declaration: true
// @emitDeclarationOnly: true
// @strict: true

export function decl() {}
decl.default = 1;
decl.class = 2;
decl.function = "s";

export const arrow = () => {};
arrow.default = 1;
arrow.class = 2;
arrow.new = "s";

export function mixed() {}
mixed.a = 1;
mixed.default = 2;
mixed.b = 3;
mixed.class = 4;
mixed.c = 5;

const alias = 0;
export function withAlias() {}
withAlias.x = alias;
withAlias.default = 1;
withAlias.y = 2;
withAlias.class = 3;
