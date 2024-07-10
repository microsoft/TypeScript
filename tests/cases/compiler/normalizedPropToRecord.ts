// @strict: true
// @exactOptionalPropertyTypes: true,false

type Foo = {
    stuff: Record<string, number>;
};
function getFoo() {
    if (Math.random() > 0.5) {
        return { stuff: { a: 42 } };
    } else {
        return { stuff: { b: 99 } };
    }
}

// Actually fine, but claimed not to be
const p: Foo = getFoo();