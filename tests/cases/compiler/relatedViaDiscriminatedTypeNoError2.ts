// @strict: true
type AObjOrBObj = { name: "A" } | { name: "B" };
type AOrBObj = { name: "A" | "B" };
type Generic<T extends AObjOrBObj> = T;

type T = Generic<AOrBObj>;

declare let x: AObjOrBObj;
declare let y: AOrBObj;
x = y;
y = x;
