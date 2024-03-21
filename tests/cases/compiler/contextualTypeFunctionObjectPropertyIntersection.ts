// @strict: true
// @noEmit: true

// repro from #48812

type Action<TEvent extends { type: string }> = (ev: TEvent) => void;

interface MachineConfig<TEvent extends { type: string }> {
  schema: {
    events: TEvent;
  };
  on?: {
    [K in TEvent["type"]]?: Action<TEvent extends { type: K } ? TEvent : never>;
  } & {
    "*"?: Action<TEvent>;
  };
}

declare function createMachine<TEvent extends { type: string }>(
  config: MachineConfig<TEvent>
): void;

createMachine({
  schema: {
    events: {} as { type: "FOO" } | { type: "BAR" },
  },
  on: {
    FOO: (ev) => {
      ev.type; // should be 'FOO'
    },
  },
});

// repro from #49307#issuecomment-1143103607

declare function createSlice<T>(
  reducers: { [K: string]: (state: string) => void } & {
    [K in keyof T]: object;
  }
): void;

createSlice({
  f(a) {},
});

// repro from #49307#issuecomment-1196014488

type Validate<T> = T & { [K in keyof T]: object }
declare function f<S, T extends Record<string, (state: S) => any>>(s: S, x: Validate<T>): void;

f(0, {
  foo: s => s + 1,
})

// repro from 49307#issuecomment-1195858950

type SliceCaseReducers<State> = Record<string, (state: State) => State | void>;

type ValidateSliceCaseReducers<S, ACR extends SliceCaseReducers<S>> = ACR & {
  [T in keyof ACR]: ACR[T] extends {
    reducer(s: S, action?: infer A): any;
  }
    ? {
        prepare(...a: never[]): Omit<A, "type">;
      }
    : {};
};

declare function createSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>
>(options: {
  initialState: State | (() => State);
  reducers: ValidateSliceCaseReducers<State, CaseReducers>;
}): void;

export const clientSlice = createSlice({
  initialState: {
    username: "",
    isLoggedIn: false,
    userId: "",
    avatar: "",
  },
  reducers: {
    onClientUserChanged(state) {},
  },
});
