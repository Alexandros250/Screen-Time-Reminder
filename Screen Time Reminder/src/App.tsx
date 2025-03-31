import PopUp from './Components/PopUp/PopUp';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const element:HTMLElement | null = document.getElementById("btn");

element?.addEventListener("click", () => {
    chrome.runtime.sendMessage({ time : "1" }, function (response) {
        console.log(response);
    });
});



  return (
    <>
      <PopUp />
    </>
  );
}

export default App;
