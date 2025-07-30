//// [tests/cases/compiler/parameterPropertyWithDefaultValue.ts] ////

//// [parameterPropertyWithDefaultValue.ts]
export class SomeClass {
  constructor(readonly timestamp = new Date()) {}
}

//// [parameterPropertyWithDefaultValue.js]
export class SomeClass {
    timestamp;
    constructor(timestamp = new Date()) {
        this.timestamp = timestamp;
    }
}


//// [parameterPropertyWithDefaultValue.d.ts]
export declare class SomeClass {
    readonly timestamp: Date;
    constructor(timestamp?: Date);
}
