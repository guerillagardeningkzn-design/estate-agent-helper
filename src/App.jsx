import React, { useEffect, useState } from 'react'
import authService from './utils/authService'
import AuthScreen from './components/AuthScreen'
import Dashboard from './components/Dashboard'
import LeadForm from './components/LeadForm'

export default function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    agent: null,
  })
  const [currentView, setCurrentView] = useState('dashboard')
  const [isInitializing, setIsInitializing] = useState(true)

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated()
      
      if (isAuth) {
        const agent = authService.getCurrentAgent()
        setAuthState({
          isAuthenticated: true,
          agent,
        })
      }
      
      setIsInitializing(false)
    }

    checkAuth()
  }, [])

  const handleAuthSuccess = (agentData) => {
    setAuthState({
      isAuthenticated: true,
      agent: agentData,
    })
    setCurrentView('dashboard')
    // Clear any query params
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  const handleLogout = () => {
    authService.logout()
    setAuthState({
      isAuthenticated: false,
      agent: null,
    })
    setCurrentView('dashboard')
  }

  const handleNavigate = (view) => {
    setCurrentView(view)
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-display font-bold mb-4">
            <span className="accent">✦</span>
          </div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Auth Screen
  if (!authState.isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />
  }

  // Authenticated Views
  return (
    <div>
      {currentView === 'dashboard' && (
        <Dashboard agent={authState.agent} onNavigate={handleNavigate} />
      )}

      {currentView === 'new-lead' && (
        <div className="min-h-screen bg-neutral-50">
          <header className="bg-white border-b border-neutral-200">
            <div className="container-main flex items-center justify-between">
              <h1 className="text-2xl font-display font-bold">
                <span className="accent">✦</span> Estate Agent Helper
              </h1>
              <button
                onClick={() => handleNavigate('dashboard')}
                className="text-neutral-700 hover:text-brand-600 font-medium transition"
              >
                ← Back
              </button>
            </div>
          </header>
          <main className="container-main max-w-2xl">
            <LeadForm
              agencyId={authState.agent.agencyId}
              agentEmail={authState.agent.email}
              onLeadAdded={() => {
                handleNavigate('dashboard')
              }}
              onCancel={() => handleNavigate('dashboard')}
            />
          </main>
        </div>
      )}

      {currentView === 'leads' && (
        <div className="min-h-screen bg-neutral-50">
          <header className="bg-white border-b border-neutral-200">
            <div className="container-main flex items-center justify-between">
              <h1 className="text-2xl font-display font-bold">
                <span className="accent">✦</span> My Leads
              </h1>
              <button
                onClick={() => handleNavigate('dashboard')}
                className="text-neutral-700 hover:text-brand-600 font-medium transition"
              >
                ← Back
              </button>
            </div>
          </header>
          <main className="container-main">
            <div className="card text-center py-12 text-neutral-600">
              <p className="mb-4">Leads list coming soon</p>
              <button
                onClick={() => handleNavigate('new-lead')}
                className="btn-primary"
              >
                + Add Your First Lead
              </button>
            </div>
          </main>
        </div>
      )}

      {currentView === 'properties' && (
        <div className="min-h-screen bg-neutral-50">
          <header className="bg-white border-b border-neutral-200">
            <div className="container-main flex items-center justify-between">
              <h1 className="text-2xl font-display font-bold">
                <span className="accent">✦</span> Properties
              </h1>
              <button
                onClick={() => handleNavigate('dashboard')}
                className="text-neutral-700 hover:text-brand-600 font-medium transition"
              >
                ← Back
              </button>
            </div>
          </header>
          <main className="container-main">
            <div className="card text-center py-12 text-neutral-600">
              <p>Properties list coming soon</p>
            </div>
          </main>
        </div>
      )}

      {/* Logout button (visible on all authenticated screens) */}
      {currentView !== 'dashboard' && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={handleLogout}
            className="btn-secondary text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
