import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3111;

// Middleware to parse the incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve an HTML form at the root route
app.get('/', (req, res) => {
    res.send(`<form action="/redirect" method="post" target="_top">
    <input type="text" name="repository" placeholder="Enter GitHub repository link" required />
    <button type="submit">Go</button>
</form>`);
});

// Handle form submission and redirect
app.post('/redirect', (req, res) => {
    const repoUrl = req.body.repository;
    // Extract the repository path from the URL
    const repoPath = repoUrl.replace('https://github.com/', '');
    // Send back a script to redirect the top window
    res.send(`
        <script>
            window.top.location.href = "https://gitnode.free.nf/${repoPath}";
        </script>
    `);
});

app.listen(port, () => {
    console.log(\`App is live at http://localhost:${port}\`);
});
