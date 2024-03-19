// @isolatedModules: true,false
// @noTypesAndSymbols: true
// @target: esnext

// @filename: ./foo.ts
import { BAR } from './bar';
enum Foo { A = `${BAR}` }

// @filename: ./bar.ts
export const BAR = 'bar';