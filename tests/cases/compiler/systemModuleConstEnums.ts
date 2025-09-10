// @module: system

declare function use(a: any);
const enum TopLevelConstEnum { X }

export function foo() {
    use(TopLevelConstEnum.X);
    use(M.NonTopLevelConstEnum.X);
}

namespace M {
    export const enum NonTopLevelConstEnum { X }
}