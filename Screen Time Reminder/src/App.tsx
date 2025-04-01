//import PopUp from './Components/PopUp/PopUp';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Text from './Components/Text/Text';
import Button from './Components/Button/Button';


element?.addEventListener("click", () => {
    chrome.runtime.sendMessage({ time : "1" }, function (response) {
        console.log(response);
    });
});

function App() {

  return (
    <>
      <Text />
      <Button />
    </>
  );
}

export default App;
