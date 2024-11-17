import React from 'react';
import { Loader2 } from 'lucide-react';

const PlayerCheck = ({ 
  playerToCheck, 
  setPlayerToCheck, 
  isChecking, 
  onCheck, 
  onKeyPress 
}) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Check if player exists..."
        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={playerToCheck}
        onChange={(e) => setPlayerToCheck(e.target.value)}
        onKeyPress={onKeyPress}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 whitespace-nowrap"
        onClick={onCheck}
        disabled={isChecking || !playerToCheck.trim()}
      >
        {isChecking ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Checking...
          </div>
        ) : (
          'Check Player'
        )}
      </button>
    </div>
  );
};

export default PlayerCheck;