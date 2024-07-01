// @strict: true
// @noEmit: true

type QQ<T extends string[]> =
    & ("a" | T[0])
    & ("b" | T[1])
    & ("c" | T[2])
    & ("d" | T[3])
    & ("e" | T[4])
    & ("f" | T[5])
    & ("g" | T[6])
    & ("h" | T[7])
    & ("i" | T[8])
    & ("j" | T[9])
    & ("k" | T[10])
    & ("l" | T[11])
    & ("m" | T[12])
    & ("n" | T[13])
    & ("q" | T[14])
    & ("p" | T[15])
    & ("q" | T[16])
    & ("r" | T[17])
    & ("s" | T[18])
    & ("t" | T[19]);

// Repro from #57863

export interface Update {
    update_id: number;

    message?: { message: string };
    edited_message?: { edited_message: string };
    channel_post?: { channel_post: string };
    edited_channel_post?: { edited_channel_post: string };
    message_reaction?: { message_reaction: string };
    message_reaction_count?: { message_reaction_count: string };
    inline_query?: { inline_query: string };
    chosen_inline_result?: { chosen_inline_result: string };
    callback_query?: { callback_query: string };
    shipping_query?: { shipping_query: string };
    pre_checkout_query?: { pre_checkout_query: string };
    poll?: { poll: string };
    poll_answer?: { poll_answer: string };
    my_chat_member?: { my_chat_member: string };
    chat_member?: { chat_member: string };
    chat_join_request?: { chat_join_request: string };
    chat_boost?: { chat_boost: string };
    removed_chat_boost?: { removed_chat_boost: string };
}

type FilterFunction<U extends Update, V extends U> = (up: U) => up is V;

export function matchFilter<U extends Update, Q extends FilterQuery>(
    filter: Q | Q[],
): FilterFunction<U, Filter<U, Q>> {
  // ^ errors out
    console.log("Matching", filter);
    return (up: U): up is Filter<U, Q> => !!up;
}

/** All valid filter queries (every update key except update_id) */
export type FilterQuery = keyof Omit<Update, "update_id">;

/** Narrow down an update object based on a filter query */
export type Filter<U extends Update, Q extends FilterQuery> = PerformQuery<
    U,
    RunQuery<Q>
>;

// generate an object structure that can be intersected with updates to narrow them down
type RunQuery<Q extends string> = Combine<L1Fragment<Q>, Q>;

// maps each part of the filter query to Record<"key", object>
type L1Fragment<Q extends string> = Q extends unknown ? Record<Q, object>
    : never;
// define all other fields from query as keys with value `undefined`
type Combine<U, K extends string> = U extends unknown
    ? U & Partial<Record<Exclude<K, keyof U>, undefined>>
    : never;

// apply a query result by intersecting it with update,
// and then using these values to override the actual update
type PerformQuery<U extends Update, R extends object> = R extends unknown
    ? FilteredEvent<U, Update & R>
    : never;

// narrow down an update by intersecting it with a different update
type FilteredEvent<E extends Update, U extends Update> =
    & E
    & Omit<U, "update_id">;

type Middleware<U extends Update> = (ctx: U) => unknown | Promise<unknown>;
class EventHub<U extends Update> {
    use(...middleware: Array<Middleware<U>>): EventHub<U> {
        console.log("Adding", middleware.length, "generic handlers");
        return this;
    }
    on<Q extends FilterQuery>(
        filter: Q | Q[],
        ...middleware: Array<Middleware<Filter<U, Q>>>
                           // ^ errors out
    ): EventHub<Filter<U, Q>> {
        console.log("Adding", middleware.length, "handlers for", filter);
        return new EventHub<Filter<U, Q>>();
    }
}
