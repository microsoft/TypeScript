// @noEmit: true

// repro #48524

type Magic<X> = X extends [[infer Y, ...infer _], ...infer __] ? Y : never;

type R = Magic<[[number]]>
