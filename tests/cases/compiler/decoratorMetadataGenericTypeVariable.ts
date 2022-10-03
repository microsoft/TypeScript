// @experimentalDecorators: true
// @emitDecoratorMetadata: true

export class C<TypeVariable> {
  @Decorate
  member: TypeVariable;
}
