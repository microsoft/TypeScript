// @target: es6
// @experimentalPipelineOperator: true
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
