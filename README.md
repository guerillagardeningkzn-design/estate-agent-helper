# Estate Agent Helper - Starter Vite Project

A complete property and lead management system for South African estate agents. Built with React, Vite, Tailwind CSS, and Google Sheets integration.

## 📦 What's Included

- ✅ **QR Code Authentication** - WhatsApp-style login system
- ✅ **Lead Management Form** - All SA estate agent fields (contact, financial, personal, preferences)
- ✅ **Properties Listing** - Shared agency properties
- ✅ **Responsive Mobile-First Design** - Works on phone and desktop
- ✅ **MD Works Aesthetics** - Clean, intentional design with customizable branding
- ✅ **Google Sheets Integration** - Agent data stored in their own Google Drive
- ✅ **Session Management** - Secure local session storage

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React 18
- Vite (lightning-fast bundler)
- Tailwind CSS
- QRCode & Axios for integrations
- Date utilities

**Disk usage:** ~50MB (vs 200MB+ with Create React App)

### 2. Run Development Server

```bash
npm run dev
```

Opens automatically at `http://localhost:5173`

Hot-reload enabled - changes save instantly.

### 3. Build for Production

```bash
npm run build
```

Outputs to `dist/` folder (ready to upload to Cloudflare).

## 📂 Project Structure

```
estate-agent-helper/
├── src/
│   ├── components/
│   │   ├── AuthScreen.jsx       # QR code + email login
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   └── LeadForm.jsx          # Lead entry form
│   ├── utils/
│   │   ├── authService.js        # Session & QR logic
│   │   └── sheetsService.js      # Google Sheets integration
│   ├── styles/
│   │   └── globals.css           # Tailwind + custom styles
│   ├── App.jsx                   # Main app router
│   └── main.jsx                  # React entry point
├── index.html                    # HTML with CSS variables
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind theming
└── package.json                  # Dependencies
```

## 🔐 Authentication Flow

### For Agents (Using QR Code)

1. **Admin generates QR code** → "Generate QR Code" button on auth screen
2. **Agent scans with phone camera** → URL automatically opens
3. **Agent confirms email** → Logged in
4. **Session stored locally** → Works offline

### For Quick Testing

Use the "Quick Login" form:
- Email: `agent@test.com`
- Agency ID: `demo` (or leave blank)

Sessions expire on browser close (sessionStorage).

## 🎨 Branding & Customization

### Change Brand Colors

Edit `index.html`:

```html
<style>
  :root {
    /* Your agency colors */
    --color-brand-50: #f9f7f4;
    --color-brand-500: #8b7c6e;
    --color-brand-600: #6b5d51;
    /* ... */
  }
</style>
```

Or update CSS variables from dashboard (coming in Phase 3).

### Customize Logo

Replace `✦` symbol with your agency logo or name in:
- `src/components/AuthScreen.jsx`
- `src/components/Dashboard.jsx`
- `src/App.jsx`

## 📊 Google Sheets Integration

### Setup (Required for Production)

1. **Create a Google Sheet** for your agency
2. **Share with service account** email
3. **Create sheet tabs:**
   - `AGENCY` - company properties & settings
   - `PROPERTIES` - shared listings
   - One per agent - their private leads

4. **Get your Google Sheets API key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable Sheets API
   - Create API key
   - Add to `.env` file:

```env
VITE_GOOGLE_SHEETS_KEY=YOUR_API_KEY
VITE_GOOGLE_SHEET_ID=YOUR_SHEET_ID
```

5. **Initialize in App.jsx:**

```javascript
import sheetsService from './utils/sheetsService'

// After auth
sheetsService.setAgencySheet(agencyId, sheetId)
```

Currently, forms log to console. Uncomment Sheets API calls when configured.

## 📋 Lead Form Fields

The lead form includes all SA estate agent essentials:

**Contact:**
- Name, Phone, Email, Preferred Contact

**Property Preferences:**
- Type (Sale/Rental/Both)
- Areas, Budget, Bedrooms, Bathrooms
- Other requirements (pets, schools, hospital)

**Financial & Personal:**
- Credit score, Family size, Employment
- Birth date, Anniversary (relationship tracking)

**Lead Management:**
- Status (New Lead → Qualified → Viewing → Offer → Closed/Lost)
- Source (Walk-in, Online, Referral, Cold Call)
- Notes, Last contact date, Follow-up date

## 🛣️ Development Roadmap

### Phase 1 ✅ (Current)
- QR auth system
- Basic lead form
- Properties list
- Dashboard overview

### Phase 2 (Next)
- Inspections (entry/exit/new listing)
- Photo uploads
- Digital signature capture
- PDF report generation
- Witness signatures

### Phase 3 (Polish)
- Diary (personal + company)
- WhatsApp integration
- Admin panel (roles, settings, agents)
- Reports & analytics
- Branding customization UI

## 🔧 Windows 10 Development Tips

### Running Locally

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Keep available for other tasks
# (VS Code: Terminal > New Terminal)
```

### Building & Uploading

```bash
# Build
npm run build

# Upload dist/ folder to GitHub via web:
# 1. github.com/yourrepo
# 2. Click "Upload files"
# 3. Drag dist/ folder
# 4. Commit
# 5. Cloudflare auto-deploys (2 min)
```

### Memory Tips

- Close unnecessary apps while building
- Use lightweight editor extensions
- Keep `node_modules` on fast drive (SSD if possible)

## 📱 Mobile-First Design

All components are optimized for mobile first:
- Touch-friendly buttons (44px minimum)
- Responsive forms (single column on mobile, 2 on desktop)
- Sticky header on small screens
- Responsive navigation (hamburger menu)

Test in VS Code with Chrome DevTools (F12).

## 🎯 Next Steps

1. **Clone/download this folder**
2. **Run `npm install`**
3. **Run `npm run dev`**
4. **Test auth & lead form**
5. **Configure Google Sheets API** (when ready for production)
6. **Customize colors & branding**
7. **Build & deploy to Cloudflare Pages**

## 🚀 Deployment (Cloudflare Pages)

1. Push `src/` to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect GitHub repo
4. Build command: `npm run build`
5. Build output: `dist`
6. Deploy!

Cloudflare auto-deploys on every push. Free SSL, global CDN.

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 5174
```

**Old build cached?**
```bash
# Clear dist and rebuild
rm -r dist
npm run build
```

**Tailwind styles not showing?**
- Check `tailwind.config.js` `content` paths
- Restart dev server

**Google Sheets not working?**
- Check API key in `.env`
- Verify sheet is shared with service account
- Check browser console for errors

## 📚 Resources

- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Cloudflare Pages](https://pages.cloudflare.com)

## 💡 Pro Tips

- Use React DevTools extension for debugging
- Check network tab in DevTools for API calls
- Use localStorage to persist agent preferences
- Pre-fill forms from URL params for quick testing
- Test QR auth on actual phone camera for best UX

## 📞 Support

Questions? 
- Check console (F12) for errors
- Test in incognito window (clears session)
- Verify Google Sheets permissions
- Review component props in React DevTools

---

**Built with ✦ for South African estate agents**

Zero-cost first. Real deployment. Craft over speed.
