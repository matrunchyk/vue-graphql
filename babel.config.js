const envPreset = ['@babel/env', {
  'targets': { node: 'current' }
}];

if (process.env.NODE_ENV === 'test') {
  // noinspection JSCheckFunctionSignatures
  envPreset.push({ 'exclude': ['transform-regenerator'] });
}

module.exports = {
  presets: [
    envPreset,
  ],
  plugins: [
    'babel-plugin-add-module-exports',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread'
  ]
};

