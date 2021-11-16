import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import ResultList from './components/ResultList';
import Search from './components/Search';
import { MainTable } from './components/Table';
import { NavBar } from './components/NavBar';
import { DataSelection } from './components/DataSelection';
import Card from '@mui/material/Card';

function App () {

  const [results, setResults] = useState([]);
  const [tableData, setTableData] = useState({data:[], cols:[]});
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.log(selectedIndex)

  const search = async (query) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_LOCATION_SERVICE_URL}/location/search`,
        params: {
          query: query
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_LOCATION_SERVICE_URL}/location`)
        .then((response) => {
          const columns = Object.keys(response.data[0]);
          setTableData({data: response.data, cols: columns})
        })
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <div style={{width:'85%', margin:'auto', marginTop: '2%', display:'flex'}}>
        <Card sx={{width: '20%', marginRight: '10px', height: "90vh"}}>
          <div style={{marginLeft:'15px', marginTop:'20px'}}>
            <span style={{color:'#26B0B2', fontWeight:'bold'}}>Select dataset</span>
            <DataSelection />
            <span style={{color:'lightgray'}}>More datasets will be added here in due course</span>
          </div>
        </Card>
        <Card sx={{width: '80%', height:'110vh', flex: '1 1 auto', overflow:'auto'}}>
          <Search search={search} />
          <MainTable data={tableData.data} cols={tableData.cols}/>
          <ResultList results={results}/>
        </Card>
      </div>
    </div>
  );
}

export default App;
