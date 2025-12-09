const { formatGreeting } = require('./index.js');

function parseArgs(argv) {
    const args = { name: '', shout: false };
    
    for (let i = 2; i < argv.length; i++) {
        const arg = argv[i];
        
        if (arg.startsWith('--name=')) {
            args.name = arg.split('=')[1];
        } else if (arg === '--name' && i + 1 < argv.length) {
            args.name = argv[i + 1];
            i++;
        } else if (arg === '--shout') {
            args.shout = true;
        }
    }
    
    return args;
}

function main() {
    const args = parseArgs(process.argv);
    
    // Handle missing name
    if (!args.name) {
        console.error('Error: --name is required');
        console.error('Usage: node src/hello/cli.js --name=<name> [--shout]');
        process.exit(1);
    }
    
    const result = formatGreeting(args.name, args.shout);
    console.log(result);
}

main();