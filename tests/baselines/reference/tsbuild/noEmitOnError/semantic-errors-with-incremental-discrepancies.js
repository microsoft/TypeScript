0:: no-change-run
Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "../src/main.ts": [
    "../shared/types/db.ts"
  ]
}
Clean: {}