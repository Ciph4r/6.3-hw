const csv = require('csv-parser')
const fs = require('fs')
const http = require('http')
const zlib = require('zlib')
const gzip = zlib.createGzip()
const gunzip = zlib.createGunzip()
const results = [];
 
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    results.push(data)
      fs.writeFile('males.json', JSON.stringify(results.filter(x => x.Gender === 'M')), (err) => {
      if (err) throw err;
  })
  fs.writeFile('females.json', JSON.stringify(results.filter(x => x.Gender === 'F')), (err) => {
    if (err) throw err;
  })
})
  .on('end', () => {
  })

    /////////
    fs.createReadStream('males.json')
    .pipe(gzip)
    .pipe(fs.createWriteStream('males.json.gz'))
    .on('finish', function () {  
      console.log('done compressing');
    })
    ////////////
    fs.createReadStream('females.json')
    .pipe(gzip)
    .pipe(fs.createWriteStream('females.json.gz'))
    .on('finish', function () {  
      console.log('done compressing');
    })
    ///////////////



 const server = http.createServer((req , res)=> {
   let readStream = ''
   let wstream = ''
     if(req.url === '/'){
        res.writeHead(200,{ 'Content-Type' : 'text/plain'})
        res.end('Welcome to Male & Female Parser')

     }
  
   else if (req.url === '/males'){
    res.writeHead(200,{ 'Content-Type' : 'text/plain'})
    readStream = fs.createReadStream(__dirname + '/males.json')
    readStream.pipe(res)

    }
    else if (req.url === '/females'){
      res.writeHead(200,{ 'Content-Type' : 'text/plain'})
      readStream = fs.createReadStream(__dirname + '/females.json')
      readStream.pipe(res)
        
    }
    else {
       res.end('error not found')
    }

})

server.listen(3000 , () => {
    console.log('listening on port 3000')
})



