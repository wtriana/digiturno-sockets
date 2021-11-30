const ticketControl = require ('../models/ticket-control');

const socketController = ( socket ) => {
    
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        //TODO: notificar que hay un nuevo ticket pendiente de asignar
    });

    socket.on('atender-ticket',( { escritorio }, callback ) => { 
        
        if (!escritorio){
            return callback();
        }
        const ticketAsing = ticketControl.atenderTicket( escritorio ); 
        const encola = ticketControl.tickets.length;
        callback({...ticketAsing,encola});
    });

    

};

module.exports = {  
    socketController,
};

