function formatGreeting(name, shout) {
    return shout ? `HELLO, ${name}!` : `Hello, ${name}!`;
}

module.exports = { formatGreeting };