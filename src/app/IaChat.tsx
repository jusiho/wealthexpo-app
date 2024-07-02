"use client";
import { useEffect, useRef, useState } from "react";
import { set } from "zod";
import { remark } from "remark";
import html from "remark-html";

type Message = {
  system: string;
  content: string;
};

export default function IaChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState([
    [
      "system",
      "Hola, Haz una pregunta sobre WealthExpo, ¿En qué puedo ayudarte?",
    ],
  ]);
  const [loading, setLoading] = useState(false);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (message === "") return;
    setHistory((oldHistory) => [...oldHistory, ["user", message]]);
    setMessage("");
    setLoading(true);
    console.log(history);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        context: history,
      }),
    });

    const data = await response.json();
    const gptMessage = data.response;

    const processedMessage = await processMarkdown(gptMessage);
    setHistory((oldHistory) => [...oldHistory, ["system", processedMessage]]);
    setLoading(false);
  };

  const processMarkdown = async (markdown: string) => {
    const result = await remark().use(html).process(markdown);
    return result.toString();
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-2 mr-4">
        <button
          onClick={() => setOpen(!open)}
          id="open-chat"
          className="gap-2 bg-black border border-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 flex items-center"
        >
          {open ? (
            <>
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="2em"
                width="2em"
              >
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
              </svg>
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="2em"
                width="2em"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4.929 19.071A9.969 9.969 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10H2l2.929-2.929zM8 13a4 4 0 108 0H8z" />
              </svg>
              Chat with Wealthy Bot
            </>
          )}
        </button>
      </div>

      <div
        id="chat-container"
        className={`${open ? "" : "hidden"} fixed bottom-16 right-4 w-96`}
      >
        <div className="bg-gray-700 border border-gray-700 shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-black border border-gray-600 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1.5em"
                width="1.5em"
              >
                <path d="M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73A2 2 0 1010 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 002 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1M9.79 16.5C9.4 15.62 8.53 15 7.5 15s-1.9.62-2.29 1.5c-.13-.31-.21-.64-.21-1a2.5 2.5 0 015 0c0 .36-.08.69-.21 1m9 0c-.39-.88-1.29-1.5-2.29-1.5s-1.9.62-2.29 1.5c-.13-.31-.21-.64-.21-1a2.5 2.5 0 015 0c0 .36-.08.69-.21 1z" />
              </svg>
              <p className="text-lg font-semibold">Wealthy Bot</p>
            </div>
            <button
              id="close-chat"
              onClick={() => setOpen(!open)}
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div
            id="chatbox"
            ref={chatboxRef}
            className="p-4 h-80 overflow-y-auto"
          >
            {history.map((m, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    m[0] === "system" ? "text-left" : "text-right"
                  }`}
                >
                  <div
                    className={`mb-2 ${
                      m[0] === "system"
                        ? "bg-[#05fd5f] text-black"
                        : "bg-gray-200 text-gray-800"
                    } inline-block rounded-lg p-2`}
                    dangerouslySetInnerHTML={{ __html: m[1] }}
                  />
                </div>
              );
            })}
            {loading && (
              <div className="text-left">
                <div className="mb-2 bg-[#05fd5f] text-black inline-block rounded-lg p-2">
                  <div className="flex gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                    loading...
                  </div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="bg-black p-4 border-t flex">
            <input
              value={message}
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              id="send-button"
              className="bg-[#05fd5f] text-black px-4 py-2 rounded-r-md hover:bg-[#05fd5f] transition duration-300"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
