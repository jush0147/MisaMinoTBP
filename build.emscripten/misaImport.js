self.importScripts('misamino.js');

let msgQueue = [];
let botCalculating = false;

Module.onRuntimeInitialized = () => {
    processMessage = async function(msgData) {
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
            botCalculating = true;
            processMessage(e.data);
        }else{

            if( e.data.type == "suggest" || e.data.type == "stop"){
                // These messages set the stop flag (in case bot is calculating)
                Module.tbp_stop = true;
            }

            msgQueue.push(e.data);
        }
    }
}
  