const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

for( i = 0;i<4;i++ ) {
    console.log(i);
} 

const socket = io();

socket.on('ultimos4-tickets',(ultimos4)=>{
    const[t1,t2,t3,t4] = ultimos4;
    lblTicket1.innerText = t1.numero;
    lblEscritorio1.innerText = t1.escritorio;
})
