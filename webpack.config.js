module.exports = {
  client: __dirname + '/src', // Entry point, this is where client side JS will live. In this case it will be in the src folder.
  output: {
    path: '/'
  },
  devtool: 'source-maps',
  module: { // Where you plug in babel.
    loaders: [
      {
        test: /\.js$/, // Checks for files ending in the .js extension.
        loader: 'babel', // The loader you want to run on it.
        query: { // Tells Babel what transforms and plugins to run on code.
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  }
}
