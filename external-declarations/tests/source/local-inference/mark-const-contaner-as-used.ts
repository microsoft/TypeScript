// @strict: true
// @target: es2015

// @filename: const-def.ts
export const E = {
    A: "A"
} as const;
export const V = "V"

// @filename: const-use.ts
import { E , V} from './const-def'
export const value = {
    [E.A]: 0,
    [V]: 1,
}