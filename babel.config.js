module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@handler': './src/delivery/api/handler',
          '@driver': './src/driver',
          '@app': './src/app',
          '@api': './src/delivery/api',
          '@domain': './src/domain',
          '@repository': './src/repository',
          '@usecase': './src/usecase',
          '@interfaces': './src/interfaces'
        }
      }
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
  ],
  ignore: ['**/*.spec.ts']
}
