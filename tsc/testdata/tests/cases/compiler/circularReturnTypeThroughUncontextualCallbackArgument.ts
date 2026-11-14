// @strict: true
// @noEmit: true
// @checkOrder: default,typesfirst

// `getCreds`'s return type depends on resolving `materialize({ next })`, whose
// argument check needs the return type of the (non-contextually typed) arrow
// `next`, which calls `getCreds` again. TypeScript never reports this cycle in
// any order: call resolution hides the resolutions below it, and the relation
// reads an in-progress return type as `any` without failing it. So no TS7023,
// and `getCreds` returns `number`. (Reduced from OmniRoute auth.ts
// getProviderCredentials/selectNextLeaseCandidate.)

const x = getCreds();

declare function materialize(extra: { next?: (id: string) => unknown }): number;

function getCreds() {
    const next = (id: string) => getCreds();
    return materialize({ next });
}

const n: number = getCreds();
