# City Women Safety Analytics Dashboard

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.25-black)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A comprehensive real-time monitoring and analytics platform for urban women's safety**

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [API Documentation](#api-documentation) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

The **City Women Safety Analytics Dashboard** is an enterprise-grade web application designed to enhance urban safety for women through real-time monitoring, data analytics, and emergency response coordination. Built with modern web technologies and adhering to government design standards, this platform provides law enforcement agencies, municipal authorities, and safety coordinators with comprehensive tools to monitor, analyze, and respond to safety incidents effectively.

### Key Objectives

- **Real-time Monitoring**: Track safety incidents and alerts across the city in real-time
- **Data-Driven Insights**: Analyze crime patterns, hotspots, and temporal trends
- **Emergency Response**: Streamline FIR filing and incident response coordination
- **CCTV Integration**: Centralized surveillance camera monitoring and management
- **Analytics Dashboard**: Comprehensive visualization of safety metrics and KPIs
- **Mobile Integration**: Support for mobile panic button and emergency alert systems

---

## ✨ Features

### 🎛️ Dashboard & Analytics
- **Interactive Map Interface**: Real-time visualization of incidents using Leaflet.js
- **Heat Map Analysis**: Identify safety hotspots and high-risk areas
- **Statistical Panels**: Comprehensive metrics including total alerts, active cases, response times
- **Temporal Analysis**: Time-series data visualization for trend identification
- **Predictive Analytics**: Data-driven insights for proactive safety measures

### 🚨 Alert Management
- **Real-time Alerts**: Instant notification system for emergency situations
- **Alert Prioritization**: Severity-based categorization (Critical, High, Medium, Low)
- **Status Tracking**: Monitor alert lifecycle from creation to resolution
- **Location Mapping**: GPS-based incident location tracking
- **Response Coordination**: Assign and track response teams

### 📹 CCTV Surveillance
- **Camera Grid View**: Multi-camera monitoring interface
- **Location-based Filtering**: Filter cameras by area or zone
- **Status Monitoring**: Track camera operational status
- **Live Feed Integration**: Support for real-time video streaming
- **Recording Management**: Access historical footage

### 📋 FIR Management
- **Digital FIR Filing**: Streamlined online FIR registration
- **Case Tracking**: Monitor investigation progress and status updates
- **Evidence Management**: Attach and manage case-related documentation
- **Priority Classification**: Automatic severity assessment
- **Search & Filter**: Advanced search capabilities for case retrieval

### 📱 Mobile Simulator
- **Emergency Button**: Test panic button functionality
- **Location Services**: GPS-based emergency alert simulation
- **Alert Customization**: Configure alert types and messages
- **Response Testing**: Simulate end-to-end emergency workflow

### 🏛️ Government Compliance
- **Indian Government Design Standards**: Adherence to official design guidelines
- **Accessibility**: WCAG 2.1 AA compliance for inclusive access
- **Multi-language Support**: Hindi and English language interfaces
- **Secure Authentication**: Role-based access control (RBAC)
- **Audit Trail**: Comprehensive logging for accountability

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14.2.25** - React framework with App Router and Server Components
- **React 18.2.0** - Modern UI library with concurrent features
- **TypeScript 5.0** - Type-safe development environment

### UI/UX Libraries
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown Menu, Popover, Select, Toast, and 15+ components
- **Lucide React** - Modern icon library (450+ icons)
- **Recharts 2.15.4** - Composable charting library
- **Leaflet 1.9.4** - Interactive mapping platform

### Form & Validation
- **React Hook Form 7.60.0** - Performant form management
- **Zod 3.25.67** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation resolver integration

### Styling & Animation
- **class-variance-authority** - CSS variant management
- **tailwindcss-animate** - Animation utilities
- **clsx** - Conditional className utilities
- **tailwind-merge** - Merge Tailwind CSS classes

### Additional Features
- **next-themes 0.4.6** - Dark mode support
- **date-fns 4.1.0** - Modern date utility library
- **sonner** - Toast notification system
- **embla-carousel-react** - Lightweight carousel component
- **@vercel/analytics** - Web analytics integration

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS transformation pipeline
- **TypeScript** - Static type checking

---

## 🏗️ Architecture

### Application Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # RESTful API routes
│   │   ├── alerts/       # Alert management endpoints
│   │   ├── cctv/         # CCTV camera endpoints
│   │   ├── fir/          # FIR management endpoints
│   │   ├── notifications/ # Notification endpoints
│   │   └── police-stations/ # Police station data
│   ├── dashboard/         # Main dashboard page
│   ├── analytics/         # Analytics & reporting
│   ├── cctv/             # CCTV monitoring interface
│   ├── fir/              # FIR management interface
│   ├── login/            # Authentication page
│   └── mobile-simulator/  # Mobile panic button simulator
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── *.tsx             # Feature-specific components
├── lib/                   # Utility functions & stores
└── public/               # Static assets
```

### Design Patterns

- **Component-Driven Architecture**: Modular, reusable component design
- **Server-Side Rendering (SSR)**: Enhanced performance and SEO
- **API Route Handlers**: RESTful endpoints with Next.js API routes
- **State Management**: React hooks and context for state handling
- **Type Safety**: Comprehensive TypeScript coverage
- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

## 📦 Prerequisites

Before installing the City Women Safety Analytics Dashboard, ensure your development environment meets the following requirements:

### System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space

### Software Dependencies
- **Node.js**: Version 18.17.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm**: Version 9.0.0 or higher (comes with Node.js)
  - Verify installation: `npm --version`
- **Git**: Latest stable version
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Optional Tools
- **VS Code**: Recommended code editor with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

---

## 🚀 Installation

### Method 1: Clone from GitHub

1. **Clone the repository**
   ```bash
   git clone https://github.com/anishasaha25/City-Women-Safety-Analytics-Dashboard.git
   ```

2. **Navigate to project directory**
   ```bash
   cd City-Women-Safety-Analytics-Dashboard
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   
   This will install all required packages defined in `package.json`. The installation process typically takes 2-5 minutes depending on your internet connection.

4. **Verify installation**
   ```bash
   npm list --depth=0
   ```
   
   This command displays all installed top-level dependencies.

### Method 2: Download ZIP

1. **Download the repository**
   - Visit [GitHub Repository](https://github.com/anishasaha25/City-Women-Safety-Analytics-Dashboard)
   - Click the green "Code" button
   - Select "Download ZIP"

2. **Extract the archive**
   - Extract the ZIP file to your desired location
   - Open terminal/command prompt in the extracted folder

3. **Install dependencies**
   ```bash
   npm install
   ```

### Troubleshooting Installation Issues

#### Issue: `npm install` fails with ERESOLVE error
**Solution:**
```bash
npm install --legacy-peer-deps
```

#### Issue: Node version incompatibility
**Solution:**
```bash
# Check your Node version
node --version

# If below 18.17.0, update Node.js or use nvm
nvm install 18
nvm use 18
```

#### Issue: Permission denied errors (Linux/macOS)
**Solution:**
```bash
sudo npm install -g npm@latest
npm install
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific configuration:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Map Configuration (Leaflet)
NEXT_PUBLIC_MAP_CENTER_LAT=28.6139
NEXT_PUBLIC_MAP_CENTER_LNG=77.2090
NEXT_PUBLIC_MAP_ZOOM=12

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Build Configuration

The application uses the following configuration files:

- **`next.config.mjs`**: Next.js framework configuration
- **`tailwind.config.ts`**: Tailwind CSS customization
- **`tsconfig.json`**: TypeScript compiler options
- **`postcss.config.mjs`**: PostCSS plugins configuration

---

## 💻 Usage

### Development Mode

Start the development server with hot-reloading:

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:3000`
- **Network**: `http://[your-ip]:3000`

### Production Build

Build the application for production deployment:

```bash
npm run build
```

This command:
- Creates an optimized production build
- Performs static analysis and type checking
- Generates static assets in `.next/` directory
- Reports build statistics and bundle sizes

### Production Server

Start the production server:

```bash
npm start
```

The optimized application runs on `http://localhost:3000`

### Code Linting

Run ESLint to check code quality:

```bash
npm run lint
```

Fix auto-fixable linting issues:

```bash
npm run lint -- --fix
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Create production build |
| `start` | `npm start` | Run production server |
| `lint` | `npm run lint` | Check code quality |

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Alerts Management

**GET** `/api/alerts`
- **Description**: Retrieve all safety alerts
- **Response**: Array of alert objects
- **Example**:
  ```json
  [
    {
      "id": "1",
      "type": "Emergency",
      "severity": "critical",
      "location": "Connaught Place",
      "timestamp": "2025-11-03T10:30:00Z",
      "status": "active"
    }
  ]
  ```

**GET** `/api/alerts/[id]`
- **Description**: Get specific alert details
- **Parameters**: `id` (string) - Alert ID
- **Response**: Single alert object

**POST** `/api/alerts/[id]/status`
- **Description**: Update alert status
- **Body**: `{ "status": "resolved" | "investigating" | "active" }`
- **Response**: Updated alert object

#### CCTV Management

**GET** `/api/cctv`
- **Description**: Retrieve all CCTV cameras
- **Query Parameters**:
  - `zone` (optional): Filter by area
  - `status` (optional): Filter by operational status
- **Response**: Array of camera objects

#### FIR Management

**GET** `/api/fir`
- **Description**: Retrieve all FIR records
- **Response**: Array of FIR objects

**GET** `/api/fir/[id]`
- **Description**: Get specific FIR details
- **Parameters**: `id` (string) - FIR number
- **Response**: Single FIR object with full details

#### Notifications

**GET** `/api/notifications`
- **Description**: Retrieve system notifications
- **Response**: Array of notification objects

#### Police Stations

**GET** `/api/police-stations`
- **Description**: Get all police station locations
- **Response**: Array of station objects with coordinates

### API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "timestamp": "2025-11-03T10:30:00Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  },
  "timestamp": "2025-11-03T10:30:00Z"
}
```

---

## 📂 Project Structure

```
City-Women-Safety-Analytics-Dashboard/
│
├── app/                           # Next.js App Directory
│   ├── api/                      # API Route Handlers
│   │   ├── alerts/              # Alert endpoints
│   │   │   ├── [id]/           # Dynamic alert routes
│   │   │   │   ├── route.ts    # GET /api/alerts/:id
│   │   │   │   └── status/
│   │   │   │       └── route.ts # POST /api/alerts/:id/status
│   │   │   └── route.ts        # GET /api/alerts
│   │   ├── cctv/               # CCTV endpoints
│   │   ├── fir/                # FIR endpoints
│   │   ├── notifications/      # Notification endpoints
│   │   └── police-stations/    # Police station data
│   │
│   ├── dashboard/               # Dashboard page
│   │   └── page.tsx
│   ├── analytics/               # Analytics page
│   │   └── page.tsx
│   ├── cctv/                   # CCTV monitoring page
│   │   └── page.tsx
│   ├── fir/                    # FIR management page
│   │   └── page.tsx
│   ├── login/                  # Authentication page
│   │   └── page.tsx
│   ├── mobile-simulator/       # Mobile simulator page
│   │   └── page.tsx
│   │
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── fonts/                  # Custom fonts
│
├── components/                  # React Components
│   ├── ui/                     # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   │
│   ├── dashboard-map.tsx       # Interactive map component
│   ├── real-time-alerts.tsx    # Alert display component
│   ├── statistics-panel.tsx    # Stats dashboard
│   ├── cctv-viewer.tsx         # CCTV grid view
│   ├── firs-panel.tsx          # FIR listing
│   ├── notification-panel.tsx   # Notification center
│   └── topbar.tsx              # Navigation bar
│
├── lib/                        # Utility Functions
│   ├── utils.ts               # Helper functions
│   └── alerts-store.ts        # State management
│
├── public/                     # Static Assets
│   └── logo.png               # Application logo
│
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── components.json            # Component configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Project dependencies
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Contribution Guidelines

1. **Fork the repository**
   ```bash
   # Click 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/City-Women-Safety-Analytics-Dashboard.git
   cd City-Women-Safety-Analytics-Dashboard
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Write clean, documented code
   - Follow existing code style and conventions
   - Add tests if applicable

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Commit message format:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes

### Code Style Guidelines

- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Keep components small and focused
- Write meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design across devices

### Reporting Issues

If you encounter bugs or have feature requests:

1. Check existing issues to avoid duplicates
2. Create a new issue with a clear title
3. Provide detailed description and steps to reproduce
4. Include screenshots if applicable
5. Specify your environment (OS, Node version, browser)

---

## 📄 License

This project is licensed under the **MIT License**.

### MIT License

```
Copyright (c) 2025 City Women Safety Analytics Dashboard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **Radix UI** - For accessible component primitives
- **Tailwind Labs** - For the utility-first CSS framework
- **Leaflet** - For the interactive mapping library
- **Open Source Community** - For countless tools and libraries

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/anishasaha25/City-Women-Safety-Analytics-Dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anishasaha25/City-Women-Safety-Analytics-Dashboard/discussions)
- **Email**: support@citysafetydashboard.com

---

## 🗺️ Roadmap

### Planned Features

- [ ] **Real-time WebSocket integration** for live alerts
- [ ] **SMS/Email notifications** for critical incidents
- [ ] **Mobile application** (iOS & Android)
- [ ] **Machine learning** for predictive analytics
- [ ] **Multi-language support** (10+ languages)
- [ ] **Advanced reporting** with PDF export
- [ ] **Integration with 112 emergency services**
- [ ] **Blockchain-based audit trail**
- [ ] **AI-powered threat detection**
- [ ] **Progressive Web App (PWA)** support

---

<div align="center">

**Made with ❤️ for Women's Safety**

⭐ Star us on GitHub — it motivates us a lot!

[Report Bug](https://github.com/anishasaha25/City-Women-Safety-Analytics-Dashboard/issues) • [Request Feature](https://github.com/anishasaha25/City-Women-Safety-Analytics-Dashboard/issues) • [Documentation](https://github.com/anishasaha25/City-Women-Safety-Analytics-Dashboard/wiki)

</div>
