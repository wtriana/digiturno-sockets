const ticketControl = require ('../models/ticket-control');

const socketController = ( socket ) => {
    
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('ultimos4-tickets', ticketControl.ultimos4);
    socket.emit('tickets-encola', {encola:ticketControl.tickets.length});
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit('tickets-encola', {encola:ticketControl.tickets.length})
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
        
        socket.broadcast.emit('ultimos4-tickets', ticketControl.ultimos4);
        socket.broadcast.emit('tickets-encola', {encola:ticketControl.tickets.length});
        socket.broadcast.emit('tickets-encola', {encola:ticketControl.tickets.length});
        
        if (!ticketAsing){
            callback({
                ok:     false,
                msg:    'No hay tickets para atender'
            });
        } else {
            callback({
                ok:true,
                encola:ticketControl.tickets.length,
                ...ticketAsing,
            });
        }
        
        
    });

    socket.emit('ultimos4-tickets', ticketControl.ultimos4);

    

};

module.exports = {  
    socketController,
};

