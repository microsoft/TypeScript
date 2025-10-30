//@module: commonjs
// @declaration: true
namespace m2 {
    export interface connectModule {
        (res, req, next): void;
    }
    export interface connectExport {
        use: (mod: connectModule) => connectExport;
        listen: (port: number) => void;
    }

}

var x = 10, m2: {
    (): m2.connectExport;
    test1: m2.connectModule;
    test2(): m2.connectModule;
};

export = m2;