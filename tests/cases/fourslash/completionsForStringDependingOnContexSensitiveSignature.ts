/// <reference path="fourslash.ts" />
// @strict: true
////
//// type ActorRef<TEvent extends { type: string }> = {
////   send: (ev: TEvent) => void
//// }
//// 
//// type Action<TContext> = {
////   (ctx: TContext): void
//// }
//// 
//// type Config<TContext> = {
////   entry: Action<TContext>
//// }
//// 
//// declare function createMachine<TContext>(config: Config<TContext>): void
//// 
//// type EventFrom<T> = T extends ActorRef<infer TEvent> ? TEvent : never
//// 
//// declare function sendTo<
////   TContext,
////   TActor extends ActorRef<any>
//// >(
////   actor: ((ctx: TContext) => TActor),
////   event: EventFrom<TActor>
//// ): Action<TContext>
//// 
//// createMachine<{
////   child: ActorRef<{ type: "EVENT" }>;
//// }>({
////   entry: sendTo((ctx) => ctx.child, { type: /*1*/ }),
//// });
////
//// createMachine<{
////   child: ActorRef<{ type: "EVENT" }>;
//// }>({
////   entry: sendTo((ctx) => ctx.child, { type: "/*2*/" }),
//// });

verify.completions({ marker: "1", includes: [`"EVENT"`] })
verify.completions({ marker: "2", exact: [`EVENT`] })