// @target: es2015
// @declaration: true
// @exactOptionalPropertyTypes: true
// @strict: true

// Test with default value - should not have undefined
export class WithDefault {
  constructor(readonly timestamp = new Date()) {}
}

// Test without default value but optional - should have undefined
export class WithoutDefault {
  constructor(readonly timestamp?: Date) {}
}

// Test with explicit undefined type - should keep it
export class ExplicitUndefined {
  constructor(readonly timestamp: Date | undefined = new Date()) {}
}

// Test private parameter property with default value
export class PrivateWithDefault {
  constructor(private timestamp = new Date()) {}
}

// Test public parameter property with default value
export class PublicWithDefault {
  constructor(public timestamp = new Date()) {}
}