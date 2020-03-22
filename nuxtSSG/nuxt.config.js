const path = require('path');
module.exports = {
  mode: 'spa',
  // Headers of the page
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Customize the progress-bar color
  loading: { color: '#fff' },
  // Global CSS
  css: [
  ],
  // Plugins to load before mounting the App
  plugins: [
  ],
  // Nuxt.js dev-modules
  buildModules: [
  ],
  // Nuxt.js modules
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  // Axios module configuration
  // See https://axios.nuxtjs.org/options
  axios: {
  },
  // Build configuration
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, "posts"),
        loader: "frontmatter-markdown-loader",
        options: {
          mode: ["vue-component", "meta"]
        }
      });
      config.module.rules.push({
        test: /\.coffee$/,
        loader: 'coffee-loader'
      });
    }
  }
}