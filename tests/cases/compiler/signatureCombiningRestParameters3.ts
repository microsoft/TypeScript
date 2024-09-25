// @strict: true
// @noEmit: true

interface ExtensionConfig<Options = any> {
  extendMarkSchema?:
    | ((
        this: {
          name: string;
          options: Options;
        },
        extension: Mark,
      ) => Record<string, any>)
    | null;
}

declare class Extension<Options = any> {
  type: string;
  name: string;
  parent: Extension | null;
  child: Extension | null;
  options: Options;
  config: ExtensionConfig;
}

declare class Node<Options = any> {
  type: string;
  name: string;
  parent: Node | null;
  child: Node | null;
  options: Options;
}

interface NodeConfig<Options = any> {
  extendMarkSchema?:
    | ((
        this: {
          name: string;
          options: Options;
        },
        extension: Node,
      ) => Record<string, any>)
    | null;
}

declare class Mark<Options = any> {
  options: Options;
  config: MarkConfig;
}

interface MarkConfig<Options = any> {
  extendMarkSchema?:
    | ((
        this: {
          name: string;
          options: Options;
        },
        extension: Mark,
      ) => Record<string, any>)
    | null;
}

type AnyConfig = ExtensionConfig | NodeConfig | MarkConfig;
type AnyExtension = Extension | Node | Mark;

declare const e: AnyExtension;

type RemoveThis<T> = T extends (...args: any) => any
  ? (...args: Parameters<T>) => ReturnType<T>
  : T;

declare function getExtensionField<T = any>(
  extension: AnyExtension,
  field: string,
): RemoveThis<T>;

const extendMarkSchema = getExtensionField<AnyConfig["extendMarkSchema"]>(
  e,
  "extendMarkSchema",
);

declare const extension: Mark<any>;

if (extendMarkSchema) {
  extendMarkSchema(extension); // error
}

export {};
