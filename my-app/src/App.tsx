import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';

export interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
}

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: Date.now() };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="app">
      <h1>Employee Management System</h1>
      <EmployeeForm onAdd={addEmployee} />
      <EmployeeTable
        employees={employees}
        onUpdate={updateEmployee}
        onDelete={deleteEmployee}
      />
    </div>
  );
};

export default App;
