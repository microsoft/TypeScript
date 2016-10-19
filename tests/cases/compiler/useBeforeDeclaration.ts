// @fileName: tsconfig.json
// {
//     "compilerOptions": {
//     "target": "es5",
//         "outFile" : "test.js"
//     },
//     "files": [
//     "A.ts",
//     "B.ts"
//     ]
// }


// @fileName: A.ts
namespace ts {
    export function printVersion():void {
        console.log("Version: " + sys.version);  // the call of sys.version is deferred, should not report an error.
    }
}

// @fileName: B.ts
namespace ts {

    export let sys:{version:string} = {version: "2.0.5"};

    ts.printVersion();
}

