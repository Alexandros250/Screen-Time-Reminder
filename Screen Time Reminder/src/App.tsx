// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import PopUp from '../src/Components/PopUp/PopUp'
import './App.css'
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

//I think I need to use props to pass the function to the PopUp component  
  const onClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true});
if (tab.id !== undefined) {
    chrome.scripting.executeScript<string[], void>({
        target: {tabId: tab.id},
        args: [],
        func: () => {
        console.log("Hello from the page");
    }
});
} else {
    console.error("Tab ID is undefined");
}

}

  return (
    <>
    <PopUp onClick={onClick} />
    </>
  )
}

export default App
