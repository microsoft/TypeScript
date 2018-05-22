//// [complextypeExampleNoOOM.ts]
class HList {
    static hnil(): HNil {
      return HNil.instance;
    }
    static hcons<V, Next extends HList>(value: V, next: Next) {
      return new HCons<V, Next>(value, next);
    }
  }
  class HNil extends HList {
    static readonly instance = new HNil();
    private readonly __hnil = 0;
  }
  class HCons<Value, Next extends HList> extends HList {
    constructor(readonly value: Value, readonly next: Next) {
      super();
    }
  }
  
  type IsHNil<H extends HList> = H extends HNil ? '1' : '0';
  type IsHCons<H extends HList> = H extends HCons<any, any> ? '1' : '0';
  type GetValue<H extends HList> = H extends HCons<infer V, any> ? V : never;
  type GetNext<H extends HList> = H extends HCons<any, infer N> ? N : never;
  
  // Keys
  type JsObject = { [key: string]: any };
  type Unionize<T> = keyof T extends infer K
    ? K extends string & keyof T ? Record<K, T[K]> : never
    : never;
  type KeysRec<T> = T extends Record<infer K, infer V>
    ? {
        "1": V extends JsObject ? HCons<K, HKeys<V>> : HCons<K, HNil>;
        "0": HCons<K, HNil>;
      }[V extends JsObject ? '1' : '0']
    : HNil;
  type HKeys<T> = KeysRec<Unionize<T>>;
  
  type DistriHelper<T, V> = T extends infer U ? HCons<V, U> : never;
  
  type Normalize<T extends HList> = T extends HCons<infer V, infer N>
    ? {
        "1": DistriHelper<Normalize<N>, V>;
        "0": HCons<V, HNil>;
      }[IsHCons<N>]
    : HNil;
  
  type HListToArray<H extends HCons<any, any>> = H extends HCons<infer V1, HNil>
    ? [V1]
    : (H extends HCons<infer V1, HCons<infer V2, HNil>>
        ? [V1, V2]
        : (H extends HCons<infer V1, HCons<infer V2, HCons<infer V3, HNil>>>
            ? [V1, V2, V3]
            : (H extends HCons<
                infer V1,
                HCons<infer V2, HCons<infer V3, HCons<infer V4, HNil>>>
              >
                ? [V1, V2, V3, V4]
                : (H extends HCons<
                    infer V1,
                    HCons<
                      infer V2,
                      HCons<infer V3, HCons<infer V4, HCons<infer V5, HNil>>>
                    >
                  >
                    ? [V1, V2, V3, V4, V5]
                    : never))));
  
  type HListToArray2<H extends HCons<any, any>> = H extends HCons<
    infer V1,
    infer N
  >
    ? (N extends HCons<infer V2, infer N>
        ? (N extends HCons<infer V3, infer N>
            ? (N extends HCons<infer V4, infer N>
                ? (N extends HCons<infer V5, infer N>
                    ? [V1, V2, V3, V4, V5]
                    : [V1, V2, V3, V4])
                : [V1, V2, V3])
            : [V1, V2])
        : [V1])
    : HNil;
  
  type NHKeys<T> = Normalize<HKeys<T>>;
  
  // ADDING THIS LINE WOULD HANG THE COMPILER
  type Keys<T> = HListToArray2<NHKeys<T>>;

//// [complextypeExampleNoOOM.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HList = /** @class */ (function () {
    function HList() {
    }
    HList.hnil = function () {
        return HNil.instance;
    };
    HList.hcons = function (value, next) {
        return new HCons(value, next);
    };
    return HList;
}());
var HNil = /** @class */ (function (_super) {
    __extends(HNil, _super);
    function HNil() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__hnil = 0;
        return _this;
    }
    HNil.instance = new HNil();
    return HNil;
}(HList));
var HCons = /** @class */ (function (_super) {
    __extends(HCons, _super);
    function HCons(value, next) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.next = next;
        return _this;
    }
    return HCons;
}(HList));
