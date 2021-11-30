const ticketControl = require ('../models/ticket-control');

const socketController = ( socket ) => {
    
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    socket.on('solicitar-ticket',( payload, callback ) => {
       payload.escritorio;
       const algo = ticketControl.atenderTicket(payload.escritorio); 
    });
            //TODO: notificar que hay un nuevo ticket pendiente de asignar

};

module.exports = {  
    socketController,
};

