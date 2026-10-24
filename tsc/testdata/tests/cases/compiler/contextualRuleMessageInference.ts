// @strict: true
// @noEmit: true

type DeferredInference<T> = [T][T extends unknown ? 0 : never];

declare function runRule<Message extends string>(
    rule: Message,
    tests: { invalid: readonly { errors: readonly { messageId: DeferredInference<Message> }[] }[] },
): void;

runRule("forbiddenAct", {
    invalid: ["act()"].map(() => ({
        errors: [{ messageId: "forbiddenAct" }],
    })),
});
