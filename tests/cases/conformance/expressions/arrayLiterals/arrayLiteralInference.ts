// @strict: true
// @target: es2015

// Repro from #31204

export enum AppType {
    HeaderDetail = 'HeaderDetail',
    HeaderMultiDetail = 'HeaderMultiDetail',
    AdvancedList = 'AdvancedList',
    Standard = 'Standard',
    Relationship = 'Relationship',
    Report = 'Report',
    Composite = 'Composite',
    ListOnly = 'ListOnly',
    ModuleSettings = 'ModuleSettings'
}

export enum AppStyle {
    Tree,
    TreeEntity,
    Standard,
    MiniApp,
    PivotTable
}

const appTypeStylesWithError: Map<AppType, Array<AppStyle>> = new Map([
    [AppType.Standard, [AppStyle.Standard, AppStyle.MiniApp]],
    [AppType.Relationship, [AppStyle.Standard, AppStyle.Tree, AppStyle.TreeEntity]],
    [AppType.AdvancedList, [AppStyle.Standard, AppStyle.MiniApp]]
]);

// Repro from #31204

declare function foo<T>(...args: T[]): T[];
let b1: { x: boolean }[] = foo({ x: true }, { x: false });
let b2: boolean[][] = foo([true], [false]);
