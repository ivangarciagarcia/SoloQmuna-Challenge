import { NavBar } from 'src/components/navBar/NavBar';
import { Portrait } from 'src/components/portrait/Portrait';
import './home.css';
import { Tabla } from '../../components/tabla/Tabla';

export const Home = () => {
  return (
    <div>
      <NavBar img={'/img/logo.png'} alt={'logo'} item1={'SoloQmunaChallenge'} />
      <section className="portraits">
        <Portrait src={'/img/jvs.png'} />
        <Portrait src={'/img/harry.png'} />
      </section>

      <section className="content">
        <Tabla />
      </section>
    </div>
  );
};
