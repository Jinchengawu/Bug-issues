const path = require("path");
import { name as _name, app_name, version } from "../package.json";
const {
  TARO_ENV = "weapp",
  NODE_ENV = "development",
  APP_BASE_URL,
  APP_WEBSOCKET,
  APP_COMPANY_ID,
  APP_PLATFORM,
  APP_CUSTOM_SERVER,
  APP_HOME_PAGE,
  INTEGRATION_APP,
  APP_MAP_KEY,
  APP_MAP_NAME,
  APP_TRACK,
  APP_ID,
  APP_YOUSHU_TOKEN,
  APP_IMAGE_CDN
} = process.env;
// 是否为web
const isWeb = TARO_ENV === "h5";
// 是否为生产模式
const isPro = NODE_ENV === "production";
const APP_AUTH_PAGE = !isWeb
  ? "/subpage/pages/auth/wxauth"
  : "/subpage/pages/auth/login";
const config = {
  projectName: "miniapp-plugins",
  date: "2021-6-22",
  designWidth: 750,
  deviceRatio: {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "dist",
  alias: {
    "@": path.join(__dirname, "../src"),
    // "@p": path.join(__dirname, "../src/plugin")
  },
  plugins: [
    // path.join(__dirname, './modify-taro3.js'),
    // path.join(__dirname, './custom-plugin_test.ts')
  ],
  copy: {
    patterns: [],
    options: {}
  },
  sass: {
    resource: path.resolve(__dirname, "..", "src/style/imports.scss"),
    projectDirectory: path.resolve(__dirname, "..")
  },
  framework: "react",
  defineConstants: {
    APP_NAME: `'${app_name}'`,
    APP_VERSION: `'${version}'`,
    API_HOST: isWeb ? `'${APP_BASE_URL}'` : APP_BASE_URL,
    APP_BASE_URL: isWeb ? `'${APP_BASE_URL}'` : APP_BASE_URL,
    APP_WEBSOCKET_URL: isWeb ? `'${APP_WEBSOCKET}'` : APP_WEBSOCKET,
    APP_INTEGRATION: INTEGRATION_APP,
    APP_COMPANY_ID: isWeb ? `'${APP_COMPANY_ID}'` : APP_COMPANY_ID,
    APP_PLATFORM: isWeb ? `'${APP_PLATFORM}'` : APP_PLATFORM,
    APP_CUSTOM_SERVER: isWeb ? `'${APP_CUSTOM_SERVER}'` : APP_CUSTOM_SERVER,
    APP_HOME_PAGE: isWeb ? `'${APP_HOME_PAGE}'` : APP_HOME_PAGE,
    APP_AUTH_PAGE: isWeb ? `'${APP_AUTH_PAGE}'` : APP_AUTH_PAGE,
    APP_TRACK: `${APP_TRACK}`,
    APP_ID: `${APP_ID}`,
    APP_YOUSHU_TOKEN: `${APP_YOUSHU_TOKEN}`,
    APP_MAP_KEY: isWeb ? `'${APP_MAP_KEY}'` : APP_MAP_KEY,
    APP_MAP_NAME: `'${APP_MAP_NAME}'`,
    APP_IMAGE_CDN: APP_IMAGE_CDN
  },
  mini: {    
    miniCssExtractPluginOption: {
      //忽略css文件引入顺序
      ignoreOrder: true
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  weapp: {
    webpackChain(chain, webpack) {
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              lodash: {
                name: "lodash",
                priority: 1000,
                test(module) {
                  return /node_modules[\\/]lodash/.test(module.context);
                }
              },
              moment: {
                name: "date-fns",
                priority: 1000,
                test(module) {
                  return /node_modules[\\/]date-fns/.test(module.context);
                }
              }
            }
          }
        }
      });
      // if (isPro) {
      //   chain.plugin('analyzer')
      //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
      // }
      chain
        .plugin("IgnorePlugin")
        .use(webpack.IgnorePlugin, [/^\.\/locale$/, /date-fns$/]);
      chain
        .plugin("LodashModuleReplacementPlugin")
        .use(require("lodash-webpack-plugin"), [
          {
            coercions: true,
            paths: true
          }
        ]);
    },
    commonChunks(commonChunks) {
      commonChunks.push("lodash");
      commonChunks.push("date-fns");
      return commonChunks;
    },
    module: {
      router:{mode:'browser'},
      postcss: {
        // css modules 功能开关与相关配置
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module，下文详细说明
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },

};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
