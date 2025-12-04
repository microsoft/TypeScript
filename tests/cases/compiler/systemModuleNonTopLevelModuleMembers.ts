// @module: system
// @isolatedModules: true

export class TopLevelClass {}
export namespace TopLevelModule {var v;}
export function TopLevelFunction(): void {}
export enum TopLevelEnum {E}

export namespace TopLevelModule2 {
    export class NonTopLevelClass {}
    export namespace NonTopLevelModule {var v;}
    export function NonTopLevelFunction(): void {}
    export enum NonTopLevelEnum {E}
}