import {getConnection, sql, queries} from '../database'


export const getEmployees = async (req,res) => {
    try{
        const pool =  await getConnection()
        const result = await pool.request().query(queries.getAllEmployees);
        res.json(result.recordset);
    }
    catch(error){
        res.status(500);
        res.send(error.massage);
    }
    
};

export const createNewEmployee = async (req, res) => {
    const {Name, Email, Mobile, Department} = req.body
    let{HireDate} = req.body
    if(Name == null || Email == null || Mobile == null || Department == null){
        return res.status(400).json({msg:"Bad request. Please fill all fields"});
    }
    
       HireDate = new Date(Date.now()).toString();
    try{
        const pool = await getConnection();
        await pool.request()
        .input("Name", sql.VarChar, Name)
        .input("Email", sql.VarChar, Email)
        .input("Mobile", sql.Int, Mobile)
        .input("Department", sql.VarChar, Department)
        .input("HireDate", sql.Date, HireDate)
        .query(queries.addNewEmployee);
        
        res.json({Name, Email, Mobile, Department , HireDate})
    }
    catch(error){
        res.status(500);
        res.send(error.massage);
    }
};


export const deleteEmployee = async (req,res) => {
    try{

        const pool = await getConnection();
        const result = await pool.request().input("Id", req.params.id).query(queries.deleteEmployee);

        res.sendStatus(204);
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

export const getTotalEmployees = async (req, res) => {
    const pool = await getConnection();
  
    const result = await pool.request().query(queries.getTotalEmployees);
    res.json(result.recordset[0][""]);
  };

  export const getEmployee = async (req, res) => {
    const pool = await getConnection();
  
    const result =  await pool.request().input("Id", req.params.id).query(queries.getEmployeeById);
    res.json(result.recordset[0]);
  };

  export const updateEmployee = async (req,res) =>{

    const {Name, Email, Mobile, Department} = req.body

  if(Name == null || Email == null || Mobile == null || Department == null){
    return res.status(400).json({msg:"Bad request. Please fill all fields"});
}

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("Name", sql.VarChar, Name)
      .input("Email", sql.VarChar, Email)
      .input("Mobile", sql.Int, Mobile)
      .input("Department", sql.VarChar, Department)
      .input("Id", req.params.id)
      .query(queries.updateEmployeeById);
    res.json({ Name, Email, Mobile, Department});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  }
