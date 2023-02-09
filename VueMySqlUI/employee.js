//NEED TO USE BACKTICK ` HERE NOT APOS '
const employee={template:`

<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
Add Employee
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            EmployeeId
        </th>
        <th>
            EmployeeName
        </th>
        <th>
            Department
        </th>
        <th>
            DOJ
        </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="emp in employees">
        <td>{{emp.EmployeeId}}</td>
        <td>{{emp.EmployeeName}}</td>
        <td>{{emp.Department}}</td>
        <td>{{emp.DateOfJoining}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(emp)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <!--Delete button trash with deleteClick call-->
            <button type="button" @click="deleteClick(emp.EmployeeId)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
        </td>
    </tr>
</tbody>
</thead>
</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">
    <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 w-50 bd-highlight">
            <div class="input-group mb-3">
                <!--add text box for Employee Name-->
                <span class="input-group-text">Name</span>
                <input type="text" class="form-control" v-model="EmployeeName">
            </div>

            <div class="input-group mb-3">
                <!--add text box for Department and use select instead of input for dropdown menu-->
                <span class="input-group-text">Department</span>
                <select class="form-select" v-model="Department">
                    <option v-for="dep in departments">
                    {{dep.DepartmentName}}
                    </option>
                </select>
            </div>
            <div class="input-group mb-3">
                <!--add text box for Date of Joining-->
                <span class="input-group-text">DOJ</span>
                <input type="date" class="form-control" v-model="DateOfJoining">
            </div>

        </div>
        <!--display profile picture-->
        <div class="p-2 w-50 bd-highlight">
            <img width="250px" height="250px"
                :src="PhotoPath+PhotoFileName"/>
            <input class="m-2" type="file" @change="imageUpload">
        </div>
    </div>
        <!--create buttons for new Employee and update emp-->
        <!--Add Employee button-->
        <button type="button" @click="createClick()"
        v-if="EmployeeId==0" class="btn btn-primary">
        Create
        </button>
        <!--Edit Employee button-->
        <button type="button" @click="updateClick()"
        v-if="EmployeeId!=0" class="btn btn-primary">
        Update
        </button>



    </div>

</div>
</div>
</div>

</div>

`,

data(){
    return{
        departments:[],
        employees:[],
        modalTitle:"",
        EmployeeId:0,
        EmployeeName:"",
        Department:"",
        DateOfJoining:"",
        PhotoFileName:"anonymous.png",
        PhotoPath:variables.PHOTO_URL
       /* attachmentRecord: [{
            id: 1
        }]*/
    }
},

//get the data from the Employees MySQL db, through the launched API
methods:{
    refreshData(){
        axios.get(variables.API_URL+"/Employee")
        .then((response)=>{
            this.employees = response.data;
        });
        axios.get(variables.API_URL+"/Department")
        .then((response)=>{
            this.departments = response.data;
        });
    },
    //Create Add Employee button - style with css
    addClick(){
        this.modalTitle="Add Employee";
        this.EmployeeId=0;
        this.EmployeeName="";
        this.Department="";
        this.DateOfJoining="";
        this.PhotoFileName="";
    },
    //Create edit Employee button (pencil-square) style with css
    editClick(emp){
        this.modalTitle="Edit Employee";
        this.EmployeeId=emp.EmployeeId;
        this.EmployeeName=emp.EmployeeName;
        this.Department=emp.Department;
        this.DateOfJoining=emp.DateOfJoining;
        this.PhotoFileName=emp.PhotoFileName;
    },
    //add function to AddClick+Add Employee button to actually post
    createClick(){
        axios.post(variables.API_URL+"/Employee",{
           EmployeeName:this.EmployeeName,
           Department:this.Department,
           DateOfJoining:this.DateOfJoining,
           PhotoFileName:this.PhotoFileName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
            
        });
    },
    //add function to UpdateClick+ Edit Employee button to actually put
    updateClick(){
        axios.put(variables.API_URL+"/Employee",{
            EmployeeId:this.EmployeeId,
            EmployeeName:this.EmployeeName,
            Department:this.Department,
            DateOfJoining:this.DateOfJoining,
            PhotoFileName:this.PhotoFileName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
            
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
      method  }
        //Add delete function to trash css button, needed to add "s" to end of id for correct URL, need to research why that was.
        axios.delete(variables.API_URL+"/Employee/"+id+"s")
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
    //Upload image method
    imageUpload(event){
        let formData=new FormData();
        formData.append('file',event.target.files[0]);
        axios.post(
            variables.API_URL+"/Employee/SaveFile",
            formData)
            .then((response)=>{
                this.PhotoFileName=response.data;
            })
    }

    /*imageGet(EmployeeId){
        axios.get(PhotoPath+PhotoFileName)
        .then((response)=>{
            this.employees = response.data;
        });
    }*/

    
        /*getAttachmentFromTask(attachmentIndex, attachmentID) {
          let record = this.attachmentRecord[attachmentIndex];
          if (!record.data) {
            Vue.set(record, 'data', null);
            axios.get('https://kunden.48design.de/stackoverflow/image-base64-api-mockup.json').then((result) => {
              Vue.set(record, 'data', result.data);
            });
          }
          return this.attachmentRecord[attachmentIndex].data;
        }*/

},

//lifecycle hook to refresh data after mounting
mounted:function(){
    this.refreshData();
}

} 