//referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario!!!');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

const socket = io();

socket.on('connect', () => {
    console.log('conetc');
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    console.log('desconet');
    btnAtender.disabled = true;
});

btnAtender.addEventListener( 'click', () => {
    
    const payload
    socket.emit('solicitar-ticket', null, ( ticket ) => {
        //lblNuevoTicket.innerText = ticket;
    });
});

socket.on('ultimo-ticket', ( ultimoTicket ) => {
    //lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`;
});