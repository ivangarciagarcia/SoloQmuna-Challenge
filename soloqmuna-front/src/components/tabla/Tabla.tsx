import axios from 'axios';
import './tabla.css';
import { API_KEY } from './../../config/config';
import React, { useEffect, useState } from 'react';

export const Tabla = () => {
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

  const region = 'euw1';
  const summonerNames = ['Iviornn', 'Miguelonso117', 'πόδια', 'Faranduleiro', 'Demeter06', 'βυζιά'];
  const [personas, setPersonas] = useState<Persona[]>([
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
    {
      nombre: 'Gabriel',
      rol1: './img/roles/adc_high.png',
      rol2: './img/roles/sup_high.png',
      rol3: './img/roles/top_high.png',
      cuenta: 'Faranduleiro',
      elo: '',
      games: '',
      wins: '',
      loses: '',
      winrate: '',
      opgg: 'https://www.op.gg/summoners/euw/Faranduleiro',
    },
    {
      nombre: 'Ivan Glez',
      rol1: './img/roles/jgl_high.png',
      rol2: './img/roles/top_high.png',
      rol3: '',
      cuenta: 'Demeter06',
      elo: '',
      games: '',
      wins: '',
      loses: '',
      winrate: '',
      opgg: 'https://www.op.gg/summoners/euw/Demeter06',
    },
    {
      nombre: 'Hugo Orbe',
      rol1: './img/roles/adc_high.png',
      rol2: './img/roles/mid_high.png',
      rol3: '',
      cuenta: 'βυζιά',
      elo: '',
      games: '',
      wins: '',
      loses: '',
      winrate: '',
      opgg: 'https://www.op.gg/summoners/euw/βυζιά',
    },
  ]);


  // Función para actualizar los datos de una persona
  const updatePersona = (index: number, data: Partial<Persona>) => {
    setPersonas((prevPersonas) =>
      prevPersonas.map((persona, i) =>
        i === index ? { ...persona, ...data } : persona
      )
    );
  };

  // Función para conseguir el nombre de invocador encriptado
  const getSummonerEncyptedName = async (summonerName: string) => {
    try {
      const response = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
          headers: {
            'X-Riot-Token': API_KEY,
          },
        }
      );
      return response.data.id;
    } catch (error) {
      return 'Error al obtener el ID del invocador' + error;
    }
  };

  // Función para conseguir las estadisticas del invocador
  const getSummonerStats = async (summonerId: any, index: number) => {
    try {
      const response = await axios.get(
        `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
          headers: {
            'X-Riot-Token': API_KEY,
          },
        }
      );

      if (Array.isArray(response.data)) {
        const rankedSoloStats = response.data.find(
          (entry) => entry.queueType === 'RANKED_SOLO_5x5'
        );

        // Ahora actualiza los datos del jugador en el estado
        if (rankedSoloStats) {
          updatePersona(index, {
            elo: rankedSoloStats.tier + ' ' + rankedSoloStats.rank + '  (' + rankedSoloStats.leaguePoints + 'LP)',
            games: rankedSoloStats.wins + rankedSoloStats.losses,
            wins: rankedSoloStats.wins,
            loses: rankedSoloStats.losses,
            winrate:
              (
                (parseInt(rankedSoloStats.wins) /
                  parseInt(rankedSoloStats.wins + rankedSoloStats.losses)) *
                100
              ).toFixed(2) + '%',
          });
        }
      }
    } catch (error) {
      console.error('Error al obtener las estadísticas del jugador', error);
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

    // Llama a la función para obtener estadísticas de cada invocador
    await Promise.all(
      summonerIds.map((summonerId, index) =>
        getSummonerStats(summonerId, index)
      )
    );
  };

  useEffect(() => {
    // Llama a la función para procesar los invocadores
    processSummoners();
  }, []);

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
      <td>{persona.games !== '' ? persona.games : 'N/A'}</td>
      <td>{persona.wins !== '' ? persona.wins : 'N/A'}</td>
      <td>{persona.loses !== '' ? persona.loses : 'N/A'}</td>
      <td>{persona.winrate !== '' ? persona.winrate : 'N/A'}</td>
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
            {/* Primera fila con datos de la API */}
            <TableRow key={0} persona={personas[0]} />
            {/* Resto de las filas */}
            {personas.slice(1).map((persona, index) => (
              <TableRow key={index + 1} persona={persona} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
