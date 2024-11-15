import React from 'react';
import { Coach } from '../../types/database';

interface CoachFormProps {
  onSubmit: (data: Partial<Coach>) => void;
  initialData?: Partial<Coach>;
  isLoading?: boolean;
}

const CoachForm: React.FC<CoachFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const coachData: Partial<Coach> = {
      Coach_Name: formData.get('name') as string,
      Coach_Age: parseInt(formData.get('age') as string),
      Coach_Team: formData.get('team') as string,
      Coach_Type: formData.get('type') as Coach['Coach_Type'],
      Coach_Experience: parseInt(formData.get('experience') as string),
      Coach_Nationality: formData.get('nationality') as string,
      Coach_Start_Date: new Date(formData.get('startDate') as string),
      Coach_Specialization: (formData.get('specialization') as string).split(',').map(s => s.trim()),
    };

    onSubmit(coachData);
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
          defaultValue={initialData?.Coach_Name}
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
          defaultValue={initialData?.Coach_Age}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          name="type"
          id="type"
          defaultValue={initialData?.Coach_Type}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Head Coach">Head Coach</option>
          <option value="Assistant Coach">Assistant Coach</option>
          <option value="Batting Coach">Batting Coach</option>
          <option value="Bowling Coach">Bowling Coach</option>
          <option value="Fielding Coach">Fielding Coach</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          Experience (years)
        </label>
        <input
          type="number"
          name="experience"
          id="experience"
          defaultValue={initialData?.Coach_Experience}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
          Nationality
        </label>
        <input
          type="text"
          name="nationality"
          id="nationality"
          defaultValue={initialData?.Coach_Nationality}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          defaultValue={initialData?.Coach_Start_Date?.toISOString().split('T')[0]}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
          Specializations (comma-separated)
        </label>
        <input
          type="text"
          name="specialization"
          id="specialization"
          defaultValue={initialData?.Coach_Specialization?.join(', ')}
          placeholder="e.g., Batting Technique, Field Placement, Team Strategy"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? 'Saving...' : 'Save Coach'}
        </button>
      </div>
    </form>
  );
};

export default CoachForm;