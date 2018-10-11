/**
 * The file enables to import all modules in a one-shot manner.
 * There should not be a reason to edit this file.
 */

const files = require.context('.', true, /\/index\.js$/);
const modules = {};

files.keys().forEach((key) => {
  if (key === './index.js') return;
  modules[key.replace(/\.\/([a-z]+)\/index\.js/g, '$1')] = files(key).default;
});

export default modules;
