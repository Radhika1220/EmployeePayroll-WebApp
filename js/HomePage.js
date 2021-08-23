//UC4-->using template literals-ES6 feature(table)
window.addEventListener('DOMContentLoaded',(event)=>
{
    createInnerHtml();
});

createInnerHtml=()=>
{
    let innerHtml=`<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
</tr>
<tr>
    <td>
        <img class="profile" alt="" src="../assests/profile-images/Ellipse -1.png">
    </td>
    <td>Priya</td>
    <td>Female</td>
    <td>
        <div class="dept-label">HR</div>
        <div class="dept-label">Finance</div>
    </td>
    <td>50000</td>
    <td>12-Aug-2021</td>
    <td>
        <img src="../assests/icons/delete-black-18dp.svg" alt="delete icon">
        <img src="../assests/icons/create-black-18dp.svg" alt="create icon">
    </td>
</tr>
    `;
    document.querySelector('#display').innerHTML=innerHtml;
}