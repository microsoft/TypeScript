// @strict: true
// @strictNullChecks: true, false
// @noEmit: true

type Brand = { readonly brand: unique symbol };
type BrandedVoid = void & Brand;
type BrandedString = string & Brand;

interface TextRange {
    pos: number;
    end: number;
}

function truthy(value: TextRange | BrandedVoid) {
    if (value) {
        const range: TextRange = value;
    }
}

function falsy(value: TextRange | BrandedVoid) {
    if (!value) {
        const absent: BrandedVoid = value;
        const present: never = value; // Error: branded void is retained in the falsy branch.
    }
}

function notString(value: TextRange | BrandedString | BrandedVoid) {
    if (value && typeof value !== "string") {
        const range: TextRange = value;
    }
}

function redundantStringCheck(value: BrandedString | undefined) {
    if (value && value !== "") {
        const text: BrandedString & not "" = value;
    }
}
