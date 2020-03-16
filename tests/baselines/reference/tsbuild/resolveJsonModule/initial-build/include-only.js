//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig_withInclude.json
[96msrc/src/index.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS6307: [0mFile '/src/src/hello.json' is not listed within the file list of project '/src/tsconfig_withInclude.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import hello from "./hello.json"
[7m [0m [91m                  ~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


