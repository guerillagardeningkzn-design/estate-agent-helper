import axios from 'axios'

/**
 * Google Sheets Integration
 * 
 * This is a placeholder structure. To make it work:
 * 1. Set up Google Sheets API credentials
 * 2. Share the Google Sheet with the app's service account
 * 3. Add sheet IDs and API key to environment
 */

class SheetsService {
  constructor() {
    // Replace these with your actual values
    this.apiKey = process.env.REACT_APP_GOOGLE_SHEETS_KEY || 'YOUR_API_KEY'
    this.sheetsBaseUrl = 'https://sheets.googleapis.com/v4/spreadsheets'
    
    // Sheet IDs - will be set per agency
    this.sheetIds = {}
  }

  /**
   * Initialize service for agency
   * agencyId should be the Google Sheet ID
   */
  setAgencySheet(agencyId, sheetId) {
    this.sheetIds[agencyId] = sheetId
  }

  /**
   * Get all leads for an agent
   */
  async getAgentLeads(agencyId, agentEmail) {
    try {
      const sheetId = this.sheetIds[agencyId]
      if (!sheetId) {
        throw new Error(`No sheet configured for agency ${agencyId}`)
      }

      const url = `${this.sheetsBaseUrl}/${sheetId}/values/${agentEmail}!A:Z`
      const response = await axios.get(url, {
        params: { key: this.apiKey },
      })

      const values = response.data.values || []
      if (values.length === 0) return []

      const headers = values[0]
      return values.slice(1).map((row) => {
        const lead = {}
        headers.forEach((header, index) => {
          lead[header] = row[index] || ''
        })
        return lead
      })
    } catch (error) {
      console.error('Error fetching leads:', error)
      throw error
    }
  }

  /**
   * Add new lead to agent's sheet
   */
  async addLead(agencyId, agentEmail, leadData) {
    try {
      const sheetId = this.sheetIds[agencyId]
      if (!sheetId) {
        throw new Error(`No sheet configured for agency ${agencyId}`)
      }

      const url = `${this.sheetsBaseUrl}/${sheetId}/values/${agentEmail}!A:Z:append`
      
      const values = [[
        new Date().toISOString(),
        leadData.name,
        leadData.phone,
        leadData.email,
        leadData.preferredContact,
        leadData.propertyType,
        leadData.budget,
        leadData.status,
        leadData.source,
        leadData.notes,
      ]]

      const response = await axios.post(url, { values }, {
        params: {
          key: this.apiKey,
          valueInputOption: 'USER_ENTERED',
        },
      })

      return response.data
    } catch (error) {
      console.error('Error adding lead:', error)
      throw error
    }
  }

  /**
   * Get agency properties
   */
  async getProperties(agencyId) {
    try {
      const sheetId = this.sheetIds[agencyId]
      if (!sheetId) {
        throw new Error(`No sheet configured for agency ${agencyId}`)
      }

      const url = `${this.sheetsBaseUrl}/${sheetId}/values/PROPERTIES!A:Z`
      const response = await axios.get(url, {
        params: { key: this.apiKey },
      })

      const values = response.data.values || []
      if (values.length === 0) return []

      const headers = values[0]
      return values.slice(1).map((row) => {
        const property = {}
        headers.forEach((header, index) => {
          property[header] = row[index] || ''
        })
        return property
      })
    } catch (error) {
      console.error('Error fetching properties:', error)
      throw error
    }
  }

  /**
   * Add new property to agency sheet
   */
  async addProperty(agencyId, propertyData) {
    try {
      const sheetId = this.sheetIds[agencyId]
      if (!sheetId) {
        throw new Error(`No sheet configured for agency ${agencyId}`)
      }

      const url = `${this.sheetsBaseUrl}/${sheetId}/values/PROPERTIES!A:Z:append`
      
      const values = [[
        propertyData.address,
        propertyData.type, // sale/rental/both
        propertyData.price,
        propertyData.bedrooms,
        propertyData.bathrooms,
        propertyData.description,
        propertyData.assignedAgent,
        propertyData.status, // active/pending/sold/rented
        new Date().toISOString(),
      ]]

      const response = await axios.post(url, { values }, {
        params: {
          key: this.apiKey,
          valueInputOption: 'USER_ENTERED',
        },
      })

      return response.data
    } catch (error) {
      console.error('Error adding property:', error)
      throw error
    }
  }

  /**
   * Format lead data from form
   */
  formatLeadData(formData) {
    return {
      dateAdded: new Date().toISOString().split('T')[0],
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      preferredContact: formData.preferredContact,
      propertyType: formData.propertyType, // sale/rental/both
      areas: formData.areas,
      budget: formData.budget,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      otherRequirements: formData.otherRequirements, // pets, schools, etc
      creditScore: formData.creditScore,
      familySize: formData.familySize,
      employment: formData.employment,
      birthDate: formData.birthDate,
      anniversary: formData.anniversary,
      status: 'New Lead',
      source: formData.source,
      lastContactDate: new Date().toISOString().split('T')[0],
      followUpDate: formData.followUpDate || '',
      notes: formData.notes,
    }
  }
}

export default new SheetsService()
