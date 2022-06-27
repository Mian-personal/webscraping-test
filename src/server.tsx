import Hapi from '@hapi/hapi';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';

import React from 'react';
import App from './components/App';
import { Source, SourceData } from './types/Source';
import WelcomeToTheJungle from './sources/WelcomeToTheJungle';
import Twitter from './sources/Twitter';
import Crunchbase from './sources/Crunchbase';
import { extract } from './logic/SourceExtractorLogic';

const init = async () => {

  const server = Hapi.server({
    port: 8080,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: async (request) => {
      const sources:Array<Source> = [WelcomeToTheJungle, Crunchbase, Twitter];
      const searchQuery = request.query.search;

      // Extract data from sources
      const data:Array<SourceData> = await extract(sources, searchQuery);

      // Render React <App> inside 'ndex.html content
      let indexHTML = fs.readFileSync( path.resolve( __dirname, 'index.html' ), {
        encoding: 'utf8',
      } );
      const appHTML = ReactDOMServer.renderToString( <App data={data}/> );
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