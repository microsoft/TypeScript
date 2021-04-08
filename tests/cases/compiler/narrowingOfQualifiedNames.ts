// @strict: true

interface IProperties {
    foo?: {
        aaa: string
        bbb: string
    }
}

function init(properties: IProperties) {
    if (properties.foo) {
        type FooOK = typeof properties.foo;
        properties.foo; // type is { aaa: string; bbb: string; }
        for (const x of [1, 2, 3]) {
          properties.foo; // type is { aaa: string; bbb: string; }
          type FooOrUndefined = typeof properties.foo; //type is { aaa: string; bbb: string; } | undefined
        }
    }
}