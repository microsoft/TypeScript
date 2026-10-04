//// [tests/cases/compiler/jsDeclarationEmitThisAssignmentWithBaseProperty.ts] ////

//// [component.d.ts]
export class Component {
    state: any;
    constructor(props?: any);
}

export class WithAccessor {
    get value(): number;
    set value(v: number);
}

export class WithMethod {
    method(): void;
}

//// [main.js]
import { Component, WithAccessor, WithMethod } from "./component";

export class C1 extends Component {
    state = { count: 0 };
}

export class C2 extends Component {
    constructor() {
        super({});
        this.state = { count: 0 };
    }
}

export class C3 extends Component {
    update() {
        this.state = { count: 1 };
    }
}

export class C4 extends WithAccessor {
    constructor() {
        super();
        this.value = 1;
    }
}

/** @implements {WithAccessor} */
export class C5 {
    constructor() {
        this.value = 1;
    }
}

export class C6 extends WithMethod {
    constructor() {
        super();
        this.method = this.method.bind(this);
    }
}

//// [mainTs.ts]
import { Component } from "./component";

export class C1 extends Component {
    state = { count: 0 };
}

export class C2 extends Component {
    constructor() {
        super({});
        this.state = { count: 0 };
    }
}




//// [main.d.ts]
import { Component, WithAccessor, WithMethod } from "./component";
export declare class C1 extends Component {
    state: {
        count: number;
    };
}
export declare class C2 extends Component {
    state: {
        count: number;
    };
    constructor();
}
export declare class C3 extends Component {
    update(): void;
}
export declare class C4 extends WithAccessor {
    constructor();
}
/** @implements {WithAccessor} */
export declare class C5 implements WithAccessor {
    value: number;
    constructor();
}
export declare class C6 extends WithMethod {
    constructor();
}
//// [mainTs.d.ts]
import { Component } from "./component";
export declare class C1 extends Component {
    state: {
        count: number;
    };
}
export declare class C2 extends Component {
    constructor();
}
