// @strict: true
// @noEmit: true

type ComputedGetter<T> = (oldValue?: T) => T;
type ComputedOptions = Record<string, ComputedGetter<any>>;

type ExtractComputedReturns<T extends any> = {
  [key in keyof T]: T[key] extends (...args: any[]) => infer TReturn
    ? TReturn
    : never;
};

interface ComponentOptionsBase<D, C extends ComputedOptions> {
  data?: D;
  computed?: C;
}

type ComponentPublicInstance<D = {}, C extends ComputedOptions = {}> = D &
  ExtractComputedReturns<C>;

type ComponentOptions<
  D = any,
  C extends ComputedOptions = any,
> = ComponentOptionsBase<D, C> & ThisType<ComponentPublicInstance<D, C>>;

interface App {
  mixin(mixin: ComponentOptions): this;
}

interface InjectionKey<T> extends Symbol {}

interface Ref<T> {
  _v: T;
}

declare function reactive<T extends object>(target: T): Ref<T>;

interface ThemeInstance {
  readonly name: Readonly<Ref<string>>;
}

declare const ThemeSymbol: InjectionKey<ThemeInstance>;

declare function inject(
  this: ComponentPublicInstance,
  key: InjectionKey<any> | string,
): any;

declare const app: App;
app.mixin({
  computed: {
    $vuetify() {
      // this is meant to be `any` here
      return reactive({
        theme: inject.call(this, ThemeSymbol),
      });
    },
  },
});
