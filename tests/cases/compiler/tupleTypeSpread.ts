// @allowSyntheticDefaultImports: true
type a = [1, ...[2]];
type Combine<Head, Tail extends any[]> = [Head, ...Tail];
type b = Combine<1, [2, 3]>;
