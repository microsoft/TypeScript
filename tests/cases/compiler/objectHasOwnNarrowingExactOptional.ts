// @strict: true
// @target: es2022
// @exactOptionalPropertyTypes: true

// With exactOptionalPropertyTypes, accessing obj.a when property might not exist
// produces the "missing" type. Object.hasOwn should remove it.
declare const obj: { a?: string; b?: number };
if (Object.hasOwn(obj, "a")) {
    // Under exactOptionalPropertyTypes, a?: string means the property
    // might be missing OR might have value string (but not undefined).
    // After hasOwn confirms presence, obj.a is string.
    obj.a;
}

// Property access after hasOwn with exactOptionalPropertyTypes
interface Opts {
    verbose?: boolean;
    output?: string;
}
declare const opts: Opts;
if (Object.hasOwn(opts, "verbose")) {
    opts.verbose;
}
