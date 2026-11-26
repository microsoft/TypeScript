// @noEmit: true
// @strict: true
// @module: nodenext

// Unresolved qualified names with the same final identifier create distinct
// unresolved symbols under their qualifying names. Tuples of those names keep
// both constituents in a union.

import type * as Bidi from "missing-a";
import type { Protocol } from "missing-b";

type CdpEvent = Protocol.Cdp.Event;
export function f(event: [Bidi.Event] | [CdpEvent], other: [Bidi.Other] | [Protocol.Cdp.Other]) {}
