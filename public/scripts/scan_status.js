$(".eventscan").on("click",handleScan);
const date=new Date();
function handleScan()
{
    let urlvalue=document.getElementById("urlinput").value;
    if(urlvalue)
    {
   document.querySelector("#urlval").innerHTML=urlvalue;
   document.querySelector("#status").innerHTML="In Progress...";
   document.querySelector("#time").innerHTML=date;
    }
    else
    {
        document.querySelector("#urlval").innerHTML="Null";
    }
}
