// @target: es2015
// @experimentalDecorators: true
// @emitDecoratorMetadata: true

export class C<TypeVariable = string> {
  @Decorate
  member: TypeVariable;
}
