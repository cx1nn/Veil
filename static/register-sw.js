"use strict";
/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
  if (!navigator.serviceWorker)
    throw new Error("Your browser is not supported. NGL, Thats a skill issue");

  await navigator.serviceWorker.register("./sw.js", {
    scope: __uv$config.prefix,
  });
}