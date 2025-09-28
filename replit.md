# Overview

This is a resume builder application that allows users to create professional resumes by selecting templates and customizing content through an intuitive form interface. The application features a React frontend with multiple resume templates, a Node.js/Express backend API, and PostgreSQL database integration for data persistence. Users can input personal information, work experience, education, skills, and customize styling options to generate professional-looking resumes.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture
- **Runtime**: Node.js with Express.js for REST API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints for resume CRUD operations
- **Data Validation**: Zod schemas for runtime type validation and data integrity
- **Development Server**: Hot module replacement and middleware integration with Vite

## Data Storage
- **Primary Database**: PostgreSQL for reliable data persistence
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Database Provider**: Neon Database serverless PostgreSQL
- **Fallback Storage**: In-memory storage for development and testing scenarios
- **Schema Management**: Shared TypeScript schemas between frontend and backend

## Resume Template System
- **Template Architecture**: Component-based templates with standardized props interface
- **Available Templates**: Four distinct professional resume layouts (Professional Dark, Modern Clean, Executive, Corporate)
- **Customization**: Real-time style adjustments including fonts, spacing, margins, and layout proportions
- **Data Structure**: Structured resume data with sections for bio, contact, experience, education, and skills

## Form Management
- **Sidebar Navigation**: Section-based form editing (bio, contact, experience, education, skills, styling)
- **Dynamic Lists**: Add/remove functionality for experience and education entries
- **Real-time Preview**: Live updates to resume preview as users edit form data
- **Validation**: Client-side and server-side validation using shared Zod schemas

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling and automatic scaling
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built components combining Radix UI with Tailwind styling

## Development Tools
- **Replit Plugins**: Development environment integration for runtime error handling and debugging
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

## Fonts and Assets
- **Google Fonts**: Inter, Architects Daughter, DM Sans, Fira Code, and Geist Mono for typography options
- **Unsplash**: Professional headshot images for resume template previews

## React Ecosystem
- **React Hook Form**: Form state management with validation
- **TanStack Query**: Data fetching, caching, and synchronization
- **Wouter**: Minimalist routing solution
- **date-fns**: Date manipulation and formatting utilities