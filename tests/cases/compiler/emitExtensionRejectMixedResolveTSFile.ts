// @emitExtension: .tsx
// @outDir: ../out/
// @jsx: react

// @Filename: 0.ts
// For the deno case
export default 0

// @Filename: 1.ts
import num from './0.ts'
import num2 from './2.tsx'
num + num2

// @Filename: 2.tsx
export default 1
