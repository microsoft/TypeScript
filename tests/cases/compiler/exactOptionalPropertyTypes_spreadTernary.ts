// @target: es2015
// @strict: true
// @exactOptionalPropertyTypes: true


type Foo = {
    parentId?: string;
};

declare const requestBody: Foo;
declare const cond: boolean;
let target: Foo;

// Direct assignment — correctly flagged
target = { parentId: requestBody.parentId }; // Error

// Spread + ternary with optional property access — must also be flagged
target = { ...(cond ? { parentId: requestBody.parentId } : {}) }; // Error

// Destructured optional property — must also be flagged
const { parentId } = requestBody;
target = { ...(cond ? { parentId } : {}) }; // Error

// Explicit `string | undefined` value — must be flagged (was already working)
const parentId2 = '' as string | undefined;
target = { ...(cond ? { parentId: parentId2 } : {}) }; // Error

// ------------------------------------------------------------------
// Valid cases — must NOT produce errors
// ------------------------------------------------------------------

// Spreading the whole Foo object is fine (its optional properties are already correctly typed)
target = { ...(cond ? requestBody : {}) }; // OK

// A required string value is fine
const parentId3 = 'hello';
target = { ...(cond ? { parentId: parentId3 } : {}) }; // OK

// Spreading an object where the property is narrowed to string
if (cond && requestBody.parentId !== undefined) {
    target = { ...(cond ? { parentId: requestBody.parentId } : {}) }; // OK — narrowed to string
}
