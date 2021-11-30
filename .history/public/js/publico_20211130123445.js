const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

for( i = 0;i<4;i++ ) {
    console.log(i);
} 

const socket = io();

socket.on('ultimos4-tickets',(ultimos4)=>{
    const[t1,t2,t3,t4] = ultimos4
    lblTicket1.innerText = t1.numero;
    lblEscritorio1.innerText = t1.escritorio;
})
