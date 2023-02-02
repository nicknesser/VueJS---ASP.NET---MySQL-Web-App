using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;
using VueMySqlAPI.Models;


namespace VueMySqlAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {

       

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]

        public JsonResult Get()
        {
            //using raw query, can use stored procedures here or EF
            string query = @"
            select EmployeeId,EmployeeName,Department,
            DATE_FORMAT(DateOfJoining, '%Y-%m-%d') as DateOfJoining,
            PhotoFileName from 
            vjsnetmysql.Employee;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]

        public JsonResult Post(Employee emp)
        {
            //using raw query, can use stored procedures here or EF
            string query = @"
            insert into vjsnetmysql.Employee (EmployeeName,Department,DateOfJoining,PhotoFileName) 
            values
           (@EmployeeName,@Department,@DateOfJoining,@PhotoFileName);";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeName", emp.EmployeeName);
                    myCommand.Parameters.AddWithValue("@Department", emp.Department);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", emp.PhotoFileName);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Added Successfully!");
        }


        [HttpPut]

        public JsonResult Put(Employee emp)
        {
            //using raw query, can use stored procedures here or EF
            string query = @"
            update vjsnetmysql.Employee set 
            EmployeeName = @EmployeeName,
            Department = @Department,
            DateOfJoining = @DateOfJoining,
            PhotoFileName = @PhotoFileName
            where EmployeeId = @EmployeeId;
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {

                    myCommand.Parameters.AddWithValue("@EmployeeId", emp.EmployeeId);
                    myCommand.Parameters.AddWithValue("@EmployeeName", emp.EmployeeName);
                    myCommand.Parameters.AddWithValue("@Department", emp.Department);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", emp.PhotoFileName);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Updated Successfully!");
        }


        [HttpDelete("{id}s")]

        public JsonResult Delete(int id)
        {
            //using raw query, can use stored procedures here or EF
            string query = @"
            delete from vjsnetmysql.Employee
            where EmployeeId = @EmployeeId;
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {

                    myCommand.Parameters.AddWithValue("@EmployeeId", id);



                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }

        /*[HttpPost]
        [Route(nameof(UploadFile))]
        
        public FileUploadResult UploadFile()
        {
            return;
        }*/





        
        [HttpPost]
        [Route("SaveFile")]

        public JsonResult SaveFile()
        {
            try
            {
                
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create)) 
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);

            }
            catch(Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }



    }
}
