// @strictNullChecks: true
type z = string | undefined | null | never;
type a = string | undefined | null | never;
type b = a!;
type Assert<T> = T!;
type c = Assert<a>;

