// @esModuleInterop: true

// @Filename: bar.d.ts
import * as foo from './foo'
export as namespace foo
export = foo;

declare global {
    const foo: typeof foo;
}

// @Filename: foo.d.ts
interface Root {
    /**
     * A .default property for ES6 default import compatibility
     */
    default: Root;
}

declare const root: Root;
export = root;
