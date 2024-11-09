importScripts("./uv/uv.bundle.js");
importScripts("./uv/uv.config.js");
importScripts("./uv/uv.sw.js");

const sw = new UVServiceWorker();

self.addEventListener("fetch", (event) => {
    event.respondWith(handleFetch(event));
});

async function handleFetch(event) {
    return await sw.fetch(event);
}
