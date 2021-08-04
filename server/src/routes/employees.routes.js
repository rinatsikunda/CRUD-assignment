import { Router } from "express"
import {createNewEmployee, deleteEmployee, getEmployees, getTotalEmployees, updateEmployee, getEmployee} from '../controllers/employees.controller'

const router = Router();


router.get('/employees',getEmployees);

router.post('/employees',createNewEmployee);

router.delete('/employees/:id', deleteEmployee);

router.put('/employees/:id',updateEmployee);

router.get('/employees/count',getTotalEmployees);

router.get('/employees/:id',getEmployee);


export default router