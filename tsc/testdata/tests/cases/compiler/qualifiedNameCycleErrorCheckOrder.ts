// @checkOrder: default, typesfirst

// Resolving n.T looks for a value n to suggest typeof, which needs the type of
// n, which is n.T. The missing member must be reported whichever is
// resolved first.

declare const n: n.T;
declare namespace n {}
