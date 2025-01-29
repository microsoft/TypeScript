// @declaration: true
export function f1() {
    const localClassFieldName = Math.random() > 0.5 ? "g1" : "g2";
    const localOtherField = localClassFieldName === "g1" ? "g2" : "g1";
    const localStaticField = Math.random() > 0.5 ? "s1" : "s2";
    return class ParameterizedHolder {
        [localClassFieldName]() {
            return "value";
        }
        [localOtherField]() {
            return 42;
        }
        static [localStaticField]() {
            return { static: true };
        }
        static [localStaticField]() {
            return { static: "sometimes" };
        }
    }
}