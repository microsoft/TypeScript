// @isolatedModules: false, true
// @verbatimModuleSyntax: false, true
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: types.ts
export type FC = () => void;

// @Filename: bad.ts
import { FC } from "./types";
let FC: FC | null = null;

// @Filename: good.ts
import type { FC } from "./types";
let FC: FC | null = null;
