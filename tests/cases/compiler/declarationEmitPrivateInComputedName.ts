// @declaration: true
enum MyEnum {
    member = 0
}

export const someVar1 = {
    [MyEnum.member]: ""
};

enum MyStringEnum {
    str = "str"
}

export const someVar2 = {
    [MyStringEnum.str]: ""
};

export enum MyExportEnum {
    member = 0
}

export const someVar3 = {
    [MyExportEnum.member]: ""
};

export enum MyExportStringEnum {
    str = "str"
}

export const someVar4 = {
    [MyExportStringEnum.str]: ""
};

enum MyComputedEnum {
    member = Math.random()
}

export const someVar5 = {
    [MyComputedEnum.member]: ""
};
