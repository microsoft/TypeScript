// @strict: true
// @target: esnext
// @noEmit: true

interface Effect<out A> {
  readonly _A: A;
}

declare function gen<Eff extends Effect<any>, AEff>(
  f: () => Generator<Eff, AEff>
): Effect<AEff>;

interface Rpc<
  in out Tag extends string,
  out Payload = unknown,
  out Success = unknown
> {
  readonly _tag: Tag;
  readonly payloadSchema: Payload;
  readonly successSchema: Success;
}

interface RpcAny {
  readonly _tag: string;
}

type Payload<R> = R extends Rpc<infer _Tag, infer _Payload, infer _Success>
  ? _Payload
  : never;

type ResultFrom<R extends RpcAny> = R extends Rpc<
  infer _Tag,
  infer _Payload,
  infer _Success
>
  ? _Success
  : never;

type ToHandlerFn<Current extends RpcAny> = (
  payload: Payload<Current>
) => ResultFrom<Current>;

type HandlersFrom<Rpc extends RpcAny> = {
  readonly [Current in Rpc as Current["_tag"]]: ToHandlerFn<Current>;
};

interface RpcGroup<in out R extends RpcAny> {
  toLayer<Handlers extends HandlersFrom<R>>(build: Effect<Handlers>): unknown;
}

declare const Rpcs: RpcGroup<Rpc<"Register", number, string>>;

export const layerServerHandlers = Rpcs.toLayer(
  gen(function* () {
    return {
      Register: (id) => String(id),
    };
  })
);
