for( i = 0;i<4;) 

const socket = io();

socket.on('connect', () => {
    //btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    //btnAtender.disabled = true;
});

socket.on('ultimos4-tickets',(ultimos4)=>{
    console.log(ultimos4);
})
