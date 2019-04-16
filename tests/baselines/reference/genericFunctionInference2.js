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

// Repro from #30942

declare function withH<T, U>(handlerCreators: HandleCreatorsFactory<T, U>): U;

type Props = { out: number }

type HandleCreatorsFactory<T, U> = (initialProps: T) => { [P in keyof U]: (props: T) => U[P] };

const enhancer4 = withH((props: Props) => ({
    onChange: (props) => (e: any) => {},
    onSubmit: (props) => (e: any) => {},
}));

enhancer4.onChange(null);


//// [genericFunctionInference2.js]
// Repro from #30685
var myReducer1 = combineReducers({
    combined: combineReducers({ foo: foo })
});
var myReducer2 = combineReducers({
    combined: combineReducers({ foo: foo })
});
var enhancer4 = withH(function (props) { return ({
    onChange: function (props) { return function (e) { }; },
    onSubmit: function (props) { return function (e) { }; }
}); });
enhancer4.onChange(null);
