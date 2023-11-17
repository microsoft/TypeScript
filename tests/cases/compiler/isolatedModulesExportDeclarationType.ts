// @isolatedModules: true
// @noTypesAndSymbols: true

// @Filename: /type.ts
export type T = number;

// @Filename: /test1.ts
import { T } from "./type";
const T = 0;      // Error as of #56354
export default T; // Ok

// @Filename: /test2.ts
import { T } from "./type";
type T = number;  // Merge error
export default T; // Transpiler could assume the alias resolves to a value?

// @Filename: /test3.ts
import { T } from "./type";
export default T; // Error

// @Filename: /test4.ts
// @ts-expect-error
import unresolved from "./doesntexist";
export default unresolved;
