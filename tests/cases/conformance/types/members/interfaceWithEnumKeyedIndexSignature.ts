// @strict: true
export interface UserInterfaceColors {
    [index: UserInterfaceElement]: ColorInfo;
}
export interface ColorInfo {
    r: number;
    g: number;
    b: number;
    a: number;
}
export enum UserInterfaceElement {
    ActiveTitleBar = 0,
    InactiveTitleBar = 1,
}

const x: UserInterfaceColors = null as any;

declare function expectColInfo(x: ColorInfo): void;

// correct uses
expectColInfo(x[UserInterfaceElement.ActiveTitleBar]);
expectColInfo(x[UserInterfaceElement.InactiveTitleBar]);

// errors
expectColInfo(x[0]);
expectColInfo(x[1]);
expectColInfo(x["0"]);
expectColInfo(x["1"]);
expectColInfo(x[0 as number]);
expectColInfo(x["0" as string]);
expectColInfo(x[12]);
