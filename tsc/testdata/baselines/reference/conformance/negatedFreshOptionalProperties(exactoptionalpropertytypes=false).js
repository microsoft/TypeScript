//// [tests/cases/conformance/types/negated/negatedFreshOptionalProperties.ts] ////

//// [negatedFreshOptionalProperties.ts]
declare const optionalStringProperty: { value?: string };

const overlappingOptionalProperties: not { value?: number } = { ...optionalStringProperty }; // Should error

//// [negatedFreshOptionalProperties.js]
"use strict";
const overlappingOptionalProperties = { ...optionalStringProperty }; // Should error
