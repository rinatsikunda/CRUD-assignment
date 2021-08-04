export const queries = {
    getAllEmployees: "SELECT * FROM Employees",
    addNewEmployee: "INSERT INTO employees (Name, Email, Mobile ,Department ,HireDate) VALUES (@Name, @Email, @Mobile ,@Department ,@HireDate)",
    deleteEmployee: "DELETE FROM [employees].[dbo].[employees] WHERE Id = @Id",
    getTotalEmployees: "SELECT COUNT(*) FROM [employees].[dbo].[employees]",
    updateEmployeeById: "UPDATE [employees].[dbo].[employees] SET Name = @Name, Email = @Email, Mobile = @Mobile, Department = @Department WHERE Id = @id",
    getEmployeeById: "SELECT * FROM [employees].[dbo].[employees] WHERE Id = @Id"

};