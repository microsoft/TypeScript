//// [tests/cases/compiler/selfReferentialDefaultNoStackOverflow.ts] ////

//// [QSpinner.js]
import DefaultSpinner from './QSpinner'

export default {
  mixins: [DefaultSpinner],
  name: 'QSpinner'
}


//// [QSpinner.js]
import DefaultSpinner from './QSpinner';
export default {
    mixins: [DefaultSpinner],
    name: 'QSpinner'
};
