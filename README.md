# Expense Management Application

## Project Overview

This is a modern web application for managing expenses, built with React and TypeScript. The application provides features for tracking expenses, categorizing them, and visualizing spending patterns.

### Key Features
- Expense tracking and management
- Category-based organization
- Visual charts and analytics
- Responsive and accessible UI
- Modern, user-friendly interface

### Tech Stack
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (based on Radix UI)
- **Additional Libraries**:
  - React Query for data management
  - date-fns for date handling
  - Embla Carousel for sliders
  - next-themes for theme management

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/supasinee2555-prog/test-vibe-backend.git
cd test-vibe-backend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
  ├── components/     # Reusable UI components
  │   ├── ui/        # Base UI components from shadcn/ui
  │   ├── AddExpenseForm.tsx
  │   ├── CategoryBadge.tsx
  │   ├── ExpenseChart.tsx
  │   └── ExpenseList.tsx
  ├── hooks/         # Custom React hooks
  ├── lib/           # Utility functions
  └── pages/         # Application pages
```

### Contributing
1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

### Building for Production
To build the application for production:
```bash
npm run build
```
The built files will be in the `dist` directory.

### Preview Production Build
To preview the production build locally:
```bash
npm run build
npm run preview
```

## GitHub Copilot Guidelines

### Usage Rules
1. **Code Review**
   - Always review Copilot suggestions before accepting them
   - Verify that suggested code follows project conventions
   - Check for potential security issues in suggested code

2. **Best Practices**
   - Use descriptive comments to get better suggestions
   - Break down complex tasks into smaller components
   - Add type annotations to improve TypeScript suggestions
   - Test Copilot-suggested code thoroughly

3. **Code Style**
   - Ensure Copilot suggestions follow our ESLint rules
   - Maintain consistent naming conventions
   - Format code according to project standards

4. **Security Considerations**
   - Never accept credentials or API keys suggested by Copilot
   - Review security-sensitive code manually
   - Validate any data handling or validation logic

5. **Documentation**
   - Add comments explaining complex logic
   - Document any deviations from Copilot suggestions
   - Keep documentation up-to-date with code changes

### Example Usage
```typescript
// Good: Descriptive comment for better suggestions
// Create a function to calculate total expenses for a given category and date range
function calculateCategoryExpenses(category: string, startDate: Date, endDate: Date): number {
  // Copilot will suggest implementation
}

// Bad: Vague comment
// Calculate stuff
function calc(cat: string, s: Date, e: Date): number {
  // Harder for Copilot to provide relevant suggestions
}
```
