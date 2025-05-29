# Portfolio Demo Template

A modern, responsive portfolio template built with Next.js 15, TypeScript, and TailwindCSS. This template has been converted from a personal portfolio to a generic template that you can easily customize.

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd portfolio-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🌐 Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Option 1: Automatic Deployment (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio-demo.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically run and deploy your site

3. **Access your live demo:**
   - Your site will be available at: `https://yourusername.github.io/portfolio-demo/`
   - The URL will be shown in the Actions tab after successful deployment

### Option 2: Manual Static Export

If you prefer manual deployment:

```bash
npm run build
```

This creates an `out` folder with static files that you can upload to any hosting service.

## 🎨 Customization

### Personal Information
Update the following files with your information:

- `app/components/HeroSection.tsx` - Name, roles, description
- `app/components/AboutSection.tsx` - About text, statistics, achievements
- `app/components/ExperienceSection.tsx` - Work experience
- `app/components/EducationSection.tsx` - Education background
- `app/components/ProjectsSection.tsx` - Your projects
- `app/components/SkillsSection.tsx` - Technical skills
- `app/components/ContactSection.tsx` - Contact information

### Styling
- Edit `app/globals.css` for global styles
- Modify TailwindCSS classes in components for design changes
- Update `tailwind.config.ts` for theme customization

### Configuration
- `next.config.ts` - Next.js configuration
- `package.json` - Project metadata and dependencies

## 📁 Project Structure

```
portfolio-demo/
├── app/
│   ├── components/          # React components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   └── ContactSection.tsx
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/                  # Static assets
├── utils/                   # Utility functions
├── .github/workflows/       # GitHub Actions
└── next.config.ts           # Next.js configuration
```

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **TailwindCSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Framer Motion** - Animation library (if needed)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⭐ Support

If you found this template helpful, please give it a star on GitHub! 
