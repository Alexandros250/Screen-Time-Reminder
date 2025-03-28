import PopUp from './Components/PopUp/PopUp';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const onClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true});
    chrome.scripting.executeScript({
      target: {tabId: tab.id!},
      func: () => {
        alert('Hello from the content script!');
      }
    });
  }
  return (
    <>
      <PopUp />
      <button onClick={onClick}>Apasa-ma</button>
    </>
  );
}

export default App;
