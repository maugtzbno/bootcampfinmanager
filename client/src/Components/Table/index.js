import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import API from "../../utils"

export default function MaterialTableDemo(props) {
  // const x = API.getPortsF();
  // console.log(x.data);
  // const [state, setState] = React.useState(x.data);
  // API.getPortsF().then(x =>{
  //   console.log(x.data)
  // })

  const [state, setState] = useState([]);
  useEffect(() => {
    API.getPortsF(props.selectPort).then(x => {
        console.log("selec Port",props.selectPort)
        console.log("formatted", x)
        setState(x.data)
    });
}, [props.selectPort]
);

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}