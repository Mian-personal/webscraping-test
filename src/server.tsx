import Hapi from '@hapi/hapi';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';

import React from 'react';
import App from './App';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: () => {

            let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/index.html' ), {
                encoding: 'utf8',
            } );

            let appHTML = ReactDOMServer.renderToString( <App /> );
            indexHTML = indexHTML.replace( '<div id="root"></div>', `<div id="root">${ appHTML }</div>` );

            return indexHTML;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();