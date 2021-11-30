const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

/*for( i = 0;i<4;i++ ) {
    console.log(i);
}*/ 

const socket = io();

socket.on('ultimos4-tickets',(payload)=>{
    const[t1,t2,t3,t4] = payload;

    if ( t1 ){

    }
    lblTicket1.innerText = 'Ticket '+t1.numero;
    lblEscritorio1.innerText = t1.escritorio;

    if ( t1 ){
        
    }
    lblTicket2.innerText = 'Ticket '+t2.numero;
    lblEscritorio2.innerText = t2.escritorio;

    lblTicket3.innerText = 'Ticket '+t3.numero;
    lblEscritorio3.innerText = t3.escritorio;

    lblTicket4.innerText = 'Ticket '+t4.numero;
    lblEscritorio4.innerText = t4.escritorio;
});
