import { useState } from 'react';
import { FaWhatsapp, FaTimes, FaListUl } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

interface FaqItem {
  id: number;
  q: string;
  answer: string;
}

export default function WhatsAppWidget() {
  // 1. Declarar TODOS los hooks siempre en el mismo orden y al inicio
  const { role } = useAuth();
  const { isCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showFaqs, setShowFaqs] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '¡Hola! 👋 Bienvenido a DALLT. ¿En qué podemos ayudarte hoy?' }
  ]);

  const [faqs, setFaqs] = useState<FaqItem[]>([
    { 
      id: 1, 
      q: "¿Tienen envíos a provincia?", 
      answer: "Sí, realizamos envíos seguros a todo el país mediante agencias certificadas." 
    },
    { 
      id: 2, 
      q: "¿Cuánto tarda mi pedido personalizado?", 
      answer: "El tiempo estimado es de 2 a 4 días, pero puede cambiar la duración según la cantidad y el tipo de diseño." 
    },
    { 
      id: 3, 
      q: "¿Cómo funciona el personalizador 3D?", 
      answer: "Por el momento, lo que tenemos disponible es una demo: el cliente podrá ver cómo funciona la herramienta de visualización, mas no podrá cargar imágenes propias por ahora." 
    }
  ]);

  // 2. Los retornos condicionales van DESPUÉS de haber declarado todos los hooks
  if (role === 'admin' || isCartOpen) return null;

  const phoneNumber = "51999999999"; 

  const handleSelectFaq = (faq: FaqItem) => {
    setMessages((prev) => [...prev, { sender: 'user', text: faq.q }]);
    setFaqs((prev) => prev.filter((item) => item.id !== faq.id));
    setShowFaqs(false);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: faq.answer }
      ]);
    }, 500);
  };

  const redirectToWhatsApp = () => {
    const lastUserQuery = messages.filter(m => m.sender === 'user').pop()?.text || "Hola DALLT, tengo una consulta.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lastUserQuery)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block select-none">
      {/* Ventana de Chat */}
      {isOpen && (
        <div className="mb-4 w-80 bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col h-[420px]">
          
          <div className="bg-zinc-900 px-5 py-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <div>
                <h4 className="font-bold text-sm text-white">Soporte DALLT</h4>
                <p className="text-[10px] text-gray-400">Responde al instante</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition p-1"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                  msg.sender === 'bot'
                    ? 'bg-white/5 border border-white/5 text-gray-300 self-start rounded-tl-sm'
                    : 'bg-green-600 text-white self-end rounded-tr-sm shadow-md'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {showFaqs && faqs.length > 0 && (
            <div className="p-3 bg-zinc-900 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Selecciona una duda:
                </span>
                <button 
                  onClick={() => setShowFaqs(false)}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-1.5 max-h-28 overflow-y-auto">
                {faqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleSelectFaq(faq)}
                    className="text-left text-[11px] p-2.5 rounded-xl bg-white/5 hover:bg-green-500/10 border border-white/5 hover:border-green-500/30 text-gray-300 hover:text-green-400 transition flex items-center justify-between"
                  >
                    <span className="truncate">{faq.q}</span>
                    <span className="text-gray-500">›</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-zinc-900 border-t border-white/10 flex items-center gap-2">
            {faqs.length > 0 && (
              <button
                onClick={() => setShowFaqs(!showFaqs)}
                className={`p-3 rounded-xl border transition flex items-center justify-center ${
                  showFaqs 
                    ? 'bg-green-600 border-green-500 text-white shadow-lg' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title="Ver consultas rápidas"
              >
                <FaListUl size={14} />
              </button>
            )}

            <button
              onClick={redirectToWhatsApp}
              className="flex-1 py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-xs tracking-wide uppercase transition flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
            >
              <FaWhatsapp size={14} />
              <span>Ir a WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-xl shadow-green-900/40 transition-transform hover:scale-110 flex items-center justify-center group relative"
        title="Abrir chat de asistencia"
      >
        <FaWhatsapp size={28} />
        <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-green-600" />
      </button>
    </div>
  );
}