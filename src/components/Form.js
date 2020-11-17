import React, { useState } from 'react';
import ShortestPath from '../ShortestPath';
import DistanceData from './DistanceData';
import Error from './Error';
import graphFinal from "./graphFinal";
import nodesFinal from "./nodesFinal";

function Form() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [graphData, setGraphData] = useState({});
  const [finalFrom, setFinalFrom] = useState('');
  const [finalTo, setFinalTo] = useState('');
  const [error, setError] = useState(false);

  

  async function HandleSubmit() {
    if (!nodesFinal.includes(from) || !nodesFinal.includes(to)) {
      setError(true);
      return;
    }

    const data = await ShortestPath(graphFinal, from, to);
    console.log(data);
    setGraphData(data);
    setFinalFrom(from);
    setFinalTo(to);
    setFrom('');
    setTo('');
    setError(false);
  }

  return (
    <div>
      <div className='form'>
        <input
          type='text'
          placeholder='from'
          onChange={(e) => setFrom(e.target.value)}
          value={from}
        />
        <input
          type='text'
          placeholder='to'
          onChange={(e) => setTo(e.target.value)}
          value={to}
        />
        <button onClick={HandleSubmit} className='btn'>
          Submit
        </button>
      </div>
      {graphData.path && (
        <DistanceData
          path={graphData.path}
          distance={graphData.distance}
          from={finalFrom}
          to={finalTo}
        />
      )}
      {error && <Error />}
    </div>
  );
}

export default Form;
