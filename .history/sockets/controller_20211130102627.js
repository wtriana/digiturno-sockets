const ticketControl = require ('../models/ticket-control');

const socketController = ( socket ) => {
    
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    socket.on('atender-ticket',( payload, callback ) => { 
        const ticketAsing = ticketControl.atenderTicket( payload.escritorio ); 
        const encola = ticketControl.tickets.length;
        callback({...ticketAsing,encola});
    });

    

};

module.exports = {  
    socketController,
};

