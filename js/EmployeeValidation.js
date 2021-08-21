window.addEventListener('DOMContentLoaded',(event)=>
{
const name=document.querySelector("#name");
const textError = document.querySelector(".text-error");
name.addEventListener('input', function () 
{
  if(name.value.length==0)
  {
    textError.textContent="";
    return;
  }
try
{
  (new EmployeePayrollData()).name=name.value;
  textError.textContent="";

}
catch(e)
{
  textError.textContent=e;
}
});
 
//salary range setter
  const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function ()
   {
    output.textContent = salary.value;
  });

 //validates the date
 const date = document.querySelector('#date');
 date.addEventListener('input',function(){
     let startDate = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
     try{
         (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
         setTextValue(".date-error","");
     }catch(e){
         setTextValue(".date-error",e);
     }
 });
});
  

const save=()=>
{
  try
  {
    let employeePayrollData=createEmployeePayroll();
  }
  catch(e)
  {
    return;
  }
}


const createEmployeePayroll=() =>
{
  let employeePayrollData=new EmployeePayrollData();
  try{
    employeePayrollData.name=getInputValueById("#name");
  }
  catch(e)
  {
    setTextValue(".text-error",e);
    throw e;
  }
  employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
  employeePayrollData.department=getSelectedValues('[name=department]');
  employeePayrollData.salary=getInputValueById("#salary");
  employeePayrollData.notes=getInputValueById("#notes");
  let date=getInputValueById("#day")+ " "+getInputValueById("#month") + " "+getInputValueById("#year");

  try
  {
    employeePayrollData.startDate=new Date(Date.parse(date));
    setTextValue(".date-error","");
  }
  catch
  {
    setTextValue(".date-error",e);
    throw e;
  
  }
  alert(employeePayrollData.toString());
  return employeePayrollData;
}


const getInputValueById=(id) =>
{
  let value=document.querySelector(id).value;
  return value;
}


const getSelectedValues=(proertyValue)=>
{
  let allItems=document.querySelectorAll(proertyValue);
  let selItems=[];
  allItems.forEach(item=>
    {
if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const setTextValue=(id,value) =>
{
  const element=document.querySelector(id);
  element.textContent=value;
}


