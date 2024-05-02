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

// Handle form submission and send back only the repository path
app.post('/redirect', (req, res) => {
    const repoUrl = req.body.repository;
    // Extract the repository path from the URL
    const repoPath = repoUrl.replace('https://github.com/', '').replace('.git', '');
    // Send back only the repository path
    res.json({ redirectUrl: `https://gitnode.free.nf/${repoPath}` });
});

// Client-side JavaScript to handle the redirection
app.get('/client-side-redirect.js', (req, res) => {
    res.type('.js');
    res.send(`
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            form.onsubmit = function(event) {
                event.preventDefault();
                const formData = new FormData(form);
                fetch('/redirect', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    window.top.location.href = data.redirectUrl;
                })
                .catch(error => console.error('Error:', error));
            };
        });
    `);
});

// Serve the client-side JavaScript file in the HTML form
app.get('/', (req, res) => {
    res.send(`<form action="/redirect" method="post" target="_top">
    <input type="text" name="repository" placeholder="Enter GitHub repository link" required />
    <button type="submit">Go</button>
</form>
<script src="/client-side-redirect.js"></script>
`);
});

app.listen(port, () => {
    console.log(`App is live at http://localhost:${port}`);
});
