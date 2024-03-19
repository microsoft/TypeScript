// @filename: main.ts
import * as intermediate from './intermediate'
const ghost: intermediate.Ghost = new intermediate.Ghost()

// @filename: intermediate.ts
export type * from './ghost'

// @filename: ghost.ts
export class Ghost {}