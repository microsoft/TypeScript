// @strict: true
// @noEmit: true

// repro #52003

declare const fn: () => string | void;
const value = fn();

const result = {
    type: typeof value === "undefined" ? "A" : "B",
    value: value,
};
