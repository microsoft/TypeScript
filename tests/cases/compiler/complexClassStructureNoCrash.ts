// @target: esnext
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