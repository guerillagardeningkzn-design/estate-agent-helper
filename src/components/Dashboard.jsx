import React, { useState } from 'react'

export default function Dashboard({ agent, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const quickActions = [
    { id: 'new-lead', label: 'New Lead', icon: '👤', color: 'bg-blue-50', textColor: 'text-blue-700' },
    { id: 'new-property', label: 'New Property', icon: '🏠', color: 'bg-green-50', textColor: 'text-green-700' },
    { id: 'new-inspection', label: 'New Inspection', icon: '🔍', color: 'bg-purple-50', textColor: 'text-purple-700' },
    { id: 'diary', label: 'My Diary', icon: '📅', color: 'bg-amber-50', textColor: 'text-amber-700' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="container-main flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">
              <span className="accent">✦</span> Estate Agent Helper
            </h1>
            <p className="text-sm text-neutral-600">Welcome, {agent.email}</p>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition"
          >
            ☰
          </button>

          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-neutral-700 hover:text-brand-600 font-medium transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('leads')}
              className="text-neutral-700 hover:text-brand-600 font-medium transition"
            >
              Leads
            </button>
            <button
              onClick={() => onNavigate('properties')}
              className="text-neutral-700 hover:text-brand-600 font-medium transition"
            >
              Properties
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-200 px-4 py-3 space-y-2">
            <button
              onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 hover:bg-neutral-100 rounded text-sm"
            >
              Dashboard
            </button>
            <button
              onClick={() => { onNavigate('leads'); setMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 hover:bg-neutral-100 rounded text-sm"
            >
              Leads
            </button>
            <button
              onClick={() => { onNavigate('properties'); setMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 hover:bg-neutral-100 rounded text-sm"
            >
              Properties
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container-main">
        {/* Stats Section */}
        <div className="grid-responsive mb-12">
          <div className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Leads</p>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <div className="text-3xl">👤</div>
            </div>
            <p className="text-xs text-neutral-500 mt-4">This month</p>
          </div>

          <div className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Properties Listed</p>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <div className="text-3xl">🏠</div>
            </div>
            <p className="text-xs text-neutral-500 mt-4">Active listings</p>
          </div>

          <div className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Scheduled Viewings</p>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
            <p className="text-xs text-neutral-500 mt-4">This week</p>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid-responsive">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className={`${action.color} ${action.textColor} p-6 rounded-lg text-center font-medium hover:shadow-md transition cursor-pointer`}
              >
                <div className="text-4xl mb-2">{action.icon}</div>
                <div>{action.label}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Activity Placeholder */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="card text-center py-12 text-neutral-600">
            <p>No recent activity yet. Start by adding your first lead!</p>
          </div>
        </section>
      </main>
    </div>
  )
}
