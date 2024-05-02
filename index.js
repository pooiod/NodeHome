import express from 'express';

const app = express();
const port = 3111;

app.get('/', (req, res) => {
    res.send(`
        <style>
            body { font-family: Arial, sans-serif; background-color: #f7f7f7; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            form#repoForm { background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
            input#repository { border: 1px solid #ddd; border-radius: 3px; padding: 10px; width: 300px; margin-right: 10px; }
            button { background-color: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 3px; cursor: pointer; }
            button:hover { background-color: #0056b3; }
        </style>
        <form id="repoForm">
            <input type="text" id="repository" autocomplete="off" placeholder="Enter a Node.js GitHub repository link" required />
            <button type="submit">Go</button>
        </form>
        <script>
            document.getElementById('repoForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const repoUrl = document.getElementById('repository').value;
                const repoPath = repoUrl.replace('https://github.com/', '').replace('.git', '');
                window.parent.location.href = \`https://gitnode.free.nf/\${repoPath}\`;
            });
        </script>
    `);
});

app.listen(port, () => {
    console.log(`App is live at http://localhost:\${port}`);
});
