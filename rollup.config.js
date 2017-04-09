import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"

export default {
    entry: "src/index.js",
    format: "iife",
    dest: "dist/index.js",
    plugins: [
        babel({
        }),
        resolve({
            jsnext: true,
            customResolveOptions: {
                paths: [ __dirname ],
            },
        }),
    ],
    intro: "var __DEV__ = true;",
}
