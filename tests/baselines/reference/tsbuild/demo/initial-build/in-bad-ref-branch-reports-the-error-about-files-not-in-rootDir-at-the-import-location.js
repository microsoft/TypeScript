//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig.json --verbose
12:00:00 AM - Projects in this build: 
    * src/core/tsconfig.json
    * src/animals/tsconfig.json
    * src/zoo/tsconfig.json
    * src/tsconfig.json

12:00:00 AM - Project 'src/core/tsconfig.json' is out of date because output file 'src/lib/core/utilities.js' does not exist

12:00:00 AM - Building project '/src/core/tsconfig.json'...

src/animals/index.ts(1,20): error TS6059: File '/src/animals/animal.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.
src/animals/index.ts(1,20): error TS6307: File '/src/animals/animal.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.
src/animals/index.ts(4,32): error TS6059: File '/src/animals/dog.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.
src/animals/index.ts(4,32): error TS6307: File '/src/animals/dog.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.
src/core/utilities.ts(1,1): error TS6133: 'A' is declared but its value is never read.
src/core/utilities.ts(1,20): error TS6059: File '/src/animals/index.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.
src/core/utilities.ts(1,20): error TS6307: File '/src/animals/index.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.
12:00:00 AM - Project 'src/animals/tsconfig.json' can't be built because its dependency 'src/core' has errors

12:00:00 AM - Skipping build of project '/src/animals/tsconfig.json' because its dependency '/src/core' has errors

12:00:00 AM - Project 'src/zoo/tsconfig.json' can't be built because its dependency 'src/animals' was not built

12:00:00 AM - Skipping build of project '/src/zoo/tsconfig.json' because its dependency '/src/animals' was not built

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/core/utilities.ts]
import * as A from '../animals';

export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}



