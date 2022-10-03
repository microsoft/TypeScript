//// [anyIsAssignableToObject.ts]
interface P {
    p: {};
}

interface Q extends P { // Check assignability here. Any is assignable to {}
    p: any;
}

//// [anyIsAssignableToObject.js]
