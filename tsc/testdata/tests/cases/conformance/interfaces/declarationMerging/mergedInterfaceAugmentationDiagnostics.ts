// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: global.ts
interface GlobalBase { value: number }
interface GlobalInterface extends GlobalBase {}

declare module "ambient" {
    interface Base { value: number }
    export interface AmbientInterface extends Base {}
}

// @filename: ambient.d.ts
declare module "ambient" {
    export interface AmbientInterface { value: string }
}

// @filename: original.ts
export interface Base { value: number }
export interface AugmentedInterface extends Base {}

interface Visibility {}
export interface Visibility {}
namespace Visibility { export const other = 1; }

// @filename: augmentation.ts
import "./original";

declare module "./original" {
    interface AugmentedInterface { value: string }
}

declare global {
    interface GlobalInterface { value: string }
}
