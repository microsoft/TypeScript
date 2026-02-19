export enum ElementFlags {
    None = 0,
    Required = 1 << 0,
    Optional = 1 << 1,
    Rest = 1 << 2,
    Variadic = 1 << 3,
    Fixed = Required | Optional,
    Variable = Rest | Variadic,
    NonRequired = Optional | Rest | Variadic,
}
