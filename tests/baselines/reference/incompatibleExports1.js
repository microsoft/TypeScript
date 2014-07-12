//// [incompatibleExports1.ts]
declare module "foo" { 
    export interface x { a: string } 
    interface y { a: Date }
    export = y;
}
 
declare module "baz" {
    export module a {
        export var b: number;
    }
 
    module c {
        export var c: string;
    }
 
    export = c;
}


//// [incompatibleExports1.js]
