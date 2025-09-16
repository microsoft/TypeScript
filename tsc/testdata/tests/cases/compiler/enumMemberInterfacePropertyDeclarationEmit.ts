// @declaration: true
// @noTypesAndSymbols: true
// @isolatedDeclarations: true

// @Filename: enum.ts
export enum WWMF{
    AAR = 'AAR',
}

// @Filename: base.ts
import type { WWMF } from "./enum";

interface WWMFMap {
    [WWMF.AAR]?: any;
}

export const wwmfMap: WWMFMap = {};
