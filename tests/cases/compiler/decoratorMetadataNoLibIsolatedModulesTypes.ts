// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @noLib: true
// @isolatedModules: true

export class B {
    @Decorate
    member: Map<string, number>;
}
