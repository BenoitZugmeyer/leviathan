const path = require("path")
const { DefinePlugin } = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const rollupBabel = require("rollup-plugin-babel")
const rollupResolve = require("rollup-plugin-node-resolve")
const BabiliPlugin = require("babili-webpack-plugin")

const DEVELOPMENT = process.env.NODE_ENV === "development"

function localPath(p) {
    return path.resolve(__dirname, p)
}

const config = {
    context: localPath("src"),
    entry: "./index.js",
    output: {
        path: localPath("dist"),
        filename: "index.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: localPath("assets/index.ejs"),
        }),
        new DefinePlugin({
            __DEV__: JSON.stringify(DEVELOPMENT),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loader: "rollup-loader",
                options: {
                    external: false,
                    plugins: [
                        rollupBabel(),
                        rollupResolve({
                            jsnext: true,
                            customResolveOptions: {
                                paths: [ localPath(".") ],
                            },
                        }),
                    ],
                },
            },
        ],
    },
}

if (!DEVELOPMENT) {
    config.plugins.push(
        new BabiliPlugin()
    )
}

module.exports = config
