// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // urlBackend: 'http://18.189.168.143:3000/',
 urlBackend:'http://localhost:3000/',
  aws: {
    accessKeyId: 'AKIATHGZBEJMMY44HIP2',
    secretAccessKey: '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',
    region: 'us-east-2',
    bucket: 'awsunibe'
  },
};
