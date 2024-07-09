// @module: system
// @isolatedModules: true

export class TopLevelClass {}
export module TopLevelModule {var v;}
export function TopLevelFunction(): void {}
export enum TopLevelEnum {E}

export module TopLevelModule2 {
    export class NonTopLevelClass {}
    export module NonTopLevelModule {var v;}
    export function NonTopLevelFunction(): void {}
    export enum NonTopLevelEnum {E}
}