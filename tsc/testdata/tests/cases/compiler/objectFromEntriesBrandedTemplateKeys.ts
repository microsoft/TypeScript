// @target: es2019
// @strict: true

type FeatureId = string & { feature: true };
declare const featureIds: FeatureId[];
const options = Object.fromEntries(featureIds.map(id => [`feature:${id}`, true]));
declare const featureName: string;

options[`feature:${featureName}`];
featureIds.filter(id => options["feature:" + id]);
for (const [from, to] of Object.entries({ oldFeature: "newFeature" })) {
    if (typeof options[`feature:${from}`] === "boolean") {
        options[`feature:${to}`] = options[`feature:${from}`];
    }
}
