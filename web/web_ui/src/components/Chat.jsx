import { useState, useRef, useEffect } from 'react';
import './Chat.css';
import { 
  addBtn, 
  gemini_ai, 
  home ,
  sendBtn,
  userIcon, 
} from "../assets"
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false); 
  const [isGemini, setIsGemini] = useState(true);
  const chatsRef = useRef(null);

  useEffect(() => {
    chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
  }, [messages]);

  const handleNewChat = () => {
    // Reset messages to an empty array
    setMessages([]);
  };


  const sendMessage = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('query', input);

      const response = await fetch('http://127.0.0.1:8181/get_response_rag', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }

      const responseData = await response.json();
      setMessages([
        ...messages,
        { text: input, isUser: true },
        { text: responseData.answer, isUser: false },
        { textContext: responseData.context, isUser: false, isContext: true },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSend = (event) => {
    event.preventDefault();
    sendMessage();
    setInput('');
  };
  
  const sendGeminiMessage = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('query', input);

      const response = await fetch('http://127.0.0.1:8181/get_response', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }

      const responseData = await response.json();
      setMessages([
        ...messages,
        { text: input, isUser: true },
        { text: responseData.answer, isUser: false }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSendGemini = (event) => {
    event.preventDefault();
    sendGeminiMessage();
    setInput('');
  };

  const toggleSwitch = () => {
    setIsGemini((prevIsGemini) => !prevIsGemini);
  };

  return (
    <div className="AppChat">
      <div className="sideBar">
        <div className="upperSide">
        <button className='midBtn' onClick={handleNewChat}> <img src={addBtn} alt='new chat' className='addBtn' />New Chat</button>
        </div>
        <div className="lowerSide">
          <div className='listItems'> <Link to="/"> <img src={home} alt='Home' className='listItemsImg' />Home </Link></div>

        </div>
      </div>
      <div className="main">
      <div className="mb-5 text-2xl font-medium">Welcome to fAInancial Chatbot</div>
      <div className="mb-5 text-2xl font-medium">How can I help you today?</div>
        <div className='chats' ref={chatsRef}>
          {messages.map((message, index) => (
            <div className={message.isUser ? "chat" : "chat bot"} key={index}>
              <img src={message.isUser ? userIcon : gemini_ai} alt='Send' className='chatImg' />
              <p className="txt"> {message.text} </p>
  
              {/* Display additional features if available in responseData */}
              {message.isUser || !message.text ? null : (
                <div className="additionalInfo">

                  {message.context && (
                    <p className={message.isContext ? "contextInfo" : "context"}>Context Information: <ReactMarkdown>{message.context}</ReactMarkdown></p>
                  )}
                </div>
              )}
  
              {/* Display context just under the model response */}
              {message.isContext && (
                <div className="contextMessage">
                  <p className="contextInfo">Source Information:</p>
                  <ReactMarkdown>{message.textContext}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="loadingIndicator">
              
              <i className="fa fa-spinner" aria-hidden="true"></i>
              Loading...
            </div>
          )}
        </div>
        <div className='chatFooter'>
          <div className='inp'>
          <input
            id="userInput"
            type="text"
            className="send"
            placeholder="Send a message ..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === 'Enter' && (isGemini ? handleSendGemini : handleSend)(e);
            }}
          />
          {isGemini ? (
            <button
              id="submitBtn"
              className="send"
              onClick={(event) => {
                handleSendGemini(event);
              }}
              type="submit"
            >
              <img src={sendBtn} alt="Send" />
            </button>
          ) : (
            <button
              id="submitBtn"
              className="send"
              onClick={(event) => {
                handleSend(event);
              }}
              type="submit"
            >
              <img src={sendBtn} alt="Send" />
            </button>
          )}
          {/* Switch button */}
          <button
            id="switchBtn"
            className="send"
            onClick={toggleSwitch}
            type="button"
            style={{ backgroundColor: isGemini ? 'tomato' : '#27ae60' }}
          >
            {isGemini ? 'No Context' : 'Context'}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
