var webpack = require("webpack");
var htmlInjector = require(__dirname + "/webpack/htmlInjector.js").default;


var isProductionBuild = process.env.NODE_ENV === "production";

var config = {
    context: __dirname + "/src",
    entry: {
        devtools: "devtools.js",
        main: "main.js"
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].js"
    },
    resolve: {
        modules: ["node_modules", __dirname + "/src/app", __dirname + "/src" ],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
//                  presets: [ "es2015", "stage-0", "react" ],
                    plugins: [ "monadic.js/dist/plugin.js" ],
                    parserOpts: {
                        parser: "monadic.js/dist/parser.js"
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"' + process.env.NODE_ENV + '"' // eslint-disable-line
            }
        }),
        new htmlInjector({
            include: ["devtools"],
            extra: {},
            template: __dirname + "/src/devtools.ejs",
            filename: "devtools.html"
        }),

        new htmlInjector({
            include: ["main"],
            extra: {},
            template: __dirname + "/src/main.ejs",
            filename: "main.html"
        }),

    ]
};

if (isProductionBuild) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                passes: 2,
            }
        })
    );
} else { /* config.devtool = "#source-map"; */ }

module.exports = config;
