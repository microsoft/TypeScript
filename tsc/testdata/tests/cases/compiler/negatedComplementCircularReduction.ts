// @strict: true
// @noEmit: true

type Keys<Value> = Value extends unknown ? keyof Value : never;
type Recursive =
    | { next: Recursive; value: string }
    | ({ next: unknown } & not { value: string })
    | { next: unknown; value: string };

// The first query encounters a reduction cycle and distributes over the unreduced union.
type Early = Keys<Recursive>;
// Use a separate conditional alias so the later query does not reuse the first instantiation.
type LaterKeys<Value> = Value extends unknown ? keyof Value : never;

declare const early: Early;
declare const later: LaterKeys<Recursive>;
const consistent: typeof early = later;
const reverseConsistent: typeof later = early;

// Retrying reduction used to remove "value" from only the later query.
const earlyValue: typeof early = "value";
const laterValue: typeof later = "value";