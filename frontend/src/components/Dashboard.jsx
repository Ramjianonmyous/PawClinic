import React from 'react';

export default function Dashboard({ appointments, onDelete, aiQueries = [] }) {
  return (
    <div className="space-y-12">
      {/* Appointments Section */}
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

      {/* AI Queries Section */}
      <div className="bg-white rounded-3xl p-6 border border-pri-50 shadow-sm">
        <div className="mb-6">
          <p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-1">Health History</p>
          <h3 className="font-display text-2xl text-pri-900">Saved AI Analyses</h3>
        </div>
        <div className="flex flex-col gap-6">
          {aiQueries.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No saved analyses yet. Use the AI features to create one!</p>
          ) : (
            aiQueries.map((query) => (
              <div key={query._id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-sm transition-shadow w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm">
                      <i className={`fas ${query.feature === 'prescription' ? 'fa-file-prescription' : query.feature === 'symptom' ? 'fa-stethoscope' : 'fa-file-medical-alt'}`}></i>
                    </div>
                    <span className="font-bold text-slate-800 capitalize">{query.feature} Analysis</span>
                  </div>
                  <span className="text-xs text-slate-400">{new Date(query.createdAt).toLocaleDateString()}</span>
                </div>
                {query.input && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Input</p>
                    <p className="text-sm text-slate-600">{query.input}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Result</p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{query.result}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
