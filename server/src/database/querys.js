export const queries = {
    getAllEmployees: "SELECT * FROM Employees",
    addNewEmployee: "INSERT INTO Employees (Name, Email, Mobile ,Department ,HireDate) VALUES (@Name, @Email, @Mobile ,@Department ,@HireDate)",
    deleteEmployee: "DELETE FROM [Copmany].[dbo].[Employees] WHERE Id = @Id",
    getTotalEmployees: "SELECT COUNT(*) FROM [Copmany].[dbo].[Employees]",
    updateEmployeeById: "UPDATE [Copmany].[dbo].[Employees] SET Name = @Name, Email = @Email, Mobile = @Mobile, Department = @Department WHERE Id = @id",
    getEmployeeById: "SELECT * FROM [Copmany].[dbo].[Employees] WHERE Id = @Id"

};