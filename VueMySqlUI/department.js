
//NEED TO USE BACKTICK ` HERE NOT APOS '
const department={template:`

<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
Add Department
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            <!--<div class="d-flex flex-row">

            <input class="form-control m-2"
                v-model="DepartmentIdFilter"
                v-on:keyup="FilterFn()"
                placeholder="Filter">
            </div>-->
            DepartmentId
        </th>
        <th>
            <!--<div class="d-flex flex-row">

            <input class="form-control m-2"
                v-model="DepartmentNameFilter"
                v-on:keyup="FilterFn()"
                placeholder="Filter">
            </div>-->
            DepartmentName
        </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="dep in departments">
        <td>{{dep.DepartmentId}}</td>
        <td>{{dep.DepartmentName}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(dep)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <!--Delete button trash with deleteClick call-->
            <button type="button" @click="deleteClick(dep.DepartmentId)"
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

        <div class="input-group mb-3">
            <!--add text box for department Name-->
            <span class="input-group-text">Department Name</span>
            <input type="text" class="form-control" v-model="DepartmentName">
        </div>

        <!--create buttons for new department and update dep-->
        <!--Add department button-->
        <button type="button" @click="createClick()"
        v-if="DepartmentId==0" class="btn btn-primary">
        Create
        </button>
        <!--Edit department button-->
        <button type="button" @click="updateClick()"
        v-if="DepartmentId!=0" class="btn btn-primary">
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
        modalTitle:"",
        DepartmentName:"",
        DepartmentId:0,
        DepartmentNameFilter:"",
        DepartmentIdFilter:"",
        departmentsWithoutFilter:[]
    }
},

//get the data from the Departments MySQL db, through the launched API
methods:{
    refreshData(){
        axios.get(variables.API_URL+"/Department")
        .then((response)=>{
            this.departments = response.data;
            this.departmentsWithoutFilter=response.data;
        });
    },
    //Create Add Department button - style with css
    addClick(){
        this.modalTitle="Add Department";
        this.DepartmentId=0;
        this.DepartmentName="";
    },
    //Create edit department button (pencil-square) style with css
    editClick(dep){
        this.modalTitle="Edit Department";
        this.DepartmentId=dep.DepartmentId;
        this.DepartmentName=dep.DepartmentName;
    },
    //add function to AddClick+Add Department button to actually post
    createClick(){
        axios.post(variables.API_URL+"/Department",{
            DepartmentName:this.DepartmentName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
            
        });
    },
    //add function to UpdateClick+ Edit Department button to actually put
    updateClick(){
        axios.put(variables.API_URL+"/Department",{
            DepartmentId:this.DepartmentId,
            DepartmentName:this.DepartmentName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
            
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        //Add delete function to trash css button, needed to add "s" to end of id for correct URL, need to research why that was.
        axios.delete(variables.API_URL+"/Department/"+id+"s")
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
     //messed with filter functionality, need to learn more how to implement in Vue3
    /*FilterFn(){
        var DepartmentIdFilter=this.DepartmentIdFilter + "";
        var DepartmentNameFilter=this.DepartmentNameFilter + "";

        this.departments=this.departmentsWithoutFilter + "";
           
                return DepartmentId.filter((DepartmentIdFilter.toString().trim().toLowerCase())
                    
                )&&
                DepartmentName.filter((DepartmentNameFilter.toString().trim().toLowerCase()))
                
            
            
    },*/

},

//lifecycle hook to refresh data after mounting
mounted:function(){
    this.refreshData();
}

} 