import   express         from 'express';
import   path            from 'path';
import { fileURLToPath } from 'url';
import { getDocs       } from './s12_server-api/getDocs.mjs';

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __basedir = __dirname.replace( /\/server1/, '' )

const app = express();

// Serve static files from client/c01-client-app
const clientDir = path.join(__basedir, 'client1', 'c12_client-app');
app.use(express.static(clientDir));

// Specific routes for HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.get('/page1', (req, res) => {
  res.sendFile(path.join(clientDir, 'page1.html'));
});

// API endpoint on a different port
const apiApp = express();
apiApp.get('/api/getDocs', async (req, res) => {
  try {
    const docs = await getDocs(); // Call the imported function
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch docs' });
  }
});

// Start servers on different ports
const PORT_CLIENT = 8012;
const PORT_SERVER = 8112;

  if (PORT_CLIENT == process.argv[2] || process.argv[2] == 'both') {
      app.listen(PORT_CLIENT, () => {
      console.log(`Client App is running at http://localhost:${PORT_CLIENT}`);
  }); }

  if (PORT_SERVER == process.argv[2] || process.argv[2] == 'both') {
      apiApp.listen(PORT_SERVER, () => {
      console.log(`Server API is running at http://localhost:${PORT_SERVER}`);
  }); }