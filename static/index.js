const form = document.getElementById('form');
const input = document.getElementById('input');
// stuff gets confusing with those words

if (form && input) {
    form.addEventListener('submit', handleSubmit);
}

//the now.html part doesnt need to be there because the css issue isnt a problem anymore...
async function handleSubmit(event) {
    event.preventDefault();
    const url = input.value.trim();
    const redirectPath = url.includes('now.gg') ? '/now.html' : '/go.html';
    navigateAndRedirect(url, redirectPath);
}

async function registerServiceWorker() {
    return window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix,
    });
}

async function navigateAndRedirect(value, path) {
    await registerServiceWorker();
    let url = value.trim();

    if (!isValidUrl(url)) {
        url = `https://www.google.com/search?q=${url}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }

    sessionStorage.setItem('GoUrl', __uv$config.encodeUrl(url));

    if (url.includes('now.gg')) {
        location.href = 'now.html';
    } else {
        location.href = path || `${__uv$config.prefix}${__uv$config.encodeUrl(url)}`;
    }
}

function isValidUrl(val = '') {
    return /^https?:\/\//.test(val) || (val.includes('.') && val.trim().length > 0);
}

function openURL(url) {
    registerServiceWorker().then(() => {
        if (!isValidUrl(url)) {
            url = getSearchEngineURL() + url;
        } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `http://${url}`;
        }
        navigateAndRedirect(url, '/go.html'); // considering changing it to /g or something like that
    });
}





