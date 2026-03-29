// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3276

// There should be no error in this test, but previously there was because of the
// declaration of mock. Commenting it out would make the error disappear.

export const mock: I = {
    m: (_) => {},
};

export interface I {
    m({ x }?: { x: boolean }): void
}
