import "../css/ErrorButon.css"

function ErrorButton() {
  const openLink = () => {
    chrome.tabs.create({
      url: "https://answers.microsoft.com/en-us/windows/forum/all/chrome-notification-on-window-11/1bc6b234-08bd-4089-bd6c-b5d6dc23a9ee",
    });
  };

  return <button className="error-button" onClick={openLink}>Error ❌</button>;
}

export default ErrorButton
