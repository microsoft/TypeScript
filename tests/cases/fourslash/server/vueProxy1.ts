/// <reference path="../fourslash.ts"/>

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "allowNonTsExtensions": true,
////         "plugins": [
////             { "name": "mock-vue" }
////         ]
////     },
////     "files": ["a.vue"]
//// }

// Note: This test does *not* implement the correct vue transformation.
// So it's other.data.property, not other.property or other.$data.property
// @Filename: other.vue
////<template>
////</template>
////<script>
////export default {
////    data: { property: "Example" }
////}
////</script>
////<style>
////</style>


// @Filename: a.vue
////<template>
////</template>
////<script>
////import other from './other.vue'
//// other.data.property/**/
////export default {
////    data: { greeting: "Hello" }
////}
////</script>
////<style>
////</style>

// LS shouldn't crash/fail if a plugin fails to init correctly
goTo.marker();
verify.quickInfoIs('(property) property: string');
verify.numberOfErrorsInCurrentFile(0);
