//// [complexClassStructureNoCrash.ts]
const { assign } = Object

export type Name = string
export type List<T> = ReadonlyArray<T>
export type Payload<T> = Record<string, unknown>

export type Stage = Raw | Filled | Linked
export abstract class Raw { protected readonly rawTag = 'Raw' }
export abstract class Filled extends Raw { protected readonly filledTag = 'Filled' }
export abstract class Linked extends Filled { protected readonly linkedTag = 'Linked' }
export type Final = Linked

type Stageable<S extends Stage, C extends Stage, T> = S extends C ? T : T | undefined
export type Fillable<S extends Stage, T> = Stageable<S, Filled, T>
export type Linkable<S extends Stage, T> = Stageable<S, Linked, T>

export type Kind = Node['kind']
export type Category = 'Entity' | 'Module' | 'Sentence' | 'Expression'
export type NodeOfKind<K extends Kind, S extends Stage> = Extract<Node<S>, { kind: K }>
export type NodeOfKindOrCategory<Q extends Kind | Category, S extends Stage> =
  Q extends Kind ? NodeOfKind<Q, S> :
  never

export type Node<S extends Stage = Final>
  = Parameter<S>
  | NamedArgument<S>
  | Import<S>
  | Body<S>
  | Catch<S>
  | Entity<S>
  | DescribeMember<S>
  | ClassMember<S>
  | Sentence<S>

abstract class $Node<S extends Stage> {
  readonly stage?: S
  abstract readonly kind: Kind

  constructor(payload: Record<string, unknown>) {
    assign(this, payload)
  }
 
  is<Q extends Kind | Category>(kindOrCategory: Q): this is NodeOfKindOrCategory<Q, S> {
    return this.kind === kindOrCategory
  }
}

export class Parameter<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Parameter'
}

export class NamedArgument<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'NamedArgument'
  readonly value!: Expression<S>
}

export class Import<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Import'
  readonly entity!: Reference<S>
}

export class Body<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Body'
  readonly sentences!: List<Sentence<S>>
}

export type Entity<S extends Stage = Final>
  = Package<S>
  | Program<S>
  | Test<S>
  | Describe<S>
  | Module<S>
  | Variable<S>


export class Package<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Package'
  readonly imports!: List<Import<S>>
  readonly members!: List<Entity<S>>
}

export class Program<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Program'
  readonly body!: Body<S>
}

export class Test<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Test'
  readonly body!: Body<S>
}

export class Describe<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Describe'
  readonly members!: List<DescribeMember<S>>

  tests(): List<Test<S>> { return this.members.filter((member): member is Test<S> => member.is('Test')) }
  methods(): List<Method<S>> { return this.members.filter((member): member is Method<S> => member.is('Method')) }
  variables(): List<Variable<S>> { return this.members.filter((member): member is Variable<S> => member.is('Variable')) }
  fixtures(): List<Fixture<S>> { return this.members.filter((member): member is Fixture<S> => member.is('Fixture')) }
}

export class Variable<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Variable'
  readonly value!: Fillable<S, Expression<S>>

  is<Q extends Kind | Category>(kindOrCategory: Q): this is NodeOfKindOrCategory<Q, S> {
    return [this.kind, 'Sentence', 'Entity'].includes(kindOrCategory)
  }
}

export type Module<S extends Stage = Final> = Class<S> | Singleton<S> | Mixin<S>

export class Class<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Class'
  readonly mixins!: List<Reference<S>>
  readonly members!: List<ClassMember<S>>
  readonly superclass!: Fillable<S, Reference<S> | null>
}

export class Singleton<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Singleton'
  readonly mixins!: List<Reference<S>>
  readonly members!: List<ObjectMember<S>>
  readonly superCall!: Fillable<S, {
    superclass: Reference<S>,
    args: List<Expression<S>> | List<NamedArgument<S>>
  }>
}

export class Mixin<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Mixin'
  readonly mixins!: List<Reference<S>>
  readonly members!: List<ObjectMember<S>>
}

export type ObjectMember<S extends Stage = Final> = Field<S> | Method<S>
export type ClassMember<S extends Stage = Final> = Constructor<S> | ObjectMember<S>
export type DescribeMember<S extends Stage = Final> = Variable<S> | Fixture<S> | Test<S> | Method<S>

export class Field<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Field'
  readonly value!: Fillable<S, Expression<S>>
}

export class Method<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Method'
  readonly parameters!: List<Parameter<S>>
  readonly body?: Body<S>
}

export class Constructor<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Constructor'
  readonly parameters!: List<Parameter<S>>
  readonly body!: Body<S>
  readonly baseCall?: { callsSuper: boolean, args: List<Expression<S>> }
}

export class Fixture<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Fixture'
  readonly body!: Body<S>
}

export type Sentence<S extends Stage = Final> = Variable<S> | Return<S> | Assignment<S> | Expression<S>

export class Return<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Return'
  readonly value?: Expression<S>
}

export class Assignment<S extends Stage = Final> extends $Node<S> {
  readonly kind = 'Assignment'
  readonly variable!: Reference<S>
  readonly value!: Expression<S>
}

export type Expression<S extends Stage = Final>
  = Reference<S>
  | Self<S>
  | Send<S>
  | Super<S>
  | New<S>
  | If<S>
  | Throw<S>
  | Try<S>

abstract class $Expression<S extends Stage> extends $Node<S> {
  is<Q extends Kind | Category>(kindOrCategory: Q): this is NodeOfKindOrCategory<Q, S> {
    return kindOrCategory === 'Expression' || super.is(kindOrCategory)
  }
}

export class Reference<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'Reference'
  readonly name!: Name
}

export class Self<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'Self'
}

export class Send<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'Send'
  readonly receiver!: Expression<S>
  readonly message!: Name
  readonly args!: List<Expression<S>>
}

export class Super<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'Super'
  readonly args!: List<Expression<S>>
}

export class New<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'New'
  readonly instantiated!: Reference<S>
  readonly args!: List<Expression<S>> | List<NamedArgument<S>>
}

export class If<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'If'
  readonly thenBody!: Body<S>
  readonly elseBody!: Fillable<S, Body<S>>
}

export class Throw<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'Throw'
}

export class Try<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'Try'
}

export class Catch<S extends Stage = Final> extends $Expression<S> {
  readonly kind = 'Catch'
}

//// [complexClassStructureNoCrash.js]
const { assign } = Object;
export class Raw {
    constructor() {
        this.rawTag = 'Raw';
    }
}
export class Filled extends Raw {
    constructor() {
        super(...arguments);
        this.filledTag = 'Filled';
    }
}
export class Linked extends Filled {
    constructor() {
        super(...arguments);
        this.linkedTag = 'Linked';
    }
}
class $Node {
    constructor(payload) {
        assign(this, payload);
    }
    is(kindOrCategory) {
        return this.kind === kindOrCategory;
    }
}
export class Parameter extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Parameter';
    }
}
export class NamedArgument extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'NamedArgument';
    }
}
export class Import extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Import';
    }
}
export class Body extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Body';
    }
}
export class Package extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Package';
    }
}
export class Program extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Program';
    }
}
export class Test extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Test';
    }
}
export class Describe extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Describe';
    }
    tests() { return this.members.filter((member) => member.is('Test')); }
    methods() { return this.members.filter((member) => member.is('Method')); }
    variables() { return this.members.filter((member) => member.is('Variable')); }
    fixtures() { return this.members.filter((member) => member.is('Fixture')); }
}
export class Variable extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Variable';
    }
    is(kindOrCategory) {
        return [this.kind, 'Sentence', 'Entity'].includes(kindOrCategory);
    }
}
export class Class extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Class';
    }
}
export class Singleton extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Singleton';
    }
}
export class Mixin extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Mixin';
    }
}
export class Field extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Field';
    }
}
export class Method extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Method';
    }
}
export class Constructor extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Constructor';
    }
}
export class Fixture extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Fixture';
    }
}
export class Return extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Return';
    }
}
export class Assignment extends $Node {
    constructor() {
        super(...arguments);
        this.kind = 'Assignment';
    }
}
class $Expression extends $Node {
    is(kindOrCategory) {
        return kindOrCategory === 'Expression' || super.is(kindOrCategory);
    }
}
export class Reference extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'Reference';
    }
}
export class Self extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'Self';
    }
}
export class Send extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'Send';
    }
}
export class Super extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'Super';
    }
}
export class New extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'New';
    }
}
export class If extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'If';
    }
}
export class Throw extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'Throw';
    }
}
export class Try extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'Try';
    }
}
export class Catch extends $Expression {
    constructor() {
        super(...arguments);
        this.kind = 'Catch';
    }
}
