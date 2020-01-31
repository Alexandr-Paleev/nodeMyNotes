const yargs = require('yargs')
const pckg = require('./package.json')
const notes = require('./notes')

yargs.version(pckg.version);

yargs.command({
    command: 'add',
    describe: 'add new note',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Name note'
        },
        text: {
            type: 'string',
            demandOption: true,
            describe: 'Content note'
        }
    },
    handler({title, text}) { 
        notes.addNote(title, text)
    }
});

yargs.command({
    command: 'list',
    describe: 'showing list note',
    handler() {
        notes.listNotes()
    }
});

yargs.command({
    command: 'read',
    describe: 'looking content selected note',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Name note'
        }
    },
    handler({ title }) {
        notes.readNote(title)
    }
});


yargs.command({
    command: 'remove',
    describe: 'remove note',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Name note'
        }
    },
    handler({ title }) {
        notes.removeNote(title)
    }
});

yargs.parse() 