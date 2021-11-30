//referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    console.log('conetc');
    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    console.log('desconet');
    btnCrear.disabled = true;

});

btnCrear.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
});

socket.on('ultimo-ticket', ( ultimoTicket ) => {
    lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`;
});
