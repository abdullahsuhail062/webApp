import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------
// Path to Angular browser build
// IMPORTANT: Correct path for Vercel (server file lives in dist/webapp/server)
// ---------------------------------------------------------------------
const browserDistFolder = join(__dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// ---------------------------------------------------------------------
// Serve static Angular browser files
// ---------------------------------------------------------------------
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// ---------------------------------------------------------------------
// Handle SSR for all non-static requests
// ---------------------------------------------------------------------
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

// ---------------------------------------------------------------------
// Start local server (not used on Vercel, but needed for debugging)
// ---------------------------------------------------------------------
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Node Express server running at http://localhost:${port}`);
  });
}

// ---------------------------------------------------------------------
// Export handler for Vercel / serverless
// ---------------------------------------------------------------------
export const reqHandler = createNodeRequestHandler(app);
