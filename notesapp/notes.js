const fs = require('fs')
const chalk=require('chalk')
const { title } = require('process')

const getNotes = function () {
    return "your notes..."
}

//add node function
const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicatesNotes = notes.filter(function (note) {//using inline callback function
        return note.title == title
    })
    if (duplicatesNotes.length == 0) {
        //push object to array of notes using push() function
        notes.push({
            title: title,//property_name:value
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    }
    else {
        console.log(chalk.red.inverse('Title already taken!'))
    }

}

//remove node function
const removeNote = function (title) {
    const notes= loadNotes()
    const checkNoteExist=notes.filter(function(note){
        return note.title=title
    })
    if(checkNoteExist.length!=0)
    {
        const afterRemovedNotes=notes.filter(function(note){
            if(note.title!=title)
            {
                return note
            }
        })
        saveNotes(afterRemovedNotes)
        console.log(chalk.green.inverse("Note removed!"))
    }
    else{
        console.log(chalk.red.inverse("Note with given title does not exist!"))
    }

}

const listNote =function(){
    const notes=loadNotes()
    console.log(chalk.yellow.inverse.bold("List of Notes:"))
    notes.filter(function(note){
        console.log(chalk.inverse.bold(note.title))
    })
}


const readNote=function(title){
    const notes=loadNotes()
    const readNote=notes.filter(function(read){
            return read.title==title
    })
    if(readNote.length!=0){
        console.log(chalk.green.inverse.bold("Title:"+title))
        console.log(chalk.bold.green(readNote[0].body))
    }
    else{
        console.log(chalk.red("Note does not exist!"))
    }
}
////////////////////////////////////////////////////////////////////
// save new state of notes on file
const saveNotes = function (notes) {//argument is taking array
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

// load all availabe notes on file
const loadNotes = function () {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []//if file notes.json file  does not exist error is catched and empty arrayt is sent
    }

}

module.exports = {
    getNotes: getNotes,//here property:function name my or not be same
    addNote: addNote,
    removeNote: removeNote,
    listNote:listNote,
    readNote:readNote
    //removeNote:removeNote,
}