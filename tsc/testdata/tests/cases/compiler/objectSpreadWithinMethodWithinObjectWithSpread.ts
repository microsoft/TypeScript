// @target: es2015
const obj = {};
const a = {
    ...obj,
    prop() {
        return {
            ...obj,
            metadata: 213
        };
    }
};
