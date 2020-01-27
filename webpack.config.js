const path = require( 'path' );

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.join( __dirname, 'dist' ),
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        modules: [__dirname, 'src'],
        extensions: ['*', '.js'],
    },
    module: {
        rules: [
            {
                test: /.js/,
                exclude: /node_modules/,
                loader: require.resolve( 'babel-loader' )
            }
        ]
    }
}