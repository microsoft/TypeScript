// @strict: true
// @noEmit: true

// Repros from #53998

type ApiPost =
    | {
        path: "/login";
        body: {};
    }
    | {
        path: "/user";
        body: { name: string; };
    }

type PostPath = ApiPost["path"];

type PostBody<PATH extends PostPath> = Extract<ApiPost, { path: PATH }>["body"];

const post = <PATH extends PostPath>(
    path: PATH,
    {body, ...options}: Omit<RequestInit, 'body'> & {body: PostBody<PATH>}
) => {
}

const tmp = <PATH extends PostPath>(
  path: PATH,
  body: PostBody<PATH>
) => {
  post<PATH>(path, { body })
}

function fx1<P extends PostPath>(x: { body: PostBody<P> }, y: { body: PostBody<P> }) {
    x = y;
}
