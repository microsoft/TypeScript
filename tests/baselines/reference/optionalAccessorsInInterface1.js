//// [optionalAccessorsInInterface1.ts]
interface MyPropertyDescriptor {
    get? (): any;
    set? (v: any): void;
}

declare function defineMyProperty(o: any, p: string, attributes: MyPropertyDescriptor): any;
defineMyProperty({}, "name", { get: function () { return 5; } });

interface MyPropertyDescriptor2 {
    get?: () => any;
    set?: (v: any) => void;
}

declare function defineMyProperty2(o: any, p: string, attributes: MyPropertyDescriptor2): any;
defineMyProperty2({}, "name", { get: function () { return 5; } });


//// [optionalAccessorsInInterface1.js]
defineMyProperty({}, "name", { get: function () { return 5; } });
defineMyProperty2({}, "name", { get: function () { return 5; } });
