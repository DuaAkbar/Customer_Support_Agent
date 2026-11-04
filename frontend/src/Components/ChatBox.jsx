import axios from "axios";
import { useRef, useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const bottomRef = useRef(null);

    //handles sending messages
    const handleOnSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            return;
        }
        let newMsgs = {
            role: 'user',
            text: input
        };

        setMessages((messages) => [...messages, newMsgs]);
        setInput("");

        try {
            setIsLoading(true);
            const response = await axios.post(import.meta.env.VITE_API_URL_POST, { sessionId, message: input });
            if (response.data.success) {
                localStorage.setItem('sessionId', response.data.sessionId);
                setSessionId(response.data.sessionId);
                setMessages((messages) => [
                    ...messages,
                    { role: "model", text: response.data.response }
                ]);
            }
        } catch (e) {
            console.log(e.response?.data?.message);
            setMessages((messages) => [...messages, { role: "model", text: e.response?.data?.message || "Could not reach the server, please try again." }]);
        } finally {
            setIsLoading(false);
        }
    }

    //handle on Message fetch
    const handleMsgFetch = async () => {
        try {
            setIsLoading(true);
            const savedSessionId = localStorage.getItem("sessionId");
            if (savedSessionId) {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_GET}${savedSessionId}`);
                console.log("response.data is below:", response.data);

                setMessages(response.data.message);
                setSessionId(response.data.sessionId);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    //handle new Chat
    const handleNewChat = async () => {
        localStorage.removeItem("sessionId");
        setMessages([]);
        setSessionId(null);
        setInput("")
    }
  
    //handle change of input field
    const handleInputChange = (e) => {
    setInput(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
};

    useEffect(() => {
        handleMsgFetch();
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100 p-3 sm:p-6">
            <div className="w-full max-w-2xl h-[80vh] max-h-[680px] min-h-[480px] flex flex-col bg-white/80 backdrop-blur rounded-3xl shadow-xl shadow-teal-900/10 border border-teal-100 overflow-hidden">

                {/* Header */}
                <div className="shrink-0 flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-teal-400 to-emerald-400 text-white">
                    <div className="h-10 w-10 rounded-full bg-white/25 flex items-center justify-center font-semibold">
                        S
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold leading-tight">Saffron &amp; Sage Home Kitchen</p>
                        <p className="text-xs text-teal-50 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-200 inline-block"></span>
                            Online
                        </p>
                    </div>
                    <button
                        onClick={handleNewChat}
                        className="ml-auto rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/30 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        + New chat
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto overflow-x-hidden bg-teal-50/40 px-4 py-4 sm:px-6">
                    {messages.map((msgs, index) => (
                        <ChatBubble key={index} role={msgs.role} text={msgs.text} />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <form onSubmit={(e) => handleOnSend(e)} className="shrink-0">
                    <div className="flex items-end gap-2.5 border-t border-teal-100 bg-white px-4 py-3">
                        <textarea 
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleOnSend(e);
                                }
                            }}
                            rows={1}
                            placeholder="Type your message..."
                            className="flex-1 rounded-full bg-teal-50/60 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-300 resize-none overflow-y-auto max-h-32"
                        />
                        <button
                            type="submit"
                            className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-white flex items-center justify-center shadow hover:from-teal-500 hover:to-emerald-600 active:scale-95 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M3.4 20.4 22 12 3.4 3.6 3.3 10l13 2-13 2z" />
                            </svg>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}