const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, 'node_modules/semantic-release-gitmoji/lib/assets/templates');

const template = fs.readFileSync(path.join(TEMPLATE_DIR, 'default-template.hbs'), 'utf8');
const commitTemplate = fs.readFileSync(path.join(TEMPLATE_DIR, 'commit-template.hbs'), 'utf8');

module.exports = {
  branches: ['main'],
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:'],
          patch: [':bug:', ':ambulance:', ':lock:']
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          issueResolution: {
            template: '{baseUrl}/{owner}/{repo}/issues/{ref}',
            baseUrl: 'https://github.com',
            source: 'github.com'
          }
        }
      }
    ],
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
};
