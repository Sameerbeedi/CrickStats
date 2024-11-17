import React from 'react';
import { Loader2 } from 'lucide-react';

const AddPlayerForm = ({ onSubmit, onCancel, isSubmitting }) => {
  const fields = ['Name', 'Age', 'Team', 'Role', 'Type'];

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {field}
          </label>
          <input
            type={field === 'Age' ? 'number' : 'text'}
            name={`Player_${field}`}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      ))}

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </div>
          ) : (
            'Add Player'
          )}
        </button>
      </div>
    </form>
  );
};

export default AddPlayerForm;