//// [reverseMappedTypeContextualTypeNotCircular.ts]
type Selector<S, R> = (state: S) => R;

declare function createStructuredSelector<S, T>(
  selectors: {[K in keyof T]: Selector<S, T[K]>},
): Selector<S, T>;

const editable = () => ({});

const mapStateToProps = createStructuredSelector({
  editable: (state: any, props: any) => editable(), // expect "Type '(state: any, props: any) => {}' is not assignable to type 'Selector<unknown, {}>'", _not_ a circularity error
});

//// [reverseMappedTypeContextualTypeNotCircular.js]
var editable = function () { return ({}); };
var mapStateToProps = createStructuredSelector({
    editable: function (state, props) { return editable(); }
});
