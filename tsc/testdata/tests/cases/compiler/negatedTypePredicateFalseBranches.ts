// @strict: true
// @noEmit: true

interface Cat {
    meow(): void;
}

declare function isCat(value: unknown): value is Cat;
declare function isNotCat(value: unknown): value is not Cat;
declare function isString(value: unknown): value is string;
declare function acceptsNotCat(value: not Cat): void;
declare function acceptsCat(value: Cat): void;
declare function acceptsNever(value: never): void;

function checkObject(value: object) {
    if (isCat(value)) {
        acceptsCat(value);
    } else {
        acceptsNotCat(value);
    }
}

function checkEmptyObject(value: {}) {
    if (!isCat(value)) {
        acceptsNotCat(value);
    }
}

function checkUnknown(value: unknown) {
    if (isCat(value)) {
        acceptsCat(value);
    } else {
        acceptsNotCat(value);
    }
}

function checkGeneric<T>(value: T) {
    if (isCat(value)) {
        acceptsCat(value);
    } else {
        acceptsNotCat(value);
    }
}

function checkProperty(container: { value: object }) {
    if (isCat(container.value)) {
        acceptsCat(container.value);
    } else {
        acceptsNotCat(container.value);
    }
}

interface Animal {
    isCat(): this is Cat & Animal;
}

function checkReceiver(value: Animal) {
    if (value.isCat()) {
        acceptsCat(value);
    } else {
        const notCat: not (Cat & Animal) = value;
    }
}

function checkNegatedPredicate(value: unknown) {
    if (!isNotCat(value)) {
        acceptsCat(value);
    }
}

function checkDisjointUnion(value: string | number) {
    if (!isString(value)) {
        const number: number = value;
    }
}

function checkRepeatedPredicate(value: unknown) {
    if (!isCat(value) && isCat(value)) {
        acceptsNever(value);
    }
}

type Membership = { premium: false } | { premium: true };
declare function isPremium(value: Membership): value is Membership & { premium: true };

function checkReducedPredicate(value: Membership) {
    if (!isPremium(value)) {
        const free: { premium: false } = value;
    }
}

function checkNegationDoesNotEscape(value: object) {
    if (!isCat(value)) {
        acceptsNotCat(value);
    }
    acceptsNotCat(value); // Error: the false-branch exclusion does not survive the merge.
}
