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
alertNoTickets.style.display =  'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

btnAtender.addEventListener( 'click', () => {
    
    const payload = { escritorio };
    socket.emit('atender-ticket', payload, ( response ) => {
        console.log(response);
        const {ok,numero,encola,msg} = response;
        
        if(!ok){
            
        } else {
            alertNoTickets.style.display =  'block';
            alertNoTickets.innerText =  msg;
            //alertNoTickets.classList.remove('alert-info');
            //alertNoTickets.classList.add('alert-danger');
            lblPendientes.style.display = 'none';
        }
        
    });
});

socket.on('ultimo-ticket', ( ultimoTicket ) => {
    //lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`;
});