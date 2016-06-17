// @allowJs: true
// @filename: this-and-objectlit.js
// @out: dummy161.js
/** @constructor */
function Page(title) {
    this.parts = {
        title: title,
        body: {
            /** document me */
            heading: '',
            main: ''
        }
    };
}
