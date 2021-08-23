//UC4-->using template literals-ES6 feature(table)
let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList=getEmployeePayrollFromLocalStorage();
    document.querySelector(".emp-count").textContent=employeePayrollList.length;
    createInnerHtml();
});
//UC6--getting the data from local storage
const getEmployeePayrollFromLocalStorage=()=>
{
    return localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}
//UC5-->employee details from json object(retrieving all jsom object using for loop)
createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let employeePayrollList = getEmployeePayrollFromLocalStorage();
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
    <td>${employeePayrollData._startDate}</td>
    <td>
        <img id="${employeePayrollData._name}" src="../assests/icons/delete-black-18dp.svg" alt="delete icon">
        <img id="${employeePayrollData._name}" src="../assests/icons/create-black-18dp.svg" alt="create icon">
    </td>
</tr>
    `;

        document.querySelector('#display').innerHTML = innerHtml;

    }
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