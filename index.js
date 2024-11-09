import express from 'express';
import { createBareServer } from '@tomphttp/bare-server-node';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync } from 'fs';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import path from 'path';
import chalk from 'chalk';
import os from 'os';

const getIPAddress = () => {
    const interfaces = os.networkInterfaces();
    for (let name in interfaces) {
        for (let net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) return net.address;
        }
    }
    return 'localhost';
};
// this is actually some of my cleanest code lmao
const startServerMessage = (addr) => {
    console.clear();
    console.log(chalk.red('-----------------------------'));
    console.log(chalk.green.bold('     Veil Guard      '));
    console.log(chalk.red('-----------------------------'));
    console.log(chalk.yellow(`Veil running at:`));
    console.log(chalk.magenta(`Local: localhost:` + addr.port));
    console.log(chalk.magenta(`Network: http://${getIPAddress()}:${addr.port}`));
    console.log(chalk.red('-----------------------------'));
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const bare = createBareServer("/bare/");

app.use(express.static(path.join(__dirname, 'static')));

const routeFiles = ['apps.html', 'tabs.html', 'go.html', 'index.html'];
const routes = routeFiles.map((file, index) => ({
    path: index === 0 ? '/~' : `/${index}`,
    file
}));

routes.forEach(route => {
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'static', route.file));
    });
});

let server;
if (existsSync(path.join(__dirname, 'key.pem')) && existsSync(path.join(__dirname, 'cert.pem'))) {
    const options = {
        key: readFileSync(path.join(__dirname, 'key.pem')),
        cert: readFileSync(path.join(__dirname, 'cert.pem')),
    };
    server = createHttpsServer(options, app);
} else {
    server = createHttpServer(app);
}

app.use((req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        res.status(404).send('Not Found');
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req, socket, head)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen(PORT, () => {
    const addr = server.address();
    startServerMessage(addr);
});
