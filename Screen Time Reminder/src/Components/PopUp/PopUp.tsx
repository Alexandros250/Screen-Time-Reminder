import React from 'react';
import { Toaster, toast } from 'sonner';
import MyImage from '../MyImage/MyImage';

let currentTimeSpend = 0;

interface PopUpProps {
  onClick: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClick }) => {
  const timeToAppear: number = 5000;
  const notification = () => {
    setInterval(() => {
      currentTimeSpend += 30;
      if (currentTimeSpend <= 59) {
        toast(`Used ${Math.floor(currentTimeSpend)} min`, { duration: 5000, icon: <MyImage />, position: "top-center", style: { display: 'flex', scale: 1.4, justifyContent: 'center', alignItems: 'center', gap: '15px' } });
      } else if (currentTimeSpend % 60 === 0) {
        toast(`Used ${Math.floor(currentTimeSpend / 60)}h`, { duration: 5000, icon: <MyImage />, position: "top-center", style: { display: 'flex', scale: 1.4, justifyContent: 'center', alignItems: 'center', gap: '15px' } });
      } else {
        toast(`Used ${Math.floor(currentTimeSpend / 60)}h and ${(currentTimeSpend % 60)} min`, { duration: 5000, icon: <MyImage />, position: "top-center", style: { display: 'flex', scale: 1.4, justifyContent: 'center', alignItems: 'center', gap: '15px' } });
      }
    }, timeToAppear);
  };

  return (
    <div>
      <button onClick={notification}>Show Toast</button>
      <button onClick={onClick}>Click me</button>
      <Toaster />
    </div>
  );
};

export default PopUp;