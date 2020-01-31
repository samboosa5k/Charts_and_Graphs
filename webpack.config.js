const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = {
    /* context: path.join(__dirname, 'src'), */
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.join( __dirname, 'dist' ),
        /* publicPath: '/' */
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: './index.html'
        } )
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
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