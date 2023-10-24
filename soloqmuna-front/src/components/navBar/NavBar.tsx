import './navBar.css';
import { GiRank3 } from 'react-icons/gi';

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="left-section">
        <img src="/img/logo.png" alt="Logo" />
        <div className="separator"></div>
        <h1>SoloQmuna Challenge</h1>
      </div>

      <div className="center-section">
        <GiRank3 size={50} />
        <h3>Ranking</h3>
      </div>

      <div className="right-section">
        <select>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

    </div>
  );
};
