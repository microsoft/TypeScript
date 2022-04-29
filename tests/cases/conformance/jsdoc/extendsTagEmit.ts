// @allowJs: true
// @checkJs: true
// @target: esnext
// @outDir: out
// @Filename: super.js
export class B { }

// @Filename: main.js
import { B } from './super'
/** @extends {Mismatch} */
class C extends B { }

