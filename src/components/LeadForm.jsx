import React, { useState } from 'react'
import sheetsService from '../utils/sheetsService'

export default function LeadForm({ agencyId, agentEmail, onLeadAdded, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredContact: 'phone', // phone, email, whatsapp
    propertyType: 'sale', // sale, rental, both
    areas: '',
    budget: '',
    bedrooms: '',
    bathrooms: '',
    otherRequirements: '',
    creditScore: '',
    familySize: '',
    employment: '',
    birthDate: '',
    anniversary: '',
    source: '', // walk-in, online, referral, cold-call, etc
    notes: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.phone || !formData.email) {
        setError('Name, phone, and email are required')
        setLoading(false)
        return
      }

      // Format and submit
      const leadData = sheetsService.formatLeadData(formData)
      
      // For now, just log to console (Sheets API integration needed)
      console.log('Lead data to submit:', leadData)
      
      // TODO: Uncomment when Sheets API is configured
      // await sheetsService.addLead(agencyId, agentEmail, leadData)

      // Show success
      alert('Lead added successfully!')
      onLeadAdded(leadData)
      setFormData({
        name: '', phone: '', email: '', preferredContact: 'phone',
        propertyType: 'sale', areas: '', budget: '', bedrooms: '', bathrooms: '',
        otherRequirements: '', creditScore: '', familySize: '', employment: '',
        birthDate: '', anniversary: '', source: '', notes: '',
      })
    } catch (err) {
      setError(err.message || 'Failed to add lead')
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">New Lead</h2>

      {error && (
        <div className="p-4 mb-6 rounded-md bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="border-b border-neutral-200 pb-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Lead's full name"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+27 81 234 5678"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="lead@example.com"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Preferred Contact</label>
              <select name="preferredContact" value={formData.preferredContact} onChange={handleChange} disabled={loading}>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Preferences */}
        <div className="border-b border-neutral-200 pb-6">
          <h3 className="text-lg font-semibold mb-4">Property Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Looking For</label>
              <select name="propertyType" value={formData.propertyType} onChange={handleChange} disabled={loading}>
                <option value="sale">To Buy (Sale)</option>
                <option value="rental">To Rent</option>
                <option value="both">Both Sale & Rental</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Areas of Interest</label>
              <input
                type="text"
                name="areas"
                value={formData.areas}
                onChange={handleChange}
                placeholder="e.g., Ballito, Umhlanga, Westville"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Budget Range (ZAR)</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., 1.5M - 2.5M"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Desired bedrooms"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="Desired bathrooms"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Other Requirements</label>
              <input
                type="text"
                name="otherRequirements"
                value={formData.otherRequirements}
                onChange={handleChange}
                placeholder="e.g., pets OK, near schools, hospital"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Financial & Personal */}
        <div className="border-b border-neutral-200 pb-6">
          <h3 className="text-lg font-semibold mb-4">Financial & Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Credit Score</label>
              <input
                type="text"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleChange}
                placeholder="e.g., Excellent, Good, Fair"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Family Size</label>
              <input
                type="number"
                name="familySize"
                value={formData.familySize}
                onChange={handleChange}
                placeholder="Number of family members"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Employment Status</label>
              <select name="employment" value={formData.employment} onChange={handleChange} disabled={loading}>
                <option value="">Select...</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="retired">Retired</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Date of Birth</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Anniversary (for relationship tracking)</label>
              <input
                type="date"
                name="anniversary"
                value={formData.anniversary}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Lead Source & Notes */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Source & Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Lead Source</label>
              <select name="source" value={formData.source} onChange={handleChange} disabled={loading}>
                <option value="">Select...</option>
                <option value="walk-in">Walk-in</option>
                <option value="online-ad">Online Advertisement</option>
                <option value="referral">Referral</option>
                <option value="cold-call">Cold Call</option>
                <option value="repeat-client">Repeat Client</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes or requirements..."
              rows="4"
              disabled={loading}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-6 border-t border-neutral-200">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? 'Adding Lead...' : 'Add Lead'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
