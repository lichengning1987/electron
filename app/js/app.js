var fs = require('fs'),
    textarea = document.getElementsByTagName('textarea')[0],
    button = document.getElementsByTagName('button')[0];

function writeFile() {
    var text = textarea.value;
    console.log(text);
    fs.writeFileSync('./app/message.txt',
        text, 'utf8');
}

button.onclick = writeFile;
