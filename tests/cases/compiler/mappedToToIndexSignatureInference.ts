declare const fn: <K extends string, V>(object: { [Key in K]: V }) => object;
declare const a: { [index: string]: number };
fn(a);
