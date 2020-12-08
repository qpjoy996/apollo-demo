const path = require("path");
const { paths } = require("react-app-rewired");
const rewirePostcss = require("react-app-rewire-postcss");

const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackAlias,
  // adjustWorkbox,
  addLessLoader,
} = require("customize-cra");

const config = require(`${paths.scriptVersion}/config/webpack.config.js`)(
  process.env.NODE_ENV
);

const { GenerateSW } = require("workbox-webpack-plugin");

//生产环境去除console.* functions
const overrideConsole = () => {
  return (config) => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === "TerserPlugin") {
          // minimizer.options.terserOptions.compress.drop_console = true;
          minimizer.options.terserOptions.keep_fnames = true;
          minimizer.options.terserOptions.keep_classnames = true;
        }
      });
    }
    return config;
  };
};

// const overrideWorkbox = () => {
//   return (config) => {
//     config = removePreWorkboxWebpackPluginConfig(config);
//     const publicUrl = process.env.PUBLIC_URL;
//     console.log(`[Workbox] ${publicUrl}`);
//     let workboxPlugin = new GenerateSW({
//       clientsClaim: true,
//       exclude: [/\.map$/, /asset-manifest\.json$/],
//       importWorkboxFrom: 'cdn',
//       navigateFallback: `${publicUrl}/index.html`,
//       navigateFallbackBlacklist: [
//         new RegExp('^/_'),
//         new RegExp('/[^/?]+\\.[^/]+$'),
//       ],
//     });
//     config.plugins = [...config.plugins, workboxPlugin];
//     return config;
//   };
// };

module.exports = override(
  // 关于webpack的相关配置
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#ff8e2e" },
    },
  }),
  // 增加装饰器语法ts
  addDecoratorsLegacy(),
  // 添加别名
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),
  (config, env) => {
    const loaders = config.module.rules.find((rule) =>
      Array.isArray(rule.oneOf)
    ).oneOf;

    loaders[5].use.push({
      loader: "sass-resources-loader",
      options: {
        resources: path.resolve(__dirname, "./src/global.scss"), //全局引入公共的scss 文件
      },
    });

    // 重写css模块，增加css前缀补全，px转rem
    rewirePostcss(config, {
      plugins: () => [
        // require('postcss-flexbugs-fixes'),
        require("postcss-preset-env")({
          autoprefixer: {
            // browsers: [
            //   '>1%',
            //   'last 4 versions',
            //   'Firefox ESR',
            //   'not ie < 9', // React doesn't support IE8 anyway
            // ],
            flexbox: "no-2009",
          },
          stage: 3,
        }),
        require("postcss-pxtorem")({
          rootValue: 100,
          propList: ["*"],
          minPixelValue: 2,
          selectorBlackList: ["am-"],
        }),
      ],
    });
    return config;
  },
  overrideConsole()
  // overrideWorkbox(),
);

function removePreWorkboxWebpackPluginConfig(config) {
  const preWorkboxPluginIndex = config.plugins.findIndex((element) => {
    return Object.getPrototypeOf(element).constructor.name === "GenerateSW";
  });

  if (preWorkboxPluginIndex !== -1) {
    config.plugins.splice(preWorkboxPluginIndex, 1);
  }

  return config;
}
