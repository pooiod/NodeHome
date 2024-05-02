import express from 'express';

const app = express();
const port = 3111;

// Serve an HTML form at the root route with embedded JavaScript for client-side redirect
app.get('/', (req, res) => {
    res.send(`
        <form id="repoForm">
            <input type="text" id="repository" placeholder="Enter GitHub repository link" required />
            <button type="submit">Go</button>
        </form>
        <script>
            document.getElementById('repoForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const repoUrl = document.getElementById('repository').value;
                const repoPath = repoUrl.replace('https://github.com/', '').replace('.git', '');
                window.location.href = \`https://gitnode.free.nf/\${repoPath}\`;
            });
        </script>
    `);
});

app.listen(port, () => {
    console.log(\`App is live at http://localhost:\${port}\`);
});
