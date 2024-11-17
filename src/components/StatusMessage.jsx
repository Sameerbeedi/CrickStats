import React from 'react';

const StatusMessage = ({ type, message, onDismiss }) => {
  const styles = {
    error: 'text-red-600 bg-red-50 border-red-200',
    success: 'text-green-800 bg-green-50 border-green-200',
    warning: 'text-yellow-800 bg-yellow-50 border-yellow-200',
  };

  return (
    <div className={`p-4 ${styles[type]} border rounded-md flex items-center justify-between`}>
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-sm hover:underline"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export default StatusMessage;