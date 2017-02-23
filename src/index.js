import React from 'react'
import ReactDom from 'react-dom'
import io from 'socket.io-client'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state={messages:[]}
  }
componentDidMount(){
 this.socket=io('/')
 this.socket.on('message',message=>{
 	this.setState({messages:[message,...this.state.messages]})
 })

}
  
  handleSumbit=event=>{
  	console.log("inside handleSumbit")
       const body=event.target.value

       if(event.keyCode===13 && body)
       	{
       		console.log("inside if")


       		const message={
       			body,
       			from:"Me"
       		}
     this.setState({messages:[message,...this.state.messages]})
     console.log("state set")
     this.socket.emit('message',body)
     event.target.value=''

  }
}
	render(){
const messages=this.state.messages.map((message,index)=>{
   return <li key={index}><b>{message.from}:</b>{message.body} </li>
})

		return(
<div>
<h1>Lets CHAT !!!!!</h1>
<input type='text' placeholder='Enter Text Here....'  onKeyUp={this.handleSumbit} />
{messages}


</div>
			)
	}
}

ReactDom.render(<App />,document.getElementById('app'))