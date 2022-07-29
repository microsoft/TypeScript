// @resolveJsonModule: true
// @traceResolution: true
// @esModuleInterop: true


// @Filename: /hello.locstring.json
{ "hello": "Hello World" }

// @Filename: /hello.locstring.json.d.ts
declare const _default: {
    hello: number;
};
export default _default;

// @Filename: /types.d.ts
type ResourceId = string & { __ResourceId: void };
declare module "*.locstring.json" {
    const value: { [key: string]: ResourceId };
    export default value;
}

// @Filename: /a.ts
import strings from './hello.locstring.json';

strings.hello;
