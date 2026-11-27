// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst

type AsNumber<T> = T extends number ? T : never;

interface Dict {
    [key: string]: number;
}

class ClassDict {
    [key: string]: number;
}

interface GenericDict<T> {
    [key: string]: T;
}

declare function takesDict<K extends string>(x: AsNumber<Dict[K]>): void;
declare function takesClass<K extends string>(x: AsNumber<ClassDict[K]>): void;
declare function takesGeneric<K extends string>(x: AsNumber<GenericDict<number>[K]>): void;

function test<K extends string>(dict: Dict[K], cls: ClassDict[K], generic: GenericDict<number>[K]) {
    takesDict(dict);
    takesClass(cls);
    takesGeneric(generic);
}
