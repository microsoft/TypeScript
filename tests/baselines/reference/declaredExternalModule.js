//// [tests/cases/compiler/declaredExternalModule.ts] ////

//// [declaredExternalModule.ts]
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

        test1: connectModule;   // No error

        test2(): connectModule; // ERROR: Return type of method from exported interface has or is using private type ''connect'.connectModule'.

    };
}


//// [declaredExternalModule.js]
