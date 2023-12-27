import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Switch,
  Chip,
} from '@mui/material';

export function ToyTable({ toys }) {
  console.log('ToyTable  toys:', toys)
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleSelectToy = (toyId) => {
    // Implement your logic to handle individual toy selection
    console.log('Selected toy:', toyId);
  };

  return (
    <TableContainer component={Paper}>
      <Table className='toys-table' aria-label='toy table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                    inputProps={{ 'aria-label': 'select all toys' }}
                  />
                }
                style={{ paddingLeft: '11px' }}
              />
            </TableCell>
            <TableCell style={{ textAlign: 'starts'}}>Img</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Inventory</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Markets</TableCell>
            <TableCell>Sales channels</TableCell>
            <TableCell>Vendor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {toys.map((toy) => (
            <TableRow key={toy.id}>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={() => handleSelectToy(toy.id)}
                  inputProps={{ 'aria-label': `select toy ${toy.id}` }}
                />
              </TableCell>
              {/* Implement your actions column */}
              <TableCell><img src={toy.img} style={{ width: '50px' }}></img></TableCell>
              <TableCell>{toy.name}</TableCell>
              <TableCell><Chip label="active" color="success" /></TableCell>
              <TableCell>{toy.inStock}</TableCell>
              <TableCell>{toy.labels.join(', ')}</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
