import React from 'react';
import { Player } from '../../types/database';

interface PlayerFormProps {
  onSubmit: (data: Partial<Player>) => void;
  initialData?: Partial<Player>;
  isLoading?: boolean;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const playerData: Partial<Player> = {
      Player_Name: formData.get('name') as string,
      Player_Age: parseInt(formData.get('age') as string),
      Player_Team: formData.get('team') as string,
      Player_Role: formData.get('role') as Player['Player_Role'],
      Player_Type: formData.get('type') as Player['Player_Type'],
      Player_DOB: new Date(formData.get('dob') as string),
    };

    onSubmit(playerData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={initialData?.Player_Name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          type="number"
          name="age"
          id="age"
          defaultValue={initialData?.Player_Age}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          name="role"
          id="role"
          defaultValue={initialData?.Player_Role}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Player">Player</option>
          <option value="Captain">Captain</option>
          <option value="Vice-Captain">Vice-Captain</option>
        </select>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          name="type"
          id="type"
          defaultValue={initialData?.Player_Type}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-rounder">All-rounder</option>
        </select>
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          id="dob"
          defaultValue={initialData?.Player_DOB?.toISOString().split('T')[0]}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? 'Saving...' : 'Save Player'}
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;