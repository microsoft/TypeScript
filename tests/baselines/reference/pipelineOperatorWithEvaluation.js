//// [pipelineOperatorWithEvaluation.ts]
var obj = {
  _prop: 0,

  get prop() {
    return this._prop = 1;
  },

  get method() {
    return (v: number) => v + 1;
  }
};

var result = obj.prop |> obj.method;


//// [pipelineOperatorWithEvaluation.js]
var obj = {
    _prop: 0,
    get prop() {
        return this._prop = 1;
    },
    get method() {
        return (v) => v + 1;
    }
};
var result = (_ref_1 = obj.prop, obj.method(_ref_1));
var _ref_1;
