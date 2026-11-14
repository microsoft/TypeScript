// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst

// Relating 'S<[string]>' to 'R<[string]>' from scratch reaches 'next.leaf'
// before giving up on deeply nested types, and fails there. Inside the
// relation of 'S<string>' to 'R<string>' it is one level deeper and is cut
// short instead. That truncated result must not be cached, so the error for
// 'q = p' must be reported whether or not 'y = x' was checked first.

type S<T> = { next: S<[T]>; leaf: T extends [[unknown]] ? number : T };
type R<T> = { next: R<[T]>; leaf: T };

declare let x: S<string>, y: R<string>;
declare let p: S<[string]>, q: R<[string]>;

y = x;
q = p;
