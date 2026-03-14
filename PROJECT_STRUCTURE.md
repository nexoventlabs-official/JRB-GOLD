# JRB Gold - Organized Project Structure

## 📁 Directory Structure

```
jrb-gold-shine/
├── 📂 docs/                           # Documentation & Policy Files
│   ├── 📄 policies.md                 # Policy documentation
│   ├── 📄 Privacy Policy [JRB Gold].txt
│   ├── 📄 Terms & Conditions [JRB Gold].txt
│   ├── 📄 Shipping Policy [JRB Gold].txt
│   └── 📄 Cancellation & Refund [JRB Gold].txt
│
├── 📂 public/                         # Static Assets
│   ├── 🖼️ logo1.png                  # Main logo
│   ├── 🖼️ favicon.ico                # Browser favicon
│   ├── 🖼️ hero-jewelry.jpg           # Hero section image
│   ├── 🖼️ gold-collection.jpg        # Collection showcase
│   ├── 🖼️ craftsmanship.jpg          # Craftsmanship image
│   ├── 🖼️ product-*.jpg              # Product images
│   └── 📄 robots.txt                 # SEO robots file
│
├── 📂 src/                           # Source Code
│   ├── 📂 assets/                    # Local Assets (moved to public)
│   │
│   ├── 📂 components/                # React Components
│   │   ├── 📂 ui/                   # Shadcn UI Components
│   │   ├── 🧩 Header.tsx            # Navigation header
│   │   ├── 🧩 Footer.tsx            # Site footer
│   │   ├── 🧩 SearchBox.tsx         # Product search
│   │   ├── 🧩 FeaturedProducts.tsx  # Product showcase
│   │   ├── 🧩 Hero.tsx              # Hero section
│   │   ├── 🧩 Services.tsx          # Services section
│   │   ├── 🧩 Testimonials.tsx      # Customer reviews
│   │   ├── 🧩 PolicyLinks.tsx       # Policy navigation
│   │   ├── 🧩 PolicyModal.tsx       # Policy display modal
│   │   └── 🧩 theme-provider.tsx    # Theme context
│   │
│   ├── 📂 contexts/                 # React Contexts
│   │   └── 🏪 CartContext.tsx       # Shopping cart state
│   │
│   ├── 📂 hooks/                    # Custom React Hooks
│   │   ├── 📱 use-mobile.tsx        # Mobile detection
│   │   ├── 🔔 use-toast.ts          # Toast notifications
│   │   └── 📊 useGoldRates.ts       # Gold rates API
│   │
│   ├── 📂 pages/                    # Page Components
│   │   ├── 🏠 Home.tsx              # Homepage
│   │   ├── ℹ️ About.tsx             # About page
│   │   ├── 📞 Contact.tsx           # Contact page
│   │   └── 📂 account/              # User account pages
│   │       └── ⚙️ ProfileSettings.tsx
│   │
│   ├── 📂 types/                    # TypeScript Definitions
│   │   └── 📝 index.ts              # Global type definitions
│   │
│   ├── 📂 utils/                    # Utility Functions
│   │   └── 🔧 index.ts              # Helper functions
│   │
│   ├── 📂 constants/                # Application Constants
│   │   └── 📋 index.ts              # App configuration
│   │
│   ├── 📂 data/                     # Mock Data & Static Data
│   │   └── 📊 mockData.ts           # Development data
│   │
│   ├── 📂 lib/                      # External Library Configs
│   │   └── ⚙️ utils.ts              # Shadcn utilities
│   │
│   ├── 🎨 App.css                   # App-specific styles
│   ├── 🎨 index.css                 # Global styles
│   ├── 🏗️ App.tsx                   # Main app component
│   ├── 🚀 main.tsx                  # App entry point
│   ├── 🔧 vite-env.d.ts            # Vite type definitions
│   └── 🎨 styles.d.ts              # Style type definitions
│
├── 📂 .vscode/                      # VS Code Configuration
│   ├── ⚙️ settings.json             # Editor settings
│   └── 🔌 extensions.json          # Recommended extensions
│
├── 📄 .env                          # Environment variables
├── 📄 .env.example                  # Environment template
├── 📄 .gitignore                    # Git ignore rules
├── 📄 README.md                     # Project documentation
├── 📦 package.json                  # Dependencies & scripts
├── 🔒 package-lock.json             # Dependency lock file
├── 🎨 tailwind.config.ts            # Tailwind CSS config
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 tsconfig.app.json             # App TypeScript config
├── 📄 tsconfig.node.json            # Node TypeScript config
├── ⚡ vite.config.ts                # Vite build config
├── 🎨 postcss.config.js             # PostCSS config
├── 🔧 eslint.config.js              # ESLint configuration
└── 🧩 components.json               # Shadcn UI config
```

## 🏗️ Architecture Benefits

### ✅ **Organized Structure**
- **Separation of Concerns**: Clear separation between components, utilities, types, and data
- **Scalability**: Easy to add new features and maintain existing code
- **Developer Experience**: Intuitive file organization for team collaboration

### ✅ **Type Safety**
- **Global Types**: Centralized TypeScript definitions in `src/types/`
- **Utility Functions**: Typed helper functions in `src/utils/`
- **Constants**: Strongly typed configuration in `src/constants/`

### ✅ **Asset Management**
- **Public Assets**: Static files properly organized in `public/`
- **Documentation**: Policy files moved to dedicated `docs/` directory
- **Clean Root**: Reduced clutter in project root directory

### ✅ **Development Workflow**
- **Mock Data**: Centralized test data for development
- **Reusable Components**: Modular UI components
- **Custom Hooks**: Shared logic extraction
- **Context Management**: Centralized state management

## 🔄 Migration Summary

1. **Created new directories**: `types/`, `utils/`, `constants/`, `data/`
2. **Added type definitions**: Global TypeScript interfaces and types
3. **Organized utilities**: Helper functions and common utilities
4. **Centralized constants**: App configuration and constants
5. **Mock data structure**: Development and testing data
6. **Documentation**: Policy files organization and project structure docs

This structure follows React/TypeScript best practices and provides a solid foundation for scaling the JRB Gold e-commerce application.
