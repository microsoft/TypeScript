// @strict: true
// @target: esnext
// @noEmit: true

declare class Editor {
  private _editor;
}

declare class Plugin {
  private _plugin;
}

type ParentConfig<T> = Partial<{
  [P in keyof T]: Required<T>[P] extends (...args: any) => any
    ? (...args: Parameters<Required<T>[P]>) => ReturnType<Required<T>[P]>
    : T[P];
}>;

interface ExtendableConfig<
  Options = any,
  Config extends
    | ExtensionConfig<Options>
    | ExtendableConfig<Options> = ExtendableConfig<Options, any>,
> {
  name: string;
  addOptions?: (this: {
    name: string;
    parent: ParentConfig<Config>["addOptions"];
  }) => Options;
  addProseMirrorPlugins?: (this: {
    options: Options;
    editor: Editor;
  }) => Plugin[];
}

interface ExtensionConfig<Options = any>
  extends ExtendableConfig<Options, ExtensionConfig<Options>> {}

declare class Extension<Options = any> {
  _options: Options;

  static create<O = any>(config: Partial<ExtensionConfig<O>>): Extension<O>;

  configure(options?: Partial<Options>): Extension<Options>;
}

interface SuggestionOptions {
  editor: Editor;
  char?: string;
}

declare function Suggestion(options: SuggestionOptions): Plugin;

Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
      } as SuggestionOptions,
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor, // error
        ...this.options.suggestion,
      }),
    ];
  },
});

Extension.create({
  name: "slash-command",
  addOptions: () => {
    return {
      suggestion: {
        char: "/",
      } as SuggestionOptions,
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor, // error
        ...this.options.suggestion,
      }),
    ];
  },
});

const parentExtension = Extension.create({
  name: "parentExtension",
  addOptions() {
    return { parent: "exists", overwrite: "parent" };
  },
});

const childExtension = parentExtension.configure({
  child: "exists-too", // error
  overwrite: "child",
});

const parentExtension2 = Extension.create({
  name: "parentExtension2",
  addOptions: () => {
    return { parent: "exists", overwrite: "parent" };
  },
});

const childExtension2 = parentExtension2.configure({
  child: "exists-too", // error
  overwrite: "child",
});

export {};
