// @experimentalDecorators: true
// @emitDecoratorMetadata: true

// Unused, but could collide with the named type argument below.
class TypeVariable {}

export class C<TypeVariable> {
  @Decorate
  member: TypeVariable;
}
