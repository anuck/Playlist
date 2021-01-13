const HTTP_OK = 200;
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'
const path = require('path')
const ERROR_CODE = 400;
var fs = require('fs')
var db = require('./db_connect')
var url = require('url');
//var pathOfJsonDataFile = path.resolve(__dirname, '..')
//const pathOfJsonDataFile='C:/clientServer/server'


function callme(request,response)
{
    console.log('i am here')    
}





async function listofArtist(request, response)
{
    
    const sql= "SELECT id,type from playlist";
        db.con.query(sql, function (err, result) {                                        
         if (err) throw err;
        response.send(JSON.stringify(result)) 
       });


}


async function findlistofplaylist(request, response)
{
    
    const sql= "select * from track";
        db.con.query(sql, function (err, result) {                                        
         if (err) throw err;
        console.log(JSON.stringify(result))
        response.send(JSON.stringify(result)) 
       });


}
 function serachBytitle(request, response)
{ 
  console.log("gunita")
  
    const sql= "select track.title, playlist.type from track join playlist on track.playlist_id=playlist.id where track.title Like '%"+request.paramas.title+"%'";
        db.con.query(sql, function (err, result) {                                        
         if (err) throw err;
         console.log("pk")
        console.log(JSON.stringify(result))
        console.log("ak")
        response.send(JSON.stringify(result)) 
       });


}

function deleteSingleTrack (req, res) {
  const id = req.params.id;
  console.log(id)
  let query = 'delete from track where id = ' + id;
  db.con.query(query, function (error, results, fields) {
  if (error) throw res.status(500).send({ error: error});
  if(results.affectedRows > 0)
  res.send({ message: "Track deleted successfully." });
  else
  res.send({ error: "There is a problem while deleting Please try after sometime."});
  });
 };

async function AddTarckToDatabase(req, res)
{
    console.log("i am  tryitng to add into database")
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
        return;
      }
     
     
      console.log(req.body.title)

      // Create a Track
      const track = {
        t_id: req.body.id, 
        t_title: req.body.title ? req.body.title: "null" ,
        t_uri: req.body.uri? req.body.uri: "null",
        t_master_id: req.body.master_id ? req.body.master_id :101,
        t_playlist_id: req.body.playlist_id ? req.body.playlist_id :101,
        t_thumb: req.body.thumb ? req.body.thumb :"null"
      };
    
    
      
     const sql= "INSERT INTO track (id, playlist_id, title, uri, master_id) VALUES ("+track.t_id+","+track.t_playlist_id+",'"+track.t_title+"','"+track.t_uri+"',"+track.t_master_id+")";
     db.con.query(sql, function (err, result) {                                        
          if (err) throw err;
          console.log(result)
        //  response.send(JSON.stringify(result))
        //  response.send(result)
          
          
        });
      
}

module.exports = {
 
  callme,
  listofArtist,
 AddTarckToDatabase,
 findlistofplaylist,
 serachBytitle,
 deleteSingleTrack
}