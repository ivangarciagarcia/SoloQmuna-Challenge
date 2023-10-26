import React from 'react';
import './portrait.css';

interface PortraitProps {
  src: string;
  onClick?: () => void;
}

export const Portrait = ({ src, onClick }: PortraitProps) => {
  return (
    <div className="portrait" onClick={onClick}>
      <img className="photo" src={src} alt="Foto" />
    </div>
  );
};
