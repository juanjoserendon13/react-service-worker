if (typeof importScripts === "function") {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
      // This property allows to add a path of the SPA to be ignored and treat it outside SPA
      // blacklist: [new RegExp('/portfolio/trends/')],
    });

    // You can define the cache strategies for specific assets and use a bunch of plugins
    // according with the workbox documentation
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      workbox.strategies.cacheFirst()
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
