const path = require('path');

module.exports = {
    mode: 'production',
    entry: 'test.ts',
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: "test-ndn-js.bundle.js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
    },
    target: "node",
};