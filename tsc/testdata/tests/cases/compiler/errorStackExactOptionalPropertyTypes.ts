// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/45748

// An Error subtype may declare `stack` as possibly undefined.
interface MyError extends Error {
    stack: string | undefined;
}

declare const myError: MyError;
const asError: Error = myError;

// `stack` may be explicitly set to undefined.
declare const err: Error;
err.stack = undefined;

// Narrowing `stack` back to `string` in a subtype is still allowed.
interface StrictStackError extends Error {
    stack?: string;
}

class StrictStackErrorClass extends Error {
    declare stack?: string;
}

// Trade-off: an Error is no longer assignable to a type whose optional `stack`
// excludes undefined.
declare function takesErrorLike(e: { message: string; stack?: string }): void;
takesErrorLike(err);
