//// [declaredExternalModuleWithExportAssignment.ts]
declare module 'connect' {
    interface connectModule {
        (res, req, next): void;
    }

    interface connectExport {
        use: (mod: connectModule) => connectExport;
        listen: (port: number) => void;
    }

    var server: {
        (): connectExport;
        test1: connectModule;
        test2(): connectModule;
    };
    export = server;
}


//// [declaredExternalModuleWithExportAssignment.js]
