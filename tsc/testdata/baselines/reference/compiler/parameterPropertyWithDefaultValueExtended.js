//// [tests/cases/compiler/parameterPropertyWithDefaultValueExtended.ts] ////

//// [parameterPropertyWithDefaultValueExtended.ts]
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

//// [parameterPropertyWithDefaultValueExtended.js]
// Test with default value - should not have undefined
export class WithDefault {
    timestamp;
    constructor(timestamp = new Date()) {
        this.timestamp = timestamp;
    }
}
// Test without default value but optional - should have undefined
export class WithoutDefault {
    timestamp;
    constructor(timestamp) {
        this.timestamp = timestamp;
    }
}
// Test with explicit undefined type - should keep it
export class ExplicitUndefined {
    timestamp;
    constructor(timestamp = new Date()) {
        this.timestamp = timestamp;
    }
}
// Test private parameter property with default value
export class PrivateWithDefault {
    timestamp;
    constructor(timestamp = new Date()) {
        this.timestamp = timestamp;
    }
}
// Test public parameter property with default value
export class PublicWithDefault {
    timestamp;
    constructor(timestamp = new Date()) {
        this.timestamp = timestamp;
    }
}


//// [parameterPropertyWithDefaultValueExtended.d.ts]
export declare class WithDefault {
    readonly timestamp: Date;
    constructor(timestamp?: Date);
}
export declare class WithoutDefault {
    readonly timestamp?: Date | undefined;
    constructor(timestamp?: Date | undefined);
}
export declare class ExplicitUndefined {
    readonly timestamp: Date | undefined;
    constructor(timestamp?: Date | undefined);
}
export declare class PrivateWithDefault {
    private timestamp;
    constructor(timestamp?: Date);
}
export declare class PublicWithDefault {
    timestamp: Date;
    constructor(timestamp?: Date);
}
