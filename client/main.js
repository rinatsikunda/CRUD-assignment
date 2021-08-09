const url = 'http://localhost:3000/employees';

var popupTitle = document.createElement("div");
var form = document.querySelector(".formForm");
var employeeId = 0;

const getMethod = {
    method: 'GET', 
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
   }


function getEmployees(){
    fetch(url, getMethod)
    .then(res => res.json())
    .catch(err => console.log(err)) 
}

function getEmployeesCount(){
    fetch(url + '/count', getMethod)
    .then(response => response.json())
    .then(data => {
        employeesCount = data;
     }
     )
    .catch(err => console.log(err))
}


function openFormForAdd(action) {
    popupTitle.classList.add("popupTitle");
    popupTitle.innerText = "Add New Employee";
    form.prepend(popupTitle);
    document.getElementById("employeeForm").style.display = "block";
    document.getElementById("submitFormBtn").classList.add("add");
  }

  function openForm(action, elem) {
    var id = elem.id;
    employeeId = id;
    const employeeDetails = fetch(url + '/'+ id, getMethod)
    .then(response => response.json())
    .then(data => {
        document.getElementById("Name").value = data.Name;
        document.getElementById("Email").value = data.Email;
        document.getElementById("Mobile").value = '0' + data.Mobile;
        document.getElementById("Department").value = data.Department;
     })
    .catch(err => console.log(err)) 
    popupTitle.classList.add("popupTitle");
    popupTitle.innerText = "Update Employee";
    form.prepend(popupTitle);
    document.getElementById("employeeForm").style.display = "block";
    document.getElementById("submitFormBtn").classList.add("update");
  }
  
  function closeForm() {
    popupTitle.remove();
    popupTitle.innerText = "";
    document.getElementById("employeeForm").style.display = "none";
    document.getElementById('myform').reset();
    document.getElementById("submitFormBtn").classList.remove("add");
    document.getElementById("submitFormBtn").classList.remove("update");
  }



  
function addEmployee(){ 
   if (document.getElementById("submitFormBtn").classList.contains("add")){
    fetch(url, {
        method: 'POST',
        headers: {
         'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(
            {
                "Name":  document.getElementById("Name").value,
                "Email": document.getElementById("Email").value,
                "Mobile": document.getElementById("Mobile").value,
                "Department": document.getElementById("Department").value
            }
        ), 
       }
        )
       .then(res => res.json())
       .then(data => {
        document.getElementById("submitFormBtn").classList.remove("add");
        location.reload()
       } )
       .catch(err => console.log(err))
   }
   else if(document.getElementById("submitFormBtn").classList.contains("update")){
    fetch(url + '/' + employeeId, {
        method: 'PUT', 
        headers: {
         'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(
            {
                "Name":  document.getElementById("Name").value,
                "Email": document.getElementById("Email").value,
                "Mobile": document.getElementById("Mobile").value,
                "Department": document.getElementById("Department").value
            }
        ), // We send data in JSON format
       }
        )
       .then(res => res.json())
       .then(data => {
        document.getElementById("submitFormBtn").classList.remove("update");
        location.reload();
       } )
       .catch(err => console.log(err)) 
   }
   
}


function deleteEmployee(elem){
    var id = elem.id;
    fetch(url + '/' + id, {
  method: 'DELETE',
})
.then(data => location.reload())
.catch(err => console.log(err)) 
}

function loadEmployees(){
    fetch(url, getMethod)
    .then(res => res.json())
    .then(data => showList(data))
    .catch(err => console.log(err))
}   

   
function showList(list){
    fetch(url + '/count', getMethod)
    .then(response => response.json())
    .then(data => {
        for( var i=0 ;  i<data; i++){
            var employer = list[i];
            var employee = document.createElement("tr");
            var employeeHtml = 
            `<td class=" listItem id"></td>
            <td class="listItem name"></td>
            <td class="listItem email"></td>
            <td class=" listItem mobile"></span>
            <td class="listItem department"></span>
            <td class=" listItem hireDate"></td>
            <td class="btns">
                <button class="col-6 updateBtn" id="` + employer.Id +`" onclick="openForm('update', this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                </button>
                <button class="col-6 deleteBtn" id="` + employer.Id +`" onclick="deleteEmployee(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                      </svg>
                </button>
            </td>`;
            employee.innerHTML = employeeHtml;
            employee.setAttribute("class", "employee");
            employee.setAttribute("Id", employer.Id);
             document.getElementsByClassName('employeesTable')[0].appendChild(employee);
             employee.querySelector('.id').innerText = employer.Id;
             employee.querySelector('.name').innerText = employer.Name;
             employee.querySelector('.email').innerText = employer.Email;
             employee.querySelector('.mobile').innerText = '0' + employer.Mobile;
             employee.querySelector('.department').innerText = employer.Department;
             employee.querySelector('.hireDate').innerText = employer.HireDate.substring(0,10);
        }
     }
     )
    .catch(err => console.log(err)) 
}
  
document.addEventListener("DOMContentLoaded", function () {
    loadEmployees();
});

