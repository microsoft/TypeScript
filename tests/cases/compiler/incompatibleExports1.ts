declare module "foo" { 
    export interface x { a: string } 
    interface y { a: Date }
    export = y;
}
 
declare module "baz" {
    export namespace a {
        export var b: number;
    }
 
    namespace c {
        export var c: string;
    }
 
    export = c;
}
