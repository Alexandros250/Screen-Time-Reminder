import "../css/ArrowButton.css";

function ArrowButtonRight() {
  function returnPlus() {
    return chrome.storage.local.set({ symbol: "+", updatedAt: Date.now() });
  }

  return (
    <>
      <li
        className="icon black"
        title="+ Minutes"
        aria-label="+ Minutes"
        onClick={returnPlus}
      >
        <span className="tooltip">+</span>
        <span>
          <svg
            viewBox="0 0 16 16"
            className="bi bi-chevron-double-right"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              fill-rule="evenodd"
            ></path>
            <path
              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </span>
      </li>
    </>
  );
}

export default ArrowButtonRight;
