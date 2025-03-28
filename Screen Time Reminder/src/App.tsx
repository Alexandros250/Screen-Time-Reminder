import PopUp from './Components/PopUp/PopUp';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const onClick = async () => {
    function injectedFunction() {
      return(
      <>
    <PopUp />
      </>
)}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target : {tabId : tab.id!},
    func : injectedFunction,
  });
});
  }
  return (
    <>
    <button onClick={onClick}>Apasa-ma</button>
    </>
  );
}

export default App;
