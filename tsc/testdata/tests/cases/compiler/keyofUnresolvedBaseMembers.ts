// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3494

declare class STModel<TAttrs extends {} = any, TCreate extends {} = TAttrs> {
  $add: (propertyKey: string) => void;
  $set: (propertyKey: keyof this) => void;
  data: TAttrs;
  newAttrs: TCreate;
}

interface IBase { id: string }

type Attrs<T extends {}> = { [K in keyof T]: T[K] } & IBase;
type CreateAttrs<T extends {}> = Partial<Attrs<T>>;

abstract class BaseModel<MA extends {}> extends STModel<Attrs<MA>, CreateAttrs<MA>> {}

class _Foo extends BaseModel<_Foo> {
  declare name: string;
}

const ctor: new () => STModel = _Foo;
console.log(ctor);
