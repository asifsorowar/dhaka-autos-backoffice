module.exports = {
    apps: [
        {
            name: 'atl-aplus-bo-web',
            script: './server.js',
            instances: 1,
            exec_mode: 'cluster',
            watch: false,
            ignore_watch: ['node_modules'],
        },
    ],
};
