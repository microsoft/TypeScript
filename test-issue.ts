// Test the issue: Exhaustiveness checking against an enum with 1 member

enum ActionTypes {
  INCREMENT = 'INCREMENT',
}

interface IIncrement {
  payload: {};
  type: ActionTypes.INCREMENT;
}

type AnyStringExcept<T extends string> = { [P in T]: never; };

type ValidAction = IIncrement;
type UnhandledAction = { type: AnyStringExcept<ActionTypes>; };
type PossibleAction = ValidAction | UnhandledAction;

function isUnhandled(x: PossibleAction): x is UnhandledAction {
    return !(x.type in ActionTypes);
}

type CounterState = number;
const initialState: CounterState = 0;

function receiveAction(state = initialState, action: PossibleAction) {
    if (isUnhandled(action)) {
        return state;
    }

    // typeof action === ValidAction
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return state + 1;
    }

    // This should not error - all cases are handled
    const n: never = action;
    return state;
}

// Simpler test case from RyanCavanaugh's comment
function fn(obj: { name: "bob" }) {
  if (obj.name == "bob") {
    // bob case
  } else {
    // Should not be an error
    const n: never = obj;
  }
}
