/// <reference path="fourslash.ts" />

// Test that we don't use the contextual type `{ x: any }` from the inferred type argument to `id`,
// since that comes from the object itself.

////declare function id<T>(a: T): void;
////id({ x/**/ });

goTo.marker("");
verify.completionListIsEmpty();
