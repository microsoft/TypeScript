// @strict: true

// Basic case: narrowing non-union types to never
function testBasicNarrowing(obj: { name: "bob" }) {
  if (obj.name === "bob") {
    // obj.name is "bob"
  } else {
    // obj should be narrowed to never since { name: "bob" } with name !== "bob" is impossible
    const n: never = obj;
  }
}

// Single enum member case
enum SingleAction { 
  INCREMENT = 'INCREMENT'
}

interface IIncrement {
  payload: {};
  type: SingleAction.INCREMENT;
}

function testSingleEnumSwitch(action: IIncrement) {
  switch (action.type) {
    case SingleAction.INCREMENT:
      return 1;
  }
  
  // action should be narrowed to never since all cases are handled
  const n: never = action;
}

// Single literal type case (should already work)
function testSingleLiteral(x: "a") {
  if (x === "a") {
    // x is "a"
  } else {
    // x should be never
    const n: never = x;
  }
}

// Single enum value case
enum Single { A = "a" }

function testSingleEnum(x: Single) {
  if (x === Single.A) {
    // x is Single.A
  } else {
    // x should be never
    const n: never = x;
  }
}

// More complex object with multiple literal properties
function testComplexObject(obj: { type: "user", status: "active" }) {
  if (obj.type === "user") {
    if (obj.status === "active") {
      // Both properties match
    } else {
      // obj.status !== "active" but obj: { type: "user", status: "active" } - impossible
      const n: never = obj;
    }
  } else {
    // obj.type !== "user" but obj: { type: "user", status: "active" } - impossible  
    const n: never = obj;
  }
}

// Switch statement with single case (original issue)
enum ActionTypes {
  INCREMENT = 'INCREMENT',
}

interface IAction {
  type: ActionTypes.INCREMENT;
}

function testOriginalIssue(action: IAction) {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return 1;
  }
  
  // This was the original issue - action should be never but wasn't
  const n: never = action;
}