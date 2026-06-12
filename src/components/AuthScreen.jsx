import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode.react'
import authService from '../utils/authService'

export default function AuthScreen({ onAuthSuccess }) {
  const [mode, setMode] = useState('login') // 'login' | 'qr' | 'confirm'
  const [qrCode, setQrCode] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [agentEmail, setAgentEmail] = useState('')
  const [agencyId, setAgencyId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if coming from QR scan
  useEffect(() => {
    const sessionFromUrl = authService.parseSessionFromUrl()
    if (sessionFromUrl) {
      setMode('confirm')
      setSessionId(sessionFromUrl)
    }
  }, [])

  const handleGenerateQR = () => {
    setLoading(true)
    setError('')
    try {
      const { sessionId: newSessionId, qrUrl } = authService.generateLoginQR()
      setSessionId(newSessionId)
      setQrCode(qrUrl)
      setMode('qr')
    } catch (err) {
      setError('Failed to generate QR code')
    }
    setLoading(false)
  }

  const handleConfirmSession = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!agentEmail) {
      setError('Please enter your email address')
      setLoading(false)
      return
    }

    if (!sessionId) {
      setError('No session found. Please scan QR code again.')
      setLoading(false)
      return
    }

    try {
      const success = authService.confirmSession(sessionId, agentEmail, agencyId || 'default')
      
      if (success) {
        onAuthSuccess({
          email: agentEmail,
          agencyId: agencyId || 'default',
          sessionId,
        })
      } else {
        setError('Authentication failed. Please try again.')
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication')
    }
    setLoading(false)
  }

  const handleDirectLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!agentEmail) {
      setError('Please enter your email address')
      setLoading(false)
      return
    }

    try {
      const sessionId = authService.generateLoginQR()[0]
      const success = authService.confirmSession(sessionId, agentEmail, agencyId || 'default')
      
      if (success) {
        onAuthSuccess({
          email: agentEmail,
          agencyId: agencyId || 'default',
          sessionId,
        })
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-4xl font-display font-bold mb-2">
            <span className="accent">✦</span> Estate Agent Helper
          </div>
          <p className="text-neutral-600">Lead & property management for SA agents</p>
        </div>

        {/* Login Cards */}
        {mode === 'login' && (
          <div className="space-y-4">
            {/* Direct Login */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Quick Login</h3>
              <form onSubmit={handleDirectLogin} className="space-y-4">
                <div>
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    placeholder="agent@agency.com"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="input-label">Agency ID (optional)</label>
                  <input
                    type="text"
                    value={agencyId}
                    onChange={(e) => setAgencyId(e.target.value)}
                    placeholder="Your agency ID"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? <span className="spinner"></span> : 'Login'}
                </button>
              </form>
            </div>

            {/* QR Login */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Login with QR Code</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Ask your admin to generate a QR code, then scan it with your phone camera.
              </p>
              <button
                onClick={handleGenerateQR}
                disabled={loading}
                className="btn-secondary w-full"
              >
                {loading ? 'Generating...' : 'Generate QR Code'}
              </button>
            </div>

            {/* Admin Info */}
            <div className="p-4 bg-brand-50 rounded-lg border border-brand-200">
              <p className="text-sm text-brand-700">
                <strong>Admin?</strong> Generate a QR code to share with your team for quick login.
              </p>
            </div>
          </div>
        )}

        {/* QR Code Display */}
        {mode === 'qr' && qrCode && (
          <div className="card text-center">
            <h3 className="text-lg font-semibold mb-4">Share this QR Code</h3>
            <p className="text-sm text-neutral-600 mb-6">
              Agents scan this code with their phone camera to log in.
            </p>
            
            <div className="flex justify-center mb-6 p-4 bg-white border border-neutral-200 rounded-lg">
              <QRCode
                value={qrCode}
                size={256}
                level="H"
                includeMargin={true}
                fgColor="#6b5d51"
                bgColor="#fafaf9"
              />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-neutral-100 rounded text-left">
                <p className="text-xs font-mono text-neutral-600 break-all">
                  {qrCode}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(qrCode)
                  alert('Link copied to clipboard')
                }}
                className="btn-secondary w-full text-sm"
              >
                Copy Link
              </button>
              <button
                onClick={() => setMode('login')}
                className="btn-secondary w-full text-sm"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Confirm Session (After QR Scan) */}
        {mode === 'confirm' && sessionId && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Complete Login</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Please verify your details to complete authentication.
            </p>

            <form onSubmit={handleConfirmSession} className="space-y-4">
              <div>
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  value={agentEmail}
                  onChange={(e) => setAgentEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={loading}
                  autoFocus
                />
              </div>

              <div>
                <label className="input-label">Agency ID (optional)</label>
                <input
                  type="text"
                  value={agencyId}
                  onChange={(e) => setAgencyId(e.target.value)}
                  placeholder="Your agency ID"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Confirming...' : 'Confirm & Login'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
