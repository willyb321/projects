require('./check-versions')();

const config = require('../config');
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');

// Default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// Automatically open browser, if not set will be false
const autoOpenBrowser = Boolean(config.dev.autoOpenBrowser);
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {}
});
// Force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
	compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
		hotMiddleware.publish({action: 'reload'});
		cb();
	});
});

// Proxy api requests
Object.keys(proxyTable).forEach(context => {
	let options = proxyTable[context];
	if (typeof options === 'string') {
		options = {target: options};
	}
	app.use(proxyMiddleware(options.filter || context, options));
});

// Handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// Serve webpack bundle output
app.use(devMiddleware);

// Enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// Serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

let _resolve;
const readyPromise = new Promise(resolve => {
	_resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
	console.log('> Listening at ' + uri + '\n');
  // When env is testing, don't need open it
	if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
		opn(uri);
	}
	_resolve();
});

const server = app.listen(port);

module.exports = {
	ready: readyPromise,
	close: () => {
		server.close();
	}
};
