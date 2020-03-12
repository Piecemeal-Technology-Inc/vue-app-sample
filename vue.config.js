
let outputDir = (process.env.VUE_APP_OUTPUT_DIR) ? process.env.VUE_APP_OUTPUT_DIR : 'dist';
let publicPath = (process.env.VUE_APP_PUBLIC_PATH) ? process.env.VUE_APP_PUBLIC_PATH : '/';
let excludeFiles = (process.env.VUE_APP_EXCLUDE_FILES) ? process.env.VUE_APP_EXCLUDE_FILES.split(',') : [];
let plugins = [];

if (excludeFiles.length > 0) {
    const RemovePlugin = require('remove-files-webpack-plugin');
    plugins.push(
        new RemovePlugin({
            after: {
                root: outputDir,
                include: excludeFiles
            }
        })
    );
}

let onProxyReq = function (proxyReq, req, res) {
    proxyReq.setHeader('X-Vue-App-Sample-Id','id0001');
    proxyReq.setHeader('X-Vue-App-Sample-Locale', 'ja');
}

module.exports = {
    publicPath,
    outputDir,
    configureWebpack: {
        plugins,
        output: {
            filename: 'js/app.js',
            chunkFilename: 'js/chunk-vendors.js'
        }
    },
    css: {
        extract: {
            filename: 'css/app.css',
            chunkFilename: 'css/chunk-vendors.css'
        },
    },
    devServer: {
        host: "localhost",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        proxy: {
            '/api/': {
                target: "http://localhost:8081",
                onProxyReq
            }
        }
    }
}
