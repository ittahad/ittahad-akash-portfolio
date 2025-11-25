# Modern Portfolio Website

A stunning, modern portfolio website featuring dark theme, glassmorphism effects, vibrant gradients, and smooth animations.

## 🚀 Quick Start

### Local Development

```bash
# Serve locally
npx serve .
```

Visit `http://localhost:3000` to view the portfolio.

## 🔥 Firebase Deployment

### Prerequisites

1. **Firebase Account**: Create a free account at [firebase.google.com](https://firebase.google.com)
2. **Firebase Project**: Create a new project in the Firebase Console
3. **Node.js**: Ensure Node.js is installed on your system

### Deployment Steps

#### Option 1: Using PowerShell (Windows)

```powershell
# Run the deployment script
./deploy.ps1
```

#### Option 2: Using Bash (Linux/Mac)

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

#### Option 3: Manual Deployment

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (first time only)
firebase init hosting

# Deploy to Firebase
firebase deploy --only hosting
```

### Configuration

Before deploying, update `.firebaserc` with your Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

Or run:
```bash
firebase use --add
```

## 📁 Project Structure

```
modern-portfolio/
├── index.html          # Main HTML file
├── style.css           # Styles and design system
├── script.js           # Interactive features
├── firebase.json       # Firebase hosting configuration
├── .firebaserc         # Firebase project settings
├── deploy.ps1          # Windows deployment script
├── deploy.sh           # Linux/Mac deployment script
└── README.md           # This file
```

## ✨ Features

- 🎨 Modern dark theme with vibrant gradients
- ✨ Glassmorphism effects
- 🎭 Smooth scroll animations
- 📱 Fully responsive design
- ⚡ Dynamic typing effect
- 🎯 Scroll progress indicator
- 🔄 Parallax background effects
- 📊 Animated counters
- 🍔 Mobile hamburger menu

## 🛠️ Technologies

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript
- Google Fonts (Inter, Space Grotesk)
- Font Awesome Icons

## 📝 Sections

1. **Hero** - Dynamic introduction with typing effect
2. **About** - Professional bio, stats, certifications, publications
3. **Experience** - Timeline of work history
4. **Projects** - Showcase of featured projects
5. **Articles** - Published writings and blog posts
6. **Open Source** - GitHub repositories
7. **Contact** - Contact information and links

## 🌐 Custom Domain (Optional)

After deploying to Firebase, you can add a custom domain:

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the instructions to verify and connect your domain

## 📊 Firebase Hosting Features

- **Global CDN**: Fast loading worldwide
- **Free SSL**: Automatic HTTPS
- **Custom domains**: Connect your own domain
- **Rollback**: Easy version management
- **Analytics**: Built-in traffic insights

## 🔧 Customization

### Update Content

Edit `index.html` to update:
- Personal information
- Work experience
- Projects
- Articles
- Contact details

### Modify Design

Edit `style.css` to customize:
- Color scheme (CSS variables at top of file)
- Typography
- Spacing
- Animations

### Add Features

Edit `script.js` to add:
- New interactions
- Additional animations
- Custom functionality

## 📈 Performance

- Optimized CSS with minimal specificity
- Efficient JavaScript with Intersection Observer
- Lazy loading support
- Caching headers configured
- Clean URLs enabled

## 🤝 Support

For issues or questions:
- Email: contact@ittahad.site
- LinkedIn: [linkedin.com/in/ittahad](https://linkedin.com/in/ittahad)
- GitHub: [github.com/ittahad](https://github.com/ittahad)

## 📄 License

© 2025 Ittahad Uz Zaman. All rights reserved.

---

**Built with ❤️ using modern web technologies**
