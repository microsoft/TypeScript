// @strict: true
// @noEmit: true

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

type AnyConfig = NodeConfig | MarkConfig;
type AnyExtension = Node | Mark;

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
