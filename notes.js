const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const notePath = path.join(__dirname, 'notes.json')

const getNotes = (callback) => {
    fs.readFile(notePath, 'utf-8', (err, content) => {
        if (err) {
            throw new Error(err)
        }

        try {
            callback(JSON.parse(content))
        } catch (err) {
            callback([])
        }
    })
}


const saveNotes = (content) => {
    fs.writeFile(notePath, JSON.stringify(content), err => {
        if (err) {
            throw new Error(err)
        }
    })
}

const addNote = (title, text) => {
    getNotes((notes) => {
        const dublicateNote = notes.find(note => note.title === title)

        if (dublicateNote) {
            console.log(chalk.red.inverse('Such a note already exists'))
        } else {
            notes.push({ title, text })
            saveNotes(notes)
            console.log(chalk.green.inverse('Note added'))
        }
    })
}

const listNotes = () => {
    getNotes(notes => {
        if (notes.length) {
            console.log(chalk.inverse('Your notes:'))

            notes.forEach(note => {
                console.log(note.title)
            })
        } else {
            console.log(chalk.blue('No notes yet, first add'))
        }
    })
}

const readNote = (title) => {
    getNotes(notes => {
        let noteRead = notes.find(note => note.title === title)

        if (noteRead) {
            console.log(chalk.inverse(noteRead.title))
            console.log(noteRead.text)
        } else {
            console.log(chalk.red.inverse(` Note with name: "${title}", not found `))
        }
    })
}

const removeNote = title => {
    getNotes(notes => {
        const updateNotes = notes.filter(note => note.title !== title)

        if (updateNotes.length !== notes.length) {
            saveNotes(updateNotes)
            console.log(chalk.green(`Note with name: "${title}", was delete success`))
        } else {
            console.log(chalk.red.inverse(`Note with name: "${title}", not found `))
        }
    })
}

module.exports = {
    addNote, listNotes, readNote, removeNote
}