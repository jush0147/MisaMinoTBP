self.importScripts('misamino.js');

let msgQueue = [];
let botCalculating = false;

Module.tbp_respond = true;
Module.onRuntimeInitialized = () => {
    processMessage = async function(msgData) {

        botCalculating = true;
        
        if(msgData.type == "start")
            Module.tbp_respond = true;

        Module.ccall('tbp_msg', 'number', ['string'], [
            JSON.stringify(msgData)
        ], {async: true}).then(result => {
            botCalculating = false;

            // Start processing messages queued while this was running
            if(msgQueue.length){
                let nextMessage = msgQueue.shift();
                Module.tbp_stop = false;
                processMessage(nextMessage);
            }
            
        });
    }

    onmessage = async function(e) {
        if(!msgQueue.length && !botCalculating){
            processMessage(e.data);
        }else{

            if( e.data.type == "suggest" || e.data.type == "stop"){
                // These messages set the stop flag (in case bot is calculating)
                Module.tbp_stop = true;

                if( e.data.type == "stop"){
                    // Stopping, no need to process any other queued command
                    msgQueue = [];
                    // Supress the postMessage from the command that is being stopped
                    Module.tbp_respond = false;
                }
            }

            msgQueue.push(e.data);
        }
    }
}
  