import React from 'react';

export default function Dashboard({ appointments, onDelete }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-pri-50 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-pri-50/50">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">Patient Name</th>
              <th scope="col" className="px-6 py-4 font-semibold">Service</th>
              <th scope="col" className="px-6 py-4 font-semibold">Date</th>
              <th scope="col" className="px-6 py-4 font-semibold">Status</th>
              <th scope="col" className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                  No appointments found. Use the booking modal to add one!
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt._id} className="border-b border-pri-50 hover:bg-pri-50/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{apt.patientName}</td>
                  <td className="px-6 py-4">{apt.service || 'N/A'}</td>
                  <td className="px-6 py-4">{new Date(apt.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onDelete(apt._id)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
