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
            return callback({
                ok:     false,
                msg:    'El escritorio es obligatorio'
            });
        }
        const ticketAsing = ticketControl.atenderTicket( escritorio );
        if (!ticketAsing){
            return callback({
                ok:     false,
                msg:    'No '
            });
        }
        const encola = ticketControl.tickets.length;
        callback({...ticketAsing,encola});
    });

    

};

module.exports = {  
    socketController,
};

