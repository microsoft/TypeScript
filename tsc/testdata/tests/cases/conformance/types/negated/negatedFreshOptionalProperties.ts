// @strict: true
// @exactOptionalPropertyTypes: true, false

declare const optionalStringProperty: { value?: string };

const overlappingOptionalProperties: not { value?: number } = { ...optionalStringProperty }; // Should error