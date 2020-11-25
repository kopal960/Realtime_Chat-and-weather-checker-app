const socket = io();
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
    var div = document.createElement("div");
    div.innerHTML = `<small> ${data.sender.username} </small><div> ${data.msg} </div> `
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
        notify({'_id':0,'username':data.sender.username }, data.msg);
})

socket.on("private-message" , (sender , msg , id_ref) => {
    if(chat_id == id_ref)
        newMessage({sender , msg});
    else
        notify(sender , msg);
})

const notify = (sender, msg) => {
    var new_friend = $("#" + sender._id);
    var messageDisplay = new_friend.children("div");
    if( messageDisplay.text() == "" )
    {
        if(sender._id==0)
            var div = $("<div></div>").text(`${sender.username}: ${msg}`);
        else
            var div = $("<div></div>").text(msg);
        new_friend.append(div);
    }    
    else
    {
        messageDisplay.text(msg);
    } 
}

socket.on("new-user" , (newuser)=> {
    var user = document.getElementById(newuser.id);
    if(user != undefined)
    {
        if(user.firstElementChild==null || user.firstElementChild.tagName!="P")
        {
            user.innerHTML =  "<p><small>online</small></p>" + user.innerHTML;
        }   
    }
    else
    {
        var div=  createElement("a");
        div.setAttribute("href" , `/chat/${receiver._id}/${newuser.id}`);
        div.innerHTML = `<div id= "${newuser.id}" class="people" >
                            <p><small>online</small></p>
                         ${newuser.username.trim()} </div>`;
    }
}) 

socket.on("user-disconnected" , (user) => {
    var User = document.getElementById(user)
    if(document.getElementById(user))
    {
        User.children[0].remove();
    }
}) 

socket.on("typing" , data=>{
    if(data.chat_id==chat_id )
    {
        if(chat_id==0)
        $(".status").text(` ${data.sender.username} :typing... `)
        else
        $(".status").text(` typing...`)
        setTimeout(function(){
            $('.status').text("")
        } ,5000);
    }    
})
send_btn.click(function(event){
    if(chat_id == 0)
        socket.emit("chat-message" , {msg :message.val() , sender : receiver} );
    else
    {
        socket.emit("private-message" , chat_id ,message.val() , receiver)
    }    
    message.val("");
} )

searchuser.addEventListener("change" ,function(event){
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
   function(){ 
       message_box.scrollTop = message_box.scrollHeight+100;}
)

message.keypress(event => {
    socket.emit("typing" , { 'sender' :receiver , chat_id })
})