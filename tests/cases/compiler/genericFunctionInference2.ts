// Repro from #30685

type Reducer<S> = (state: S) => S;
declare function combineReducers<S>(reducers: { [K in keyof S]: Reducer<S[K]> }): Reducer<S>;

type MyState = { combined: { foo: number } };
declare const foo: Reducer<MyState['combined']['foo']>;

const myReducer1: Reducer<MyState> = combineReducers({
    combined: combineReducers({ foo }),
});

const myReducer2 = combineReducers({
    combined: combineReducers({ foo }),
});
