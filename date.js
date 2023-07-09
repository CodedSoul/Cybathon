module.exports.getDate=getDate1;
function getDate1()
{
const date=new Date();
var tdate=date.getDate();
return tdate;
}
module.exports.getDay=getDay1;
function getDay1()
{   var tday1="";
    const date1=new Date();
    var tday=date1.getDay();
    if(tday>=1 && tday<6)
    {
        tday1="Weekday";
    }
    else
    {
        tday1="Weekend";
    }
    return tday1;
}