<T extends "a">() => {
    const a: T extends "a" ? true : false = undefined!;
    const b: T extends "b" ? true : false = undefined!;

    a !== false; // !!! error TS2367: This condition will always return 'true' since the types 'T extends "a" ? true : false' and 'false' have no overlap.
    false !== a; // !!! error TS2367: This condition will always return 'true' since the types 'false' and 'T extends "a" ? true : false' have no overlap.

    b !== true; // !!! error TS2367: This condition will always return 'true' since the types 'T extends "b" ? true : false' and 'true' have no overlap.
    true !== b; // !!! error TS2367: This condition will always return 'true' since the types 'true' and 'T extends "b" ? true : false' have no overlap.
};
