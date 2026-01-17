# Deployment Instructions for GitHub Pages

## ✅ Code Successfully Pushed to GitHub

Your code has been pushed to: https://github.com/aDarya1/nexis-proj.git

## 🔒 Security Note

**IMPORTANT**: The GitHub token used for pushing has been used only in the command line and is NOT stored in the repository. However, for security:

1. **Revoke the current token** and create a new one if needed:
   - Go to: https://github.com/settings/tokens
   - Revoke any tokens that were used for initial push

2. **For future pushes**, use one of these secure methods:
   - Use GitHub CLI: `gh auth login`
   - Use SSH keys
   - Use credential helper: `git config --global credential.helper store`

## 📦 Setting Up GitHub Pages

### Option 1: Manual Setup (Recommended for first time)

1. Go to your repository: https://github.com/aDarya1/nexis-proj
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)` or `/docs` (if you want to use docs folder)
4. Click **Save**
5. Your site will be available at: `https://aDarya1.github.io/nexis-proj/`

### Option 2: Using GitHub Actions (Automated)

After enabling GitHub Pages manually once:

1. Create a new Personal Access Token with `workflow` scope:
   - Go to: https://github.com/settings/tokens/new
   - Check: `workflow` scope
   - Generate token

2. Add the workflow file back:

   ```bash
   # The workflow file is already created at .github/workflows/deploy.yml
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment workflow"
   git push
   ```

3. The workflow will automatically deploy on every push to `main` branch.

## 🔧 Build Configuration

The project is configured for GitHub Pages:

- **Base path**: `/nexis-proj/` (set in `vite.config.ts`)
- **Build output**: `dist/` folder
- **Build command**: `npm run build`

## 🚀 Local Testing

Before deploying, test the build locally:

```bash
npm run build
npm run preview  # or serve the dist folder
```

## 📝 Next Steps

1. ✅ Code is pushed to GitHub
2. ⏳ Enable GitHub Pages in repository settings
3. ⏳ Wait for deployment (may take a few minutes)
4. ⏳ Visit: https://aDarya1.github.io/nexis-proj/

## 🐛 Troubleshooting

- **404 errors**: Make sure `base: '/nexis-proj/'` is set in `vite.config.ts`
- **Assets not loading**: Check that paths are relative, not absolute
- **Build fails**: Run `npm install` and `npm run build` locally to check for errors
