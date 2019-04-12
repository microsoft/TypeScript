//// [genericFunctionInference2.ts]
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


//// [genericFunctionInference2.js]
// Repro from #30685
var myReducer1 = combineReducers({
    combined: combineReducers({ foo: foo })
});
var myReducer2 = combineReducers({
    combined: combineReducers({ foo: foo })
});
