import { NavBar } from 'src/components/navBar/NavBar';
import { Portrait } from 'src/components/portrait/Portrait';
import './home.css';

export const Home = () => {
  return (
    <div>
      <NavBar img={'/img/logo.png'} alt={'logo'} item1={'SoloQmunaChallenge'} />
      <section className="portraits">
        <Portrait src={''} />
        <Portrait src={''} />
      </section>
    </div>
  );
};
