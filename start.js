const { exec } = require('child_process');

// Build the React app
exec('npm run build', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error building React app: ${stderr}`);
        return;
    }
    console.log(stdout);

    // Serve the build
    const serve = exec('serve -s build');

    serve.stdout.on('data', (data) => {
        console.log(data);
    });

    serve.stderr.on('data', (data) => {
        console.error(data);
    });

    // Wait for the server to start
    exec('wait-on http://localhost:3000 && npm run electron', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error starting Electron: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
});
