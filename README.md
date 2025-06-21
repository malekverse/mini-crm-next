# Mini CRM - Next.js

A modern, responsive Customer Relationship Management (CRM) application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Authentication**: Mock login system with smooth transitions
- **Dashboard**: Overview with client statistics and recent activity
- **Client Management**: 
  - View all clients in a sortable, searchable table
  - Detailed client profiles with activity history
  - Add new clients with form validation
- **Responsive Design**: Mobile-first approach with smooth animations
- **Modern UI**: Clean interface with gradient accents and hover effects

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Heroicons
- **Form Handling**: React Hook Form
- **State Management**: React built-in state (useState, useContext)


## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/malekverse/mini-crm-next
cd mini-crm-nextjs
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. **Login**: Use any email/password combination to access the dashboard
2. **Dashboard**: View client statistics and recent activity
3. **Clients**: Browse, search, and sort through all clients
4. **Client Details**: Click on any client to view detailed information
5. **Add Client**: Use the form to add new clients with validation

## 🎨 Design Features

- **Smooth Animations**: Page transitions, hover effects, and loading states
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Gradient backgrounds, subtle shadows, and clean typography
- **Interactive Elements**: Sortable tables, search functionality, and form validation

## 📊 Mock Data

The application uses static JSON data for demonstration purposes. In a real-world scenario, this would be replaced with API calls to a backend service.

## 🔧 Customization

### Adding New Client Fields
1. Update the `Client` interface in `types/client.ts`
2. Modify the form in `app/dashboard/add-client/page.tsx`
3. Update the client detail view in `app/dashboard/clients/[id]/page.tsx`

### Styling Changes
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components for specific styling
- Customize the color scheme by updating CSS variables

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:


### Other Platforms
\`\`\`bash
npm run build
npm start
\`\`\`

