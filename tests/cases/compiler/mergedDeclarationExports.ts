// OK -- one is type, one is value
interface b {}
export const b = 1;

// OK -- one is a type, one is a namespace, one is a value.
type t = 0;
namespace t { interface I {} }
export const t = 0;

// Should get errors if they have some meaning in common.

// both types
interface c {}
export interface c {}

// both types (class is also value, but that doesn't matter)
interface d {}
export class d {}

// both namespaces
namespace N { }
export namespace N {}
