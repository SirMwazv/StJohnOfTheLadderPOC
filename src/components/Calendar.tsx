'use client'

import { useState } from 'react';

export default function Calendar() {
  const [currentDate] = useState(new Date());

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-byzantine-500 font-semibold mb-4">Church Calendar</h2>
      <div className="space-y-2">
        {/* Add your calendar implementation here */}
        <div className="text-byzantine-400">
          <p className="font-medium">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          <p className="text-sm">Today's Saint: St. John of the Ladder</p>
        </div>
      </div>
    </div>
  );
}