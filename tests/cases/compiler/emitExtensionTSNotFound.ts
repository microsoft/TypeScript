// @emitExtension: .ts
// @outDir: ./out/

// @Filename: 0.ts
// should not emit error 2691 but 2307
import num from './1.ts'
num + 1
