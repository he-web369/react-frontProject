import io from 'socket.io-client'

const socket=io('ws://localhost:4000')
socket.on('sendMsg',function (data) {
})
socket.emit('receiveMsg',{name:'tom',date:Date.now()})
