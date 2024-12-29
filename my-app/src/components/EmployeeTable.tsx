import React, { useState } from 'react';
import { Employee } from '../App';

interface EmployeeTableProps {
  employees: Employee[];
  onUpdate: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof Employee>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter employees by search term
  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort employees by selected key
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSortOrder = (key: keyof Employee) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editPosition, setEditPosition] = useState('');

  const startEditing = (employee: Employee) => {
    setEditId(employee.id);
    setEditName(employee.name);
    setEditDepartment(employee.department);
    setEditPosition(employee.position);
  };

  const saveChanges = () => {
    if (editId !== null) {
      onUpdate({
        id: editId,
        name: editName,
        department: editDepartment,
        position: editPosition,
      });
      cancelEditing();
    }
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditName('');
    setEditDepartment('');
    setEditPosition('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #808080',
          width: '100%',
        }}
      />

      <table className="employee-table">
        <thead>
          <tr>
            <th onClick={() => toggleSortOrder('name')}>
              Name {sortKey === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => toggleSortOrder('department')}>
              Department {sortKey === 'department' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => toggleSortOrder('position')}>
              Position {sortKey === 'position' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.id}>
              {editId === employee.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editDepartment}
                      onChange={(e) => setEditDepartment(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editPosition}
                      onChange={(e) => setEditPosition(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={saveChanges}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <button onClick={() => startEditing(employee)}>Edit</button>
                    <button onClick={() => onDelete(employee.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
