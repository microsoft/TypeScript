declare const tuple1: [number, number, number] & { _nominal_a: never };
declare const tuple2: [number, number, number] & [string, string, string];
declare const tuple3: [string] & [unknown, ...{ a: string }[]]
declare const tuple4: [string, string] & { a: string }[];

declare const f1: (...params: [number, number, number]) => void;
declare const f2: (...params: [string, ...{ a: string }[]]) => void;

f1(...tuple1);
f1(...tuple2); // Resolves to [never, never, never]

f2(...tuple3);
f2(...tuple4);

export {}
