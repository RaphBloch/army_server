

// load the modules that you neead
var express = require('express');
var http = require('http');
const prompt = require('prompt-sync')();
const readline = require('readline');


//create an express app
app = express();




//creation of my server
server = http.createServer(app);

//creation of my socket
var io = require('socket.io').listen(server);


//Environment variable
const port = 4000;

        //#region Data Fields
 var altitude = 0 ;
 var HIS = 0;
 var ADI = 0;


// #endregion




app.get('/',function (req,res) {

    res.send(200);
});


            //#region   Help Functions
/**
 * Async function that waits for a keypress to be terminated
 * @returns {Promise<*>}
 */
const keypress = async () => {
        process.stdin.setRawMode(true)
        return new Promise(resolve => process.stdin.once('data', () => {
            process.stdin.setRawMode(false)
            resolve()
        }))
    }
;

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
  //  #endregion



// launching the server
server.listen(port, () => {
    console.log('server is running on port', server.address().port);


});


io.on('connection',   async socket => {

    console.log("New client connected");


    function onErr(err) {
        console.log(err);
        return 1;
    }

        // region Prompt the parameters
        altitude = prompt('Altitude:');
        while(altitude> 3000 || altitude < 0)
        {
            console.log('Enter a valid value of altitude ( between 0 and 3000');
            altitude = prompt('Altitude:');
        }

        ADI = prompt('ADI: ');
        while(ADI < -100 || ADI > 100)
        {
            console.log("Please , enter a valid value of ADI (between -100 and 100)")
            ADI = prompt('ADI: ');
        }

        HIS  = prompt('HIS : ');
        while(HIS < 0 || HIS >= 360)
        {
            console.log("Please , enter a valid value of HIS (between 0 and 359)")
            HIS = prompt('HIS: ');
        }
        console.log("Any Key : ");
        await keypress();

        //endregion

        let response=[altitude,ADI,HIS];
        console.log("Thank you for sending data ");
        // Emitting a new  data message. Will be consumed by the client
        socket.emit("Data", response);



    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {

    })
});