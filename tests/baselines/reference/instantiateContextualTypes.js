//// [instantiateContextualTypes.ts]
// #6611

export interface A<a> {
    value: a;
}

function fn<a>(values: A<a>, value: a) : void {
}

declare let handlers: A<(value: number) => void>;
fn(handlers, value => alert(value));

// #21382

interface BaseProps<T> {
  initialValues: T;
  nextValues: (cur: T) => T;
}
declare class Component<P> { constructor(props: P); props: P; }
declare class GenericComponent<Props = {}, Values = object>
    extends Component<Props & BaseProps<Values>> {
  iv: Values;
}

new GenericComponent({ initialValues: 12, nextValues: val => 12 });

// #22149

declare function useStringOrNumber<T extends string | number>(t: T, useIt: T extends string ? ((s: string) => void) : ((n: number) => void)): void;
useStringOrNumber("", foo => {});

// #25299

type ActionType<P> = string & { attachPayloadTypeHack?: P & never }

type Handler<S, P> = P extends void
    ? (state: S) => S
    : (state: S, payload: P) => S

interface ActionHandler<S, P> {
    actionType: ActionType<P>
    handler: Handler<S, P>
}

declare function handler<S, P>(actionType: ActionType<P>, handler: Handler<S, P>): ActionHandler<S, P>

declare function createReducer<S>(
        defaultState: S,
        ...actionHandlers: ActionHandler<S, any>[]
    ): any

interface AppState {
    dummy: string
}

const defaultState: AppState = {
    dummy: ''
}

const NON_VOID_ACTION: ActionType<number> = 'NON_VOID_ACTION'
    , VOID_ACTION: ActionType<void> = 'VOID_ACTION'

createReducer(
    defaultState,
    handler(NON_VOID_ACTION, (state, _payload) => state),
    handler(VOID_ACTION, state => state)
)

// #25814

type R = {
  a: (x: number) => void;
  b: (x: string) => void;
};

type O = {
  on<P extends keyof R>(x: P, callback: R[P]): void;
};

declare var x: O;
x.on('a', a => {});

// #29775

namespace N1 {

declare class Component<P> { 
  constructor(props: P);
}
    
interface ComponentClass<P = {}> {
  new (props: P): Component<P>;
}

type CreateElementChildren<P> =
  P extends { children?: infer C }
  ? C extends any[]
    ? C
    : C[]
  : unknown;

declare function createElement<P extends {}>(
  type: ComponentClass<P>,
  ...children: CreateElementChildren<P>
): any;

declare function createElement2<P extends {}>(
  type: ComponentClass<P>,
  child: CreateElementChildren<P>
): any;

class InferFunctionTypes extends Component<{children: (foo: number) => string}> {}

createElement(InferFunctionTypes, (foo) => "" + foo);

createElement2(InferFunctionTypes, [(foo) => "" + foo]);

}

// #30341

type InnerBox<T> = {
  value: T;
}

type OuterBox<T> = {
  inner: InnerBox<T>
};

type BoxConsumerFromOuterBox<T> =
  T extends OuterBox<infer U> ?
      (box: InnerBox<U>) => void :
      never;

declare function passContentsToFunc<T>(outerBox: T, consumer: BoxConsumerFromOuterBox<T>): void;

declare const outerBoxOfString: OuterBox<string>;

passContentsToFunc(outerBoxOfString, box => box.value);

// Repro from #32349

type DooDad = 'SOMETHING' | 'ELSE' ;

class Interesting {
	public compiles = () : Promise<DooDad> => {
		return Promise.resolve().then(() => {
			if (1 < 2) {
				return 'SOMETHING';
			}
			return 'ELSE';
		});
	};
	public doesnt = () : Promise<DooDad> => {
		return Promise.resolve().then(() => {
			return 'ELSE';
		});
	};
	public slightlyDifferentErrorMessage = () : Promise<DooDad> => {
		return Promise.resolve().then(() => {
			if (1 < 2) {
				return 'SOMETHING';
			}
			return 'SOMETHING';
		});
	};
}

// Repro from #32349

declare function invoke<T>(f: () => T): T;

let xx: 0 | 1 | 2 = invoke(() => 1);

// Repro from #32416

declare function assignPartial<T>(target: T, partial: Partial<T>): T;

let obj = {
  foo(bar: string) {}
}

assignPartial(obj, { foo(...args) {} });  // args has type [string]


//// [instantiateContextualTypes.js]
// #6611
function fn(values, value) {
}
fn(handlers, value => alert(value));
new GenericComponent({ initialValues: 12, nextValues: val => 12 });
useStringOrNumber("", foo => { });
const defaultState = {
    dummy: ''
};
const NON_VOID_ACTION = 'NON_VOID_ACTION', VOID_ACTION = 'VOID_ACTION';
createReducer(defaultState, handler(NON_VOID_ACTION, (state, _payload) => state), handler(VOID_ACTION, state => state));
x.on('a', a => { });
// #29775
var N1;
(function (N1) {
    class InferFunctionTypes extends Component {
    }
    createElement(InferFunctionTypes, (foo) => "" + foo);
    createElement2(InferFunctionTypes, [(foo) => "" + foo]);
})(N1 || (N1 = {}));
passContentsToFunc(outerBoxOfString, box => box.value);
class Interesting {
    constructor() {
        this.compiles = () => {
            return Promise.resolve().then(() => {
                if (1 < 2) {
                    return 'SOMETHING';
                }
                return 'ELSE';
            });
        };
        this.doesnt = () => {
            return Promise.resolve().then(() => {
                return 'ELSE';
            });
        };
        this.slightlyDifferentErrorMessage = () => {
            return Promise.resolve().then(() => {
                if (1 < 2) {
                    return 'SOMETHING';
                }
                return 'SOMETHING';
            });
        };
    }
}
let xx = invoke(() => 1);
let obj = {
    foo(bar) { }
};
assignPartial(obj, { foo(...args) { } }); // args has type [string]
export {};
