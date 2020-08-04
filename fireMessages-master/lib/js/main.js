const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
let db = firebase.database().ref() // getting the reference point for my database

/**
 * Updates the database with the username and message.
 */
function updateDB(event){ // callback function for our function
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    // data scheme (structure) or the way way you want to organize your data
    // added new data into our database
    let value = {
        // 2 columns  within each row
        NAME: username,
        MESSAGE: message 
    };

    db.push(value);// making the row

}

// Set database "child_added" event listener here
db.on("child_added",addMessageToBoard);

let messageContainer = document.querySelector(".allMessages")


function addMessageToBoard(rowData){

    // extract the rowData
    console.log("what are you?",rowData);
    let row = rowData.val(); //return an object just like the object we pushed for value
    console.log(row);

    // this is the point where we can start using infromation from our database
    let name = row.NAME;
    let sentence = row.MESSAGE;

    // add a new p tag to the page
    let newP = document.createElement("p");
    newP.innerText = name + ": " + sentence;
    messageContainer.appendChild(newP);

}