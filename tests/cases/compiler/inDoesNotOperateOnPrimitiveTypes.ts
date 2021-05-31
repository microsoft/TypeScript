const validHasKey = <T extends object>(
  thing: T,
  key: string,
): boolean => {
  return key in thing; // Ok
};

const alsoValidHasKey = <T>(
  thing: T,
  key: string,
): boolean => {
  return key in thing; // Ok (as T may be instantiated with a valid type)
};

function invalidHasKey<T extends string | number>(
  thing: T,
  key: string,
): boolean {
  return key in thing; // Error (because all possible instantiations are errors)
}

function union1<T extends string | number, U extends boolean>(thing: T | U) {
  "key" in thing; // Error (because all possible instantiations are errors)
}

function union2<T extends object, U extends string | number>(thing: T | U) {
  "key" in thing; // Error (because narrowing is possible)
  if (typeof thing === "object") {
    "key" in thing; // Ok
  }
}

function union3<T>(thing: T | string | number) {
  "key" in thing; // Error (because narrowing is possible)
  if (typeof thing !== "string" && typeof thing !== "number") {
    "key" in thing; // Ok (because further narrowing is impossible)
  }
}

function union4<T extends object | "hello">(thing: T) {
  "key" in thing; // Ok (because narrowing is impossible)
}

function union5<T extends object | string, U extends object | number>(p: T | U) {
    // For consistency, this should probably not be an error, because useful
    // narrowing is impossible. However, this is exceptionally strange input,
    // and it adds a lot of complexity to distinguish between a `T | U` where
    // one constraint is non-primitive and the other is primitive and a `T | U`
    // like this where both constraints have primitive and non-primitive
    // constitutents. Also, the strictly sound behavior would be to error
    // here, which is what's happening, so "fixing" this by suppressing the
    // error seems very low-value.
    "key" in p;
    if (typeof p === "object") {
        "key" in p;
    }
}

function intersection1<T extends number, U extends 0 | 1 | 2>(thing: T & U) {
  "key" in thing; // Error (because all possible instantiations are errors)
}

function intersection2<T>(thing: T & (0 | 1 | 2)) {
  "key" in thing; // Error (because all possible instantations are errors)
}
