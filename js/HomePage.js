//UC4-->using template literals-ES6 feature(table)
let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    if(site_Properties.use_local_storage.match("true"))
    {
    getEmployeePayrollFromLocalStorage();
    }
    else
    {
        getEmployeePayrollDataFromServer();
    }
});
const processEmployeePayrollDataResponse=()=>
{
    document.querySelector(".emp-count").textContent=employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}
//UC6--getting the data from local storage
const getEmployeePayrollFromLocalStorage=()=>
{
    employeePayrollList=localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
    processEmployeePayrollDataResponse();
}
//getting data from json server
const   getEmployeePayrollDataFromServer=()=>
{
    makeServiceCall("GET",site_Properties.server_url,true)
    .then(responseText=>
        {
            employeePayrollList=JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error=>
        {
console.log("GET Error status: "+JSON.stringify(error));
employeePayrollList=[];
processEmployeePayrollDataResponse();
        });
}
//UC5-->employee details from json object(retrieving all jsom object using for loop)
createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    //let employeePayrollList = getEmployeePayrollFromLocalStorage();
    for (const employeePayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
    
    <tr>
    <td>
        <img class="profile" alt="" src="${employeePayrollData._profilePic}">
    </td>
    <td>${employeePayrollData._name}</td>
    <td>${employeePayrollData._gender}</td>
    <td>
     ${getDeptHtml(employeePayrollData._department)}
    </td>
    <td>${employeePayrollData._salary}</td>
    <td>${ stringifyDate(employeePayrollData._startDate)}</td>
    <td>
        <img id="${employeePayrollData.id}" src="../assests/icons/delete-black-18dp.svg" alt="delete icon" onclick="remove(this)">
        <img id="${employeePayrollData.id}" src="../assests/icons/create-black-18dp.svg" alt="update icon" onclick="update(this)">
    </td>
</tr>
    `;

        document.querySelector('#display').innerHTML = innerHtml;

    }
}
//delete operation in home page
const remove=(node)=>
{
    let employeePayrollData=employeePayrollList.find(empData=>empData.id==node.id)
    if(!employeePayrollData) return;
    const index=employeePayrollList.map(empData=>empData.id)
                               .indexOf(employeePayrollData.id);
    employeePayrollList.splice(index,1);
    if(site_Properties.use_local_storage.match("true"))
    {
        localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent=employeePayrollList.length;
    createInnerHtml();
    }
    else{
        const deleteURL=site_Properties.server_url+employeePayrollData.id.toString();
        makeServiceCall("DELETE",deleteURL,false)
        .then(responseText=>
            {
                createInnerHtml();
            })
            .catch(error=>
                {
                    console.log("DELETE Error Status:"+JSON.stringify(error));
                });
    }
}
//update operation
const update=(node)=>
{
    let employeePayrollData=employeePayrollList.find(empData=>empData.id==node.id)
    if(!employeePayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData))
    window.location.replace(site_Properties.add_emp_payroll_page);
}
const createEmployeePayrollJSON = () => {
    let empPayrollList = [
        {
            _name: 'Vishnu Priya',
            _gender: 'Female',
            _department: ['HR'],
            _salary: 60000,
            _startDate: '21-Aug-2021',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assests/profile-images/Ellipse -1.png'
        },
        {
            _name: 'Subhiksha',
            _gender: 'Female',
            _department: ['Engineering', 'Sales'],
            _salary: 65000,
            _startDate: '19-Aug-2021',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assests/profile-images/Ellipse -4.png'
        }
    ];
    return empPayrollList;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}