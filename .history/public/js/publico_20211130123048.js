const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

for( i = 0;i<4;i++ ) {
    console.log(i);
} 

const socket = io();


socket.on('ultimos4-tickets',(ultimos4)=>{
    console.log(ultimos4);
    lblTicket1.innerText = ultimos4[0].numero;
    lblEscritorio1.innerText = ultimos4[0].escritorio;
})
