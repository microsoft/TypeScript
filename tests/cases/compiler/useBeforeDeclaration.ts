// @outFile: test.js

// @fileName: A.ts
namespace ts {
    export function printVersion():void {
        log("Version: " + sys.version);  // the call of sys.version is deferred, should not report an error.
    }

    export function log(info:string):void {

    }
}

// @fileName: B.ts
namespace ts {

    export let sys:{version:string} = {version: "2.0.5"};

}

