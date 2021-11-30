const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblTicket1');

for( i = 0;i<4;i++ ) {
    console.log(i);
} 

const socket = io();

socket.on('connect', () => {
    //btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    //btnAtender.disabled = true;
});

socket.on('ultimos4-tickets',(ultimos4)=>{
    console.log(ultimos4);
    lblTicket1.innerText = ultimos4[0].numero;
})
