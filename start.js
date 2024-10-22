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

    // After a short delay, run Electron
    setTimeout(() => {
        exec('npm run electron', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error starting Electron: ${stderr}`);
                return;
            }
            console.log(stdout);
        });
    }, 5000); // Adjust the delay as necessary
});
