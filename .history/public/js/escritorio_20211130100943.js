//referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblAtender = document.querySelector('small');
const lblPendientes = document.querySelector('#lblPendientes');


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
    lblAtender.display = 'none';

});

socket.on('disconnect', () => {
    console.log('desconet');
    btnAtender.disabled = true;
});

btnAtender.addEventListener( 'click', () => {
    
    const payload = { escritorio };
    socket.emit('solicitar-ticket', payload, ( response ) => {
        if(response.encola > 0){
            console.log(response);
            lblAtender.innerText = 'Ticket ' + response.numero;
            lblPendientes.innerText = response.encola;
        }        else {}
        
    });
});

socket.on('ultimo-ticket', ( ultimoTicket ) => {
    //lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`;
});