import PopUp from './Components/PopUp/PopUp';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const onClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id !== undefined) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          console.log("Hello from the page");
        }
      });
    } else {
      console.error("Tab ID is undefined");
    }
  };

  return (
    <>
      <PopUp onClick={onClick} />
    </>
  );
}

export default App;
