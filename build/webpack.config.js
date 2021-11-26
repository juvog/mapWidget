const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const SRC_DIR = path.join(__dirname, "../src")
const JMAP_CORE_PATH = path.join(__dirname, "../node_modules/jmap-core")
const JMAP_APP_PATH = path.join(__dirname, "../node_modules/jmap-app")
const RESOURCE_PATH = path.join(__dirname, "../src/resources")
const NODE_MODULES_PATH = path.join(__dirname, "../node_modules")
const packageJSON = JSON.parse(fs.readFileSync("../package.json"))

const loader_ts = {
  loader: "ts-loader",
  options: {
    configFile: path.join(path.resolve("."), "tsconfig.json")
  }
}

const babel_loader = {
  loader: "babel-loader",
  options: {
    presets: ["es2015", "react"],
    plugins: ["es6-promise", "transform-runtime", "transform-object-assign", "dynamic-import-webpack"]
  }
}

module.exports = {
  entry: {
    index: path.join(SRC_DIR, "/extension.ts")
  },
  output: {
    path: process.env.BUILD_DIR,
    filename: "[name].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: process.env.WEBPACK_PUBLIC_PATH
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        enforce: "pre",
        use: [babel_loader, loader_ts],
        include: [SRC_DIR, JMAP_CORE_PATH, JMAP_APP_PATH]
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
        use: "file-loader"
      },
      {
        test: /\.css|scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: loader => [
                require("postcss-parent-selector")({
                  selector: ".jmap_wrapper"
                })
              ]
            }
          }
        ],
        include: [
          SRC_DIR,
          RESOURCE_PATH,
          path.join(__dirname, "../node_modules/mapbox-gl/dist/mapbox-gl.css"),
          path.join(__dirname, "../node_modules/react-datepicker/dist/react-datepicker.css"),
          path.join(__dirname, "../node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css")
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss", "jpeg"],
    modules: [
      //tell webpack where to search for import
      SRC_DIR, //allow importing file without starting by 'src/'
      NODE_MODULES_PATH
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DefinePlugin({
      /**
       * Webpack will change in the code all occurences of TYPESCRIPT_CORE_VERSION,
       * and replace it with the value, for example "2.3.2".
       * It's the same for TYPESCRIPT_APP_VERSION, or EXTENSION_VERSION.
       **/
      TYPESCRIPT_CORE_VERSION: JSON.stringify(packageJSON.devDependencies["jmap-core"]).replace("^", ""),
      TYPESCRIPT_APP_VERSION: JSON.stringify(packageJSON.devDependencies["jmap-app"]).replace("^", ""),
      EXTENSION_VERSION: JSON.stringify(packageJSON.version)
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr|es|en|pt/),
    new webpack.HotModuleReplacementPlugin()
  ]
}

if (process.env.NODE_ENV === "production") {
  // production environment
  console.log("Webpack running in production")
  module.exports.mode = "production"
  module.exports.devtool = "none"
  module.exports.resolve.alias = {
    axios: path.join(NODE_MODULES_PATH, "axios/dist/axios.min.js")
  }
  module.exports.optimization = {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          beautify: false,
          compress: {
            warnings: false
          },
          comments: false,
          mangle: false,
          toplevel: false,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  }
} else {
  // development environment
  console.log("Webpack running in development")
  module.exports.mode = "development"
  module.exports.devtool = "source-map"
  module.exports.resolve.alias = {
    axios: path.join(NODE_MODULES_PATH, "axios/dist/axios.js")
  }
}

if (process.env.WEBPACK_ANALYSE === "true" || process.env.WEBPACK_ANALYSE === true) {
  /**
   * Used to analyse the size/content of the bundles generated by webpack
   * After webpack build a browser tab will open automatically showing the result
   **/
  console.log("Bundle analyser will be performed, accessible on http://127.0.0.1:8888")
  module.exports.plugins = (module.exports.plugins || []).concat([new BundleAnalyzerPlugin()])
}