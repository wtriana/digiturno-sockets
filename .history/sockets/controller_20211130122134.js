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
        const encola = ticketControl.tickets.length;

        //TODO: Notificar cambio en los ultimos 4 tickets
        if (!ticketAsing){
            callback({
                ok:     false,
                msg:    'No hay tickets para atender'
            });
        } else {
            callback({
                ok:true,
                encola,
                ...ticketAsing,
            });
        }
        
        
    });

    socket.emit('ultimos4-tickets', ticketControl.ultimo);

    

};

module.exports = {  
    socketController,
};

