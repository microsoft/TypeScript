// External library
type Req<B> = {
    body: B
}

type ReqHandler<B> = (req: Req<B>) => any

declare function use<B = string>(handler: ReqHandler<B>): any


// My code
type Handler<Q> = (req: Q) => any

declare function createHandler<Q>(): Handler<Q>

// Error: Argument of type 'Handler<Req<never>>' is not assignable to parameter of type 'ReqHandler<string>'.
// However, intellisense says createHandler() returns Handler<Req<string>>
use(createHandler())
