//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig.json --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/core/tsconfig.json
    * src/animals/tsconfig.json
    * src/zoo/tsconfig.json
    * src/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/core/tsconfig.json' is out of date because output file 'src/lib/core/utilities.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/core/tsconfig.json'...

[96msrc/animals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/src/animals/animal.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96msrc/animals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/src/animals/animal.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96msrc/animals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6059: [0mFile '/src/animals/dog.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96msrc/animals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6307: [0mFile '/src/animals/dog.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96msrc/core/utilities.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS6133: [0m'A' is declared but its value is never read.

[7m1[0m import * as A from '../animals';
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/core/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/src/animals/index.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.

[7m1[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m

[96msrc/core/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/src/animals/index.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m

[[90m12:00:00 AM[0m] Project 'src/animals/tsconfig.json' can't be built because its dependency 'src/core' has errors

[[90m12:00:00 AM[0m] Skipping build of project '/src/animals/tsconfig.json' because its dependency '/src/core' has errors

[[90m12:00:00 AM[0m] Project 'src/zoo/tsconfig.json' can't be built because its dependency 'src/animals' was not built

[[90m12:00:00 AM[0m] Skipping build of project '/src/zoo/tsconfig.json' because its dependency '/src/animals' was not built


Found 7 errors.

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



