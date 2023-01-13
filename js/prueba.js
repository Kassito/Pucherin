let readline = require('readline');

readline.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', () => {
//   console.log('got');
console.log("hola")
//   if (key && key.ctrl && key.name == 'c') {
//     process.stdin.pause();
//   }
});

process.stdin.setRawMode(true);