/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import Pagination from '@mui/material/Pagination'

import './App.css'

function App() {
  const [playerData, setPlayerData] = useState([{}])
  const [currentPlayers, setCurrentPlayers] = useState([{}]);
  const [sorting, setSorting] = useState({ key: '', ascending: null });

  const pageItemCount = 15
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch("/players").then(
      res => res.json()
    ).then(
      data => {
        setPlayerData(data)
        setPageCount(Math.ceil(data.length / pageItemCount))
        setCurrentPlayers(data.slice(0, pageItemCount))
      }
    ).catch((err) => {
      console.log(err.message)
    })
  }, [])

  function applySorting(key, ascending) {
      setSorting({ key: key, ascending: ascending });

      const playerDataCopy = [...playerData];

      // NOTE: Sometimes doesn't sort decimals correctly, FTA for example
      const sortedPlayerData = playerDataCopy.sort((a, b) => {
        const diff = a[key] - b[key]
        if (diff === 0) {
          return a['player'].localeCompare(b['player'])
        } else {
          return diff
        }
      });
      setPlayerData(sortedPlayerData)

      let currentPlayerCopy = []
      const startItem = ((currentPage - 1) * pageItemCount) + 1

      if (sorting.ascending) {
        currentPlayerCopy = [...sortedPlayerData.slice(startItem - 1, (pageItemCount * currentPage))]
      } else {
        currentPlayerCopy = [...sortedPlayerData.reverse().slice(startItem - 1, (pageItemCount * currentPage))]
      }

      setCurrentPlayers(currentPlayerCopy);
  }

  const changePage = (i) => {
      setCurrentPage(i)
      const startItem = ((i - 1) * pageItemCount) + 1
      setCurrentPlayers(playerData.slice(startItem - 1, (pageItemCount * i)))
  }

  const handleChange = (event, value) => {
      changePage(value);
  }

  return (
    <div className='main-view'>
      <div className='logo'>
        <h1>NBA Stats</h1>
      </div>
      <div className='table-view'>
        <table>
          <thead>
            <tr>
              <th className='table-header'></th>
              <th className='table-header'>Player</th>
              <th className='table-header'>Position</th>
              <th className='table-header' onClick={() => applySorting('age', !sorting.ascending)}>Age</th>
              <th className='table-header' onClick={() => applySorting('offensiveReboundsPerGame', !sorting.ascending)}>ORB</th>
              <th className='table-header' onClick={() => applySorting('defensiveReboundsPerGame', !sorting.ascending)}>DRB</th>
              <th className='table-header' onClick={() => applySorting('totalReboundsPerGame', !sorting.ascending)}>TRB</th>
              <th className='table-header' onClick={() => applySorting('blocksPerGame', !sorting.ascending)}>BLK</th>
              <th className='table-header' onClick={() => applySorting('stealsPerGame', !sorting.ascending)}>STL</th>
              <th className='table-header' onClick={() => applySorting('assistsPerGame', !sorting.ascending)}>AST</th>
              <th className='table-header' onClick={() => applySorting('turnoversPerGame', !sorting.ascending)}>TOV</th>
              <th className='table-header' onClick={() => applySorting('personalFoulsPerGame', !sorting.ascending)}>PF</th>
              <th className='table-header' onClick={() => applySorting('fieldGoalsPerGame', !sorting.ascending)}>FG</th>
              <th className='table-header' onClick={() => applySorting('fieldGoalAttemptsPerGame', !sorting.ascending)}>FGA</th>
              <th className='table-header' onClick={() => applySorting('fieldGoalPercentage', !sorting.ascending)}>FG%</th>
              <th className='table-header' onClick={() => applySorting('threePointFieldGoalsPerGame', !sorting.ascending)}>3P</th>
              <th className='table-header' onClick={() => applySorting('threePointFieldGoalAttemptsPerGame', !sorting.ascending)}>3PA</th>
              <th className='table-header' onClick={() => applySorting('threePointFieldGoalPercentage', !sorting.ascending)}>3P%</th>
              <th className='table-header' onClick={() => applySorting('twoPointFieldGoalsPerGame', !sorting.ascending)}>2P</th>
              <th className='table-header' onClick={() => applySorting('twoPointFieldGoalAttemptsPerGame', !sorting.ascending)}>2PA</th>
              <th className='table-header' onClick={() => applySorting('twoPointFieldGoalPercentage', !sorting.ascending)}>2P%</th>
              <th className='table-header' onClick={() => applySorting('effectiveFieldGoalPercentage', !sorting.ascending)}>eFG%</th>
              <th className='table-header' onClick={() => applySorting('freeThrowsPerGame', !sorting.ascending)}>FT</th>
              <th className='table-header' onClick={() => applySorting('freeThrowAttemptsPerGame', !sorting.ascending)}>FTA</th>
              <th className='table-header' onClick={() => applySorting('freeThrowPercentage', !sorting.ascending)}>FT%</th>
              <th className='table-header' onClick={() => applySorting('pointsPerGame', !sorting.ascending)}>PTS</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((item, index) =>
              <tr key={index} className={index % 2 === 0 ? 'row-odd table-body' : 'row-even table-body'}>
                <td className='table-entry'>{item.team}</td>
                <td className='table-entry'>{item.player}</td>
                <td className='table-entry'>{item.position}</td>
                <td className='table-entry'>{item.age}</td>
                <td className='table-entry'>{item.offensiveReboundsPerGame}</td>
                <td className='table-entry'>{item.defensiveReboundsPerGame}</td>
                <td className='table-entry'>{item.totalReboundsPerGame}</td>
                <td className='table-entry'>{item.blocksPerGame}</td>
                <td className='table-entry'>{item.stealsPerGame}</td>
                <td className='table-entry'>{item.assistsPerGame}</td>
                <td className='table-entry'>{item.turnoversPerGame}</td>
                <td className='table-entry'>{item.personalFoulsPerGame}</td>
                <td className='table-entry'>{item.fieldGoalsPerGame}</td>
                <td className='table-entry'>{item.fieldGoalAttemptsPerGame}</td>
                <td className='table-entry'>{item.fieldGoalPercentage}</td>
                <td className='table-entry'>{item.threePointFieldGoalsPerGame}</td>
                <td className='table-entry'>{item.threePointFieldGoalAttemptsPerGame}</td>
                <td className='table-entry'>{item.threePointFieldGoalPercentage}</td>
                <td className='table-entry'>{item.twoPointFieldGoalsPerGame}</td>
                <td className='table-entry'>{item.twoPointFieldGoalAttemptsPerGame}</td>
                <td className='table-entry'>{item.twoPointFieldGoalPercentage}</td>
                <td className='table-entry'>{item.freeThrowsPerGame}</td>
                <td className='table-entry'>{item.freeThrowAttemptsPerGame}</td>
                <td className='table-entry'>{item.freeThrowPercentage}</td>
                <td className='table-entry'>{item.effectiveFieldGoalPercentage}</td>
                <td className='table-entry'>{item.pointsPerGame}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination className='pagination-bar' dir='ltr' page={currentPage} count={pageCount} onChange={handleChange} variant='outlined' shape='rounded' />
      </div>
    </div>
  )
}

export default App