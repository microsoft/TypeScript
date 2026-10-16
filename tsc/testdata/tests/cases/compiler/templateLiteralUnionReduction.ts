// @strict: true
// @noEmit: true
// @target: esnext
// https://github.com/microsoft/TypeScript/issues/63342

// Route patterns with overlapping static prefixes, modeled after the dynamic routes in
// the linked issue. Several patterns share both their prefix and their number of
// segments, so only the final static text distinguishes them. The union is large enough
// (32 string literals x 16 templates) to exercise the trie-based filtering in union
// reduction, including a string mapping constituent that is checked separately. The
// error message prints the reduced union: literals matched by a template or by the
// string mapping no longer appear.
declare let route:
    | `/app/${string}/billing`
    | `/app/${string}/settings`
    | `/app/${string}/integrations/${string}/billing`
    | `/app/${string}/resources/${string}/billing`
    | `/admin/${string}/billing`
    | `/admin/${string}/settings`
    | `/admin/${string}/users/${string}`
    | `/app/${string}`
    | `/app/${string}/billing/v2`
    | `/app/${string}/settings/v2`
    | `/admin/${string}/billing/v2`
    | `/admin/${string}/settings/v2`
    | `/org/${string}/billing`
    | `/org/${string}/settings`
    | `/org/${string}/members/${string}`
    | `/org/${string}`
    | Uppercase<`up${string}`>
    // matched by one of the templates above
    | "/app/acme/billing"
    | "/app/acme/settings"
    | "/app/acme/integrations/vercel/billing"
    | "/app/acme/resources/aws/billing"
    | "/admin/acme/billing"
    | "/admin/acme/settings"
    | "/admin/acme/users/bob"
    | "/app/anything"
    | "/app/acme/billing/v2"
    | "/app/acme/settings/v2"
    | "/admin/acme/billing/v2"
    | "/admin/acme/settings/v2"
    | "/org/acme/billing"
    | "/org/acme/settings"
    | "/org/acme/members/bob"
    | "/org/acme"
    // matched by the string mapping
    | "UPGRADE"
    // matched by nothing
    | "/api/ai-playground/sandbox"
    | "/api/users"
    | "/about"
    | "/pricing"
    | "/admin/acme/invoices"
    | "/admin/acme/settings/v3"
    | "/admin/settings"
    | "/app"
    | "app/acme/billing"
    | "/APP/ACME/BILLING"
    | "/help"
    | "/blog/post"
    | "/login"
    | "/logout"
    | "/signup"
    | "/status";

route = "/definitely/not/a/route";

// Small unions take the linear path; semantics are identical.
declare let small:
    | "up1"
    | "other"
    | `up${string}`
    | Uppercase<`up${string}`>;

small = "not-a-member";

// "aaa" does not match `aa${string}aa`: the static prefix and suffix would have to
// overlap.
declare let overlap: "aaa" | "aaaa" | `aa${string}aa`;

overlap = "aa";
