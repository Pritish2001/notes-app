//simple nodejs implementation of a Note taking app all commands easily written through command prompt

//USE FOLLOWING COMMANDS
//ADD NOTE:         node app.js add --title="Title of the Note" --body="Body of the Note"
//REMOVE NOTE:      node app.js remove --title="Title of the node you wish to remove"
//LIST NOTE:        node app.js list
//READ NOTE:        node app.js read --title="title of the node you wish to read"


const chalk= require('chalk')
const { argv, demandOption } = require('yargs')
const yargs=require('yargs')
const note=require('./notes.js')

// customize yargs version(npm module)
yargs.version('1.1.0')

//add,remove,read,list

// create add command
yargs.command({
    command: 'add',
    describe: 'add a new node',
    builder:{
        title:{// call in terminal using --title="some value"
            describe:'note title to add',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:"body/contents of the note",
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        note.addNote(argv.title,argv.body)
    }
})

//create remove command
yargs.command({
    command:'remove',
    describe:'removes the note',
    builder:{
        title:{
            describe:"note title to remove",
            demandOption:true,
            type:'string'
        }
    },
    handler:function(){
        note.removeNote(argv.title)
    }
})

//create the list command
yargs.command({
    command:'list',
    describe:"lists notes",
    handler:function(){
        note.listNote()
    }
})


//creating the read list command
yargs.command({
    command:"read",
    describe:"reads the note",
    handler:function(){
        note.readNote(argv.title)
    }
})
yargs.parse()