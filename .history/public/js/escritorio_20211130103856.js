//referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblAtender = document.querySelector('small');
const lblPendientes = document.querySelector('#lblPendientes');
const alertNoTickets = document.querySelector('.alert');


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
    alertNoTickets.style.display =  'none';

});

socket.on('disconnect', () => {
    console.log('desconet');
    btnAtender.disabled = true;
});

btnAtender.addEventListener( 'click', () => {
    
    const payload = {  };
    socket.emit('atender-ticket', payload, ( response ) => {
        console.log(response);
        const {ok,numero,encola} = response
        if(ok){
            lblAtender.innerText = 'Ticket ' + numero;
            lblPendientes.innerText = encola;
        } else {
            alertNoTickets.style.display =  'block';
            alertNoTickets.innerText =  'block';
                        
            lblPendientes.style.display = 'none';
        }
        
    });
});

socket.on('ultimo-ticket', ( ultimoTicket ) => {
    //lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`;
});