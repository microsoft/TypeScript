//// [tests/cases/compiler/reactReduxLikeDeferredInferenceAllowsAssignment.ts] ////

//// [reactReduxLikeDeferredInferenceAllowsAssignment.ts]
declare class Component<P> {
  constructor(props: Readonly<P>);
  constructor(props: P, context?: any);
  readonly props: Readonly<P> & Readonly<{ children?: {} }>;
}
interface ComponentClass<P = {}> {
  new (props: P, context?: any): Component<P>;
  propTypes?: WeakValidationMap<P>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
interface FunctionComponent<P = {}> {
  (props: P & { children?: {} }, context?: any): {} | null;
  propTypes?: WeakValidationMap<P>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

declare const nominalTypeHack: unique symbol;
interface Validator<T> {
  (
    props: object,
    propName: string,
    componentName: string,
    location: string,
    propFullName: string
  ): Error | null;
  [nominalTypeHack]?: T;
}
type WeakValidationMap<T> = {
  [K in keyof T]?: null extends T[K]
    ? Validator<T[K] | null | undefined>
    : undefined extends T[K]
    ? Validator<T[K] | null | undefined>
    : Validator<T[K]>
};
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

type Shared<
  InjectedProps,
  DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
> = {
  [P in Extract<
    keyof InjectedProps,
    keyof DecorationTargetProps
  >]?: InjectedProps[P] extends DecorationTargetProps[P]
    ? DecorationTargetProps[P]
    : never
};

// Infers prop type from component C
type GetProps<C> = C extends ComponentType<infer P> ? P : never;

type ConnectedComponentClass<C extends ComponentType<any>, P> = ComponentClass<
  P
> & {
  WrappedComponent: C;
};

type Matching<InjectedProps, DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P]
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <
  C extends ComponentType<Matching<TInjectedProps, GetProps<C>>>
>(
  component: C
) => ConnectedComponentClass<
  C,
  Omit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps
>;

declare const connect: {
  <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: TDispatchProps
  ): InferableComponentEnhancerWithProps<
    ResolveThunks<TDispatchProps>,
    TOwnProps
  >;
};

type InferThunkActionCreatorType<
  TActionCreator extends (...args: any[]) => any
> = TActionCreator extends (
  ...args: infer TParams
) => (...args: any[]) => infer TReturn
  ? (...args: TParams) => TReturn
  : TActionCreator;

type HandleThunkActionCreator<TActionCreator> = TActionCreator extends (
  ...args: any[]
) => any
  ? InferThunkActionCreatorType<TActionCreator>
  : TActionCreator;

type ResolveThunks<TDispatchProps> = TDispatchProps extends {
  [key: string]: any;
}
  ? { [C in keyof TDispatchProps]: HandleThunkActionCreator<TDispatchProps[C]> }
  : TDispatchProps;

interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;
}
interface Action<T = any> {
  type: T;
}
interface AnyAction extends Action {
  [extraProps: string]: any;
}

const simpleAction = (payload: boolean) => ({
  type: "SIMPLE_ACTION",
  payload
});
const thunkAction = (param1: number, param2: string) => async (
  dispatch: Dispatch,
  { foo }: OwnProps
) => {
  return foo;
};
interface OwnProps {
  foo: string;
}
interface TestComponentProps extends OwnProps {
  simpleAction: typeof simpleAction;
  thunkAction(param1: number, param2: string): Promise<string>;
}
class TestComponent extends Component<TestComponentProps> {}
const mapDispatchToProps = { simpleAction, thunkAction };

type Q = HandleThunkActionCreator<typeof simpleAction>;

const Test1 = connect(
  null,
  mapDispatchToProps
)(TestComponent);

export {};


//// [reactReduxLikeDeferredInferenceAllowsAssignment.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var simpleAction = function (payload) { return ({
    type: "SIMPLE_ACTION",
    payload: payload
}); };
var thunkAction = function (param1, param2) { return function (dispatch_1, _a) { return __awaiter(void 0, [dispatch_1, _a], void 0, function (dispatch, _b) {
    var foo = _b.foo;
    return __generator(this, function (_c) {
        return [2 /*return*/, foo];
    });
}); }; };
var TestComponent = /** @class */ (function (_super) {
    __extends(TestComponent, _super);
    function TestComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TestComponent;
}(Component));
var mapDispatchToProps = { simpleAction: simpleAction, thunkAction: thunkAction };
var Test1 = connect(null, mapDispatchToProps)(TestComponent);
