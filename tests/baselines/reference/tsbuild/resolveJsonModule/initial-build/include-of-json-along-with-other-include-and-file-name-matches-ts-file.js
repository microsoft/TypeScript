//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig_withIncludeOfJson.json
error TS5056: Cannot write file '/src/dist/src/index.d.ts' because it would be overwritten by multiple input files.
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/src/hello.json] unlink
//// [/src/src/index.json]
{"hello":"world"}

//// [/src/src/index.ts]
import hello from "./index.json"

export default hello.hello

