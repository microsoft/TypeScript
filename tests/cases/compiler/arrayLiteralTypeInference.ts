class Action {
    id: number;
}

class ActionA extends Action {
    value: string;
}

class ActionB extends Action {
    trueNess: boolean;
}

var x1: Action[] = [
    { id: 2, trueness: false },
    { id: 3, name: "three" }
]

var x2: Action[] = [
    new ActionA(),
    new ActionB()
]

var x3: Action[] = [
    new Action(),
    new ActionA(),
    new ActionB()
]

var z1: { id: number }[] =
    [
        { id: 2, trueness: false },
        { id: 3, name: "three" }
    ]

var z2: { id: number }[] =
    [
        new ActionA(),
        new ActionB()
    ]

var z3: { id: number }[] =
    [
        new Action(),
        new ActionA(),
        new ActionB()
    ]




