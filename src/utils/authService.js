import { v4 as uuidv4 } from 'uuid'

// Session management for QR code auth
class AuthService {
  constructor() {
    this.sessionKey = 'eah_session'
    this.agencyKey = 'eah_agency'
    this.agentEmailKey = 'eah_agent_email'
  }

  /**
   * Generate a login QR code URL
   * Should be called by admin
   */
  generateLoginQR(baseUrl = window.location.origin) {
    const sessionId = uuidv4()
    const qrUrl = `${baseUrl}?session=${sessionId}`
    return { sessionId, qrUrl }
  }

  /**
   * Confirm session from URL parameters
   * Called when agent scans QR code
   */
  confirmSession(sessionId, agentEmail, agencyId) {
    if (!sessionId || !agentEmail) {
      return false
    }

    // Store in localStorage
    sessionStorage.setItem(this.sessionKey, sessionId)
    localStorage.setItem(this.agentEmailKey, agentEmail)
    localStorage.setItem(this.agencyKey, agencyId || 'default')

    return true
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const session = sessionStorage.getItem(this.sessionKey)
    const email = localStorage.getItem(this.agentEmailKey)
    return !!(session && email)
  }

  /**
   * Get current agent info
   */
  getCurrentAgent() {
    if (!this.isAuthenticated()) {
      return null
    }

    return {
      email: localStorage.getItem(this.agentEmailKey),
      agencyId: localStorage.getItem(this.agencyKey),
      sessionId: sessionStorage.getItem(this.sessionKey),
    }
  }

  /**
   * Get agency ID for Sheets operations
   */
  getAgencyId() {
    return localStorage.getItem(this.agencyKey) || 'default'
  }

  /**
   * Log out
   */
  logout() {
    sessionStorage.removeItem(this.sessionKey)
    localStorage.removeItem(this.agentEmailKey)
    localStorage.removeItem(this.agencyKey)
  }

  /**
   * Parse session from URL
   */
  parseSessionFromUrl() {
    const params = new URLSearchParams(window.location.search)
    return params.get('session')
  }
}

export default new AuthService()
