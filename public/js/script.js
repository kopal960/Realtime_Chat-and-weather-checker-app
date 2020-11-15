const socket = io("http://localhost:3000" );
var message_box = document.querySelector(".messages");
var message = $(".message");
var send_btn = $(".send");
var mform = $(".messageform");
var usersList = document.getElementsByClassName("people");
var receiver = mform.attr("data-send");
var searchuser = document.getElementById("search");
receiver = JSON.parse(receiver);

var chat_id = $(".chatname").attr("data-id");

socket.once("connect" , function(){
    socket.emit("new", receiver)
})

const newMessage = (data) => {
    console.log(data);
    var div = document.createElement("div");
    div.innerHTML = `<small> ${data.sender.name} </small><div> ${data.msg} </div> `
    console.log(data.id , receiver.name );
    if(data.sender._id.toString().trim() == receiver._id.toString())
        div.setAttribute("class" , "right");
    else
        div.setAttribute("class" , "left");
    message_box.appendChild(div);
    message_box.scrollTop = message_box.scrollHeight;
}

socket.on("chat-message" , (data) => { 
    if(chat_id == 0)
        newMessage(data);
    else
        notify(0 , data.msg);
})

socket.on("private-message" , (sender , msg , id_ref) => {
    console.log("new-me" , id_ref, chat_id);
    if(chat_id == id_ref)
        newMessage({sender , msg});
    else
        notify(sender._id , msg);
})

const notify = (id, msg) => {
    var new_friend = $("#" + id);
    var messageDisplay = new_friend.children("div");
    console.log(messageDisplay.text());
    if( messageDisplay.text() == "" )
    {
        var div = $("<div></div>").text(msg);
        new_friend.append(div);
    }    
    else
    {
        messageDisplay.text(msg);
    } 
}

socket.on("new-user" , (newuser)=> {
    console.log(user ,newuser.id, newuser.name );
    var user = document.getElementById(newuser.id);
    if(user != undefined)
    {
        user.innerHTML =  "<p><small>online</small></p>" + user.innerHTML;
    }
    else
    {
        var div=  createElement("a");
        div.setAttribute("href" , `/chat/${receiver._id}/${newuser.id}`);
        div.innerHTML = `<div id= "${newuser.id}" class="people" >
                            <p><small>online</small></p>
                         ${newuser.name.trim()} </div>`;
         
    }
}) 

socket.on("user-disconnected" , (user) => {
    var User = document.getElementById(user)
    if(document.getElementById(user))
    {
        console.log(User.children[0]);
        User.children[0].remove();
    }
}) 

send_btn.click(function(event){
    console.log("click");
    console.log(receiver);
    if(chat_id == 0)
        socket.emit("chat-message" , {msg :message.val() , sender : receiver} );
    else
    {
        console.log(chat_id);
        socket.emit("private-message" , chat_id ,message.val() , receiver)
    }    
    message.val("");
    console.log("worked");
} )

searchuser.addEventListener("change" ,function(event){
    console.log(searchuser.value);
    var value = searchuser.value;
    for(user of usersList)
    {
        var name = user.textContent;
        if(!name.toString().toLowerCase().includes(value.toLowerCase()))
            user.parentElement.style.display = "none";
        else
            user.parentElement.style.display = "block";
    }
})

window.addEventListener( "load" ,
   function(){ message_box.scrollTop = message_box.scrollHeight+100;}
)