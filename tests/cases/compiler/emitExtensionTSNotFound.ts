// @emitExtension: .ts
// @outDir: ./out/

// @Filename: 0.ts
// should not emit error 2961
import num from './1.ts'
num + 1
