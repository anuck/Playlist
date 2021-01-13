'use strict'
const express = require('express')
const httpHandler = require('./httpHandler')
const cors = require('cors')

const port = 7558
const app = express()

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))




app.use(cors())
 
app.get('/pratik',httpHandler.callme)
app.post('/SaveTracks',httpHandler.AddTarckToDatabase)
app.get('/listofArtist',httpHandler.listofArtist)
app.get('/listofplaylist',httpHandler.findlistofplaylist)
app.get('/serchByTitle/:title',httpHandler.serachBytitle)
    

app.delete("/api/tracks/:id",httpHandler.deleteSingleTrack);



app.listen(port, console.log("Connected on Port:", port))