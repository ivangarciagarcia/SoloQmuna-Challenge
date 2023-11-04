import axios from 'axios';
import './tabla.css';

import React from 'react';

export const Tabla = () => {
  const apiKey = 'RGAPI-e0d9bfdd-70d9-4ed6-946f-e934da489a8c';
  const region = 'euw1';
  const summonerNames = ['Iviornn', 'Miguelonso117', 'πόδια'];

  const getSummonerEncyptedName = async (summonerName: string) => {
    try {
      const response = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
          headers: {
            'X-Riot-Token': apiKey,
          },
        }
      );
      return response.data.id;
    } catch (error) {
      return 'Error al obtener el ID del invocador' + error;
    }
  };

  const getSummonerStats = async (summonerId: any) => {
    try {
      const response = await axios.get(
        `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
          headers: {
            'X-Riot-Token': apiKey,
          },
        }
      );

      if (Array.isArray(response.data)) {
        const rankedSoloStats = response.data.filter(
          (entry) => entry.queueType === 'RANKED_SOLO_5x5'
        );
        // Ahora `rankedSoloStats` contiene solo los datos con queueType "RANKED_SOLO_5x5"
        console.log(rankedSoloStats);
      }
    } catch (error) {
      return 'Error al obtener las estadísticas del jugador' + error;
    }
  };

  const processSummoners = async () => {
    const summonerIds = [];

    for (const summonerName of summonerNames) {
      const summonerId = await getSummonerEncyptedName(summonerName);
      if (summonerId) {
        summonerIds.push(summonerId);
      }
    }

    await Promise.all(
      summonerIds.map((summonerId) => getSummonerStats(summonerId))
    );
  };

  // Llama a la función para procesar los invocadores
  processSummoners();

  interface Persona {
    nombre: string;
    rol1: string;
    rol2: string;
    rol3: string;
    cuenta: string;
    elo: string;
    games: string;
    wins: string;
    loses: string;
    winrate: string;
    opgg: string;
  }

  const personas: Persona[] = [
    {
      nombre: 'Garcia',
      rol1: './img/roles/top_high.png',
      rol2: './img/roles/mid_high.png',
      rol3: './img/roles/jgl_high.png',
      cuenta: 'Iviornn',
      elo: '',
      games: '',
      wins: '',
      loses: '',
      winrate: '',
      opgg: 'https://www.op.gg/summoners/euw/Iviornn',
    },
    {
      nombre: 'Miguel',
      rol1: './img/roles/top_high.png',
      rol2: './img/roles/jgl_high.png',
      rol3: './img/roles/mid_high.png',
      cuenta: 'Miguelonso117',
      elo: '',
      games: '',
      wins: '',
      loses: '',
      winrate: '',
      opgg: 'https://www.op.gg/summoners/euw/Miguelonso117',
    },
    {
      nombre: 'Andres',
      rol1: './img/roles/mid_high.png',
      rol2: './img/roles/jgl_high.png',
      rol3: './img/roles/adc_high.png',
      cuenta: 'πόδια',
      elo: '',
      games: '',
      wins: '',
      loses: '',
      winrate: '',
      opgg: 'https://www.op.gg/summoners/euw/πόδια',
    },
  ];

  const TableRow: React.FC<{ persona: Persona }> = ({ persona }) => (
    <tr>
      <td></td>
      <td>{persona.nombre}</td>
      <td>
        <img src={persona.rol1} alt="Main rol" />
      </td>
      <td>
        <img src={persona.rol2} alt="Second rol" />
      </td>
      <td>
        <img src={persona.rol3} alt="Third rol" />
      </td>
      <td>{persona.cuenta}</td>
      <td>{persona.elo}</td>
      <td>{persona.games}</td>
      <td>{persona.wins}</td>
      <td>{persona.loses}</td>
      <td>{persona.winrate}</td>
      <td>
        <a href={persona.opgg} target="_blank" rel="noopener noreferrer">
          OPGG
        </a>
      </td>
    </tr>
  );
  return (
    <div className="tabla-container">
      <div className="tabla">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Persona</th>
              <th>Rol 1</th>
              <th>Rol 2</th>
              <th>Rol 3</th>
              <th>Cuenta</th>
              <th>Elo</th>
              <th>Games</th>
              <th>Wins</th>
              <th>Loses</th>
              <th>Winrate</th>
              <th>OP.GG</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona, index) => (
              <TableRow key={index} persona={persona} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
