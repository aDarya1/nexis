# 🚀 GitHub Pages Setup with GitHub Actions

## ✅ Workflow Added Successfully!

The GitHub Actions workflow has been pushed to your repository. Now you need to enable GitHub Pages.

## 📋 Step-by-Step Instructions

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository: **https://github.com/aDarya1/nexis-proj**
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - **Source**: `GitHub Actions` (NOT "Deploy from a branch")
5. Click **Save**

### Step 2: Verify Workflow Permissions

GitHub Pages with Actions requires specific permissions. The workflow file already has them configured:

- `contents: read`
- `pages: write`
- `id-token: write`

### Step 3: Trigger the Workflow

The workflow will automatically run when:

- You push to the `main` branch (already done ✅)
- You manually trigger it from the Actions tab

To manually trigger:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### Step 4: Check Deployment Status

1. Go to **Actions** tab
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-5 minutes)
4. Once green ✅, your site is live!

### Step 5: Access Your Site

Your site will be available at:
**https://aDarya1.github.io/nexis-proj/**

## 🔍 Monitoring Deployments

- **Actions tab**: See all workflow runs and their status
- **Settings → Pages**: See deployment history and status
- **Environment**: Check the `github-pages` environment status

## ⚙️ How It Works

1. **On every push to `main`**:
   - GitHub Actions automatically triggers
   - Installs dependencies (`npm ci`)
   - Builds the project (`npm run build`)
   - Deploys to GitHub Pages

2. **Build output**: The `dist/` folder is deployed

3. **Base path**: Configured as `/nexis-proj/` in `vite.config.ts`

## 🐛 Troubleshooting

### Workflow not running?

- Check if GitHub Pages is enabled with "GitHub Actions" as source
- Verify you're pushing to the `main` branch
- Check Actions tab for any errors

### Build fails?

- Check the Actions log for specific errors
- Verify `package.json` has correct scripts
- Ensure all dependencies are listed

### 404 errors on site?

- Verify `base: '/nexis-proj/'` in `vite.config.ts`
- Check that the build output is in `dist/` folder
- Wait a few minutes for DNS propagation

### Assets not loading?

- Ensure paths in code are relative, not absolute
- Check browser console for 404 errors
- Verify base path matches repository name

## 📝 Next Steps After Setup

1. ✅ Enable GitHub Pages (Settings → Pages → GitHub Actions)
2. ⏳ Wait for first deployment (2-5 minutes)
3. ✅ Visit your live site: https://aDarya1.github.io/nexis-proj/
4. 🎉 Every future push will auto-deploy!

## 🔄 Future Updates

After initial setup, every time you:

```bash
git add .
git commit -m "Your changes"
git push
```

The workflow will automatically:

- Build your project
- Deploy to GitHub Pages
- Update your live site

No manual steps needed! 🚀
