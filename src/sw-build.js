// const workboxBuild = require('workbox-build');
const { generateSW } = require('workbox-build');

// --- Out of the box configuration with this approach

// NOTE: This should be run *AFTER* all your assets are built
/* const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw-template.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{js,css,html,png,jpg,svg}',
    ],
  }).then(({ count, size, warnings }) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
};

buildSW(); */

// --- Workbox create a configuration for you with this approach

const swDest = 'build/sw.js';
generateSW({
  swDest,
  globDirectory: 'build',
  globPatterns: [
    '**\/*.{js,css,html,png,jpg,svg}',
  ],
  // This property allows to add a path of the SPA to be ignored and treat it outside SPA
  navigateFallbackBlacklist: [new RegExp('/about/blacklist/')],
}).then(({ count, size }) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
