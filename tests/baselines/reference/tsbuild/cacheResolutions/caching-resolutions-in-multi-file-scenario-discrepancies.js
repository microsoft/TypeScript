0:: no-change-run
Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./filewithimports.ts": [
    "./node_modules/pkg0/import.d.ts"
  ],
  "./filewithtyperefs.ts": [
    "./node_modules/pkg2/import.d.ts"
  ]
}
Clean: {}
1:: write file not resolved by import
Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./filewithtyperefs.ts": [
    "./node_modules/pkg2/import.d.ts"
  ]
}
Clean: {}