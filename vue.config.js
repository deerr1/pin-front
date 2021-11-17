module.exports = {
  lintOnSave: false,
  devServer: {
    port: 5001
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  transpileDependencies: ["quasar"],
};
