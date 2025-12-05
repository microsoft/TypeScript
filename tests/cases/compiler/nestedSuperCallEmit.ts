// @target: es5
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/55646
abstract class Foo {
    constructor(shouldThrow: boolean) {
        if (shouldThrow) {
            throw new Error('Please retry');
        } else {
            console.log('OK');
        }
    }
}

class Bar extends Foo {
    constructor() {
        try {
            super(true);
        } catch (e: unknown) {
            console.log('Error: ' + (e as Error).message);
            // retry
            super(false);
        }
    }
}

new Bar();
