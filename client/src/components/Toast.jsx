import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, autoClose = 3000 }) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const bgColor = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
  }[type] || 'bg-gray-50 border-gray-200 text-gray-700';

  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  }[type] || '•';

  return (
    <div className={`fixed top-4 right-4 max-w-sm p-4 border rounded-lg ${bgColor} shadow-lg animate-in slide-in-from-top-2 duration-300 z-50 flex items-center gap-3`}>
      <span className="text-lg font-bold">{icon}</span>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="text-lg font-bold opacity-60 hover:opacity-100">✕</button>
    </div>
  );
};

export default Toast;
