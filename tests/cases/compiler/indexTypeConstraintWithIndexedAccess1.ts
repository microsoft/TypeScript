// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/21760

interface IExample {
    foo: {
        bar: {
            baz: number;
        }
    }
}

type F = <
    name extends keyof IExample,
    val extends keyof IExample[name]
>() => IExample[name][val]['baz'];

export type Nested = {
  nest: {
    foo: string[];
    bar: number[];
  };
};

export const test = <
  T extends keyof Nested,
  K extends keyof Nested[T],
  V extends Nested[T][K][number],
>(
  type: T,
  key: K,
  value: V,
) => {};

const constRoutes = {
  users: {
    admin: {
      get: "/admin",
    },
  },
} as const;
type ConstRoutes = typeof constRoutes;
type ConstRouteSectionName = keyof ConstRoutes;
type ConstRouteModelName<Section extends ConstRouteSectionName> =
  keyof ConstRoutes[Section];

function getForConstRoute<
  Section extends ConstRouteSectionName,
  Model extends ConstRouteModelName<Section>,
>(section: Section, model: Model): string {
  return constRoutes[section][model].get;
}

interface IndexedActions {
  a: {
    start: {
      foo: string;
    };
  };
}

type DeriveInputType<
  N extends keyof IndexedActions,
  A extends keyof IndexedActions[N],
> = IndexedActions[N][A] & { namespace: N; verb: A };

function doAction<
  N extends keyof IndexedActions,
  A extends keyof IndexedActions[N],
>(action: DeriveInputType<N, A>) {
  const s: string = action.verb;
}
