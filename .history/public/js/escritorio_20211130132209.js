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
        const {ok,numero,msg} = response;
        
        if(!ok){
            lblAtender.innerText = 'Sin atención';
            alertNoTickets.innerText =  msg;
            //alertNoTickets.classList.remove('alert-info');
            //alertNoTickets.classList.add('alert-danger');
            return lblPendientes.style.display = 'none';
        }

        lblAtender.innerText = 'Ticket ' + numero;        
    });
});

socket.on('tickets-encola', ( { encola } ) => {
    if(encola===0){
        alertNoTickets.style.display =  'block';
    }
    lblPendientes.innerText = encola;
});