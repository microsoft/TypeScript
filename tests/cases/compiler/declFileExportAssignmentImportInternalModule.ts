//@module: commonjs
// @declaration: true
namespace m3 {
    export namespace m2 {
        export interface connectModule {
            (res, req, next): void;
        }
        export interface connectExport {
            use: (mod: connectModule) => connectExport;
            listen: (port: number) => void;
        }

    }

    export var server: {
        (): m2.connectExport;
        test1: m2.connectModule;
        test2(): m2.connectModule;
    };
}

import m = m3
export = m;