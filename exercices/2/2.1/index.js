let message="This is bad";

alert(addDateTime(message));




function addDateTime(message){
    const dateTimeNow = new Date();
    console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
    console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15

    return dateTimeNow.toLocaleDateString() + " : " +message;
}
