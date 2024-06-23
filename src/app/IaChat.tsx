"use client";
import { useChat } from "ai/react";
import { useState } from "react";

export default function IaChat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          onClick={() => setOpen(!open)}
          id="open-chat"
          className=" gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
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
              Chat with Admin Bot
            </>
          )}
        </button>
      </div>

      <div
        id="chat-container"
        className={`${open ? "" : "hidden"} fixed bottom-16 right-4 w-96`}
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Admin Bot</p>
            <button
              id="close-chat"
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
          <div id="chatbox" className="p-4 h-80 overflow-y-auto">
            {messages.map((m) => {
              return m.role === "user" ? (
                <>
                  <div className="mb-2 text-right">
                    <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                      USER :{m.content}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-2">
                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                      IA {m.content}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t flex">
            <input
              value={input}
              type="text"
              onChange={handleInputChange}
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              id="send-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
