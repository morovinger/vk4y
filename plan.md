# Plan: Custom Domain (vk4y.ru) + Yandex Metrika + SEO Migration

## 1. Cheapest Russian Domain Registrars

| Registrar | Registration .ru | Renewal .ru | Notes |
|-----------|------------------|-------------|-------|
| **[REG.RU](https://reg.ru)** | 119-189 ₽/year | 600 ₽/year | Largest Russian registrar, free SSL, frequent promos |
| **[Webnames.ru](https://webnames.ru)** | ~200 ₽/year | ~500 ₽/year | Good reputation |
| **[Domenus.ru](https://domenus.ru)** | ~150 ₽/year | ~500 ₽/year | Budget option |
| **[RF.RU](https://rf.ru)** | ~180 ₽/year | ~550 ₽/year | Part of RU-CENTER |

**Recommendation:** REG.RU - best balance of price, features, and reliability. Often has 119₽ promotions.

---

## 2. Domain Setup Steps

### Step 1: Register vk4y.ru
1. Go to [reg.ru](https://reg.ru)
2. Search for `vk4y.ru`
3. Register (need passport data for .ru zone)
4. Get free SSL certificate (included)

### Step 2: Configure DNS for GitHub Pages
Add these DNS records at your registrar:

```
Type: A
Name: @
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153

Type: CNAME
Name: www
Value: morovinger.github.io
```

### Step 3: Configure GitHub Pages
1. Go to repo Settings > Pages
2. Add custom domain: `vk4y.ru`
3. Enable "Enforce HTTPS" (wait for certificate)
4. Create `CNAME` file in repo root with content: `vk4y.ru`

---

## 3. SEO Migration (Preserve Google Rankings)

### The Problem
GitHub Pages doesn't support server-side 301 redirects. However, there's a workaround!

### The Solution: GitHub's Built-in Redirect
When you add a custom domain to GitHub Pages, GitHub automatically sets up a **301 redirect** from `morovinger.github.io/vk4y/` to your custom domain `vk4y.ru`.

### Google Search Console Migration Steps

1. **Add new property in Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property: `https://vk4y.ru`
   - Verify via DNS TXT record or HTML file

2. **Wait for GitHub redirect to activate**
   - After adding custom domain, GitHub creates 301 redirect
   - Test: `curl -I https://morovinger.github.io/vk4y/` should show 301

3. **Use Change of Address Tool**
   - In Search Console, go to old property settings
   - Click "Change of Address"
   - Select new domain (vk4y.ru)
   - Google will start transferring rankings

4. **Timeline**
   - Initial transfer: 2-4 weeks
   - Full migration: 3-6 months
   - Keep old domain active: minimum 1 year

### Important Notes
- GitHub handles the 301 redirect automatically when custom domain is set
- Google recommends keeping redirects for at least 6 months
- Don't remove the GitHub Pages custom domain setting

---

## 4. Yandex Metrika Integration

### Step 1: Create Counter
1. Go to [metrika.yandex.ru](https://metrika.yandex.ru)
2. Create new counter for `vk4y.ru`
3. Get counter ID (e.g., `12345678`)

### Step 2: Install Nuxt Module
```bash
npm install @artmizu/yandex-metrika-nuxt
```

### Step 3: Configure nuxt.config.ts
```typescript
modules: [
  // ... existing modules
  '@artmizu/yandex-metrika-nuxt'
],

yandexMetrika: {
  id: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID,
  options: {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  }
}
```

### Step 4: Add Environment Variable
In `.env`:
```
NUXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

In GitHub Actions (`.github/workflows/deploy.yml`):
```yaml
- name: Generate static site
  run: npm run generate
  env:
    NUXT_PUBLIC_VK_APP_ID: ${{ vars.VK_APP_ID || '6656971' }}
    NUXT_PUBLIC_YANDEX_METRIKA_ID: ${{ vars.YANDEX_METRIKA_ID }}
```

---

## 5. Code Changes Required

### Files to Update:
1. **nuxt.config.ts** - Update site URL, add Yandex Metrika
2. **public/CNAME** - Create with `vk4y.ru`
3. **.github/workflows/deploy.yml** - Add Yandex Metrika env var
4. **package.json** - Add Yandex Metrika package
5. **.env.example** - Add Yandex Metrika ID

### Update nuxt.config.ts site URL:
```typescript
site: {
  url: 'https://vk4y.ru',
  // ...
}

app: {
  baseURL: '/', // Change from '/vk4y/'
  // ...
}
```

### Update meta tags:
- Change all `morovinger.github.io/vk4y/` references to `vk4y.ru`
- Update canonical URLs
- Update OG image URLs

---

## 6. Migration Checklist

- [ ] Register vk4y.ru domain
- [ ] Configure DNS records
- [ ] Add custom domain in GitHub Pages settings
- [ ] Create CNAME file in repo
- [ ] Verify HTTPS works on vk4y.ru
- [ ] Add vk4y.ru to Google Search Console
- [ ] Verify ownership via DNS
- [ ] Use Change of Address tool
- [ ] Create Yandex Metrika counter
- [ ] Install Yandex Metrika Nuxt module
- [ ] Update nuxt.config.ts URLs
- [ ] Update baseURL from '/vk4y/' to '/'
- [ ] Add Yandex Metrika env vars to GitHub Actions
- [ ] Deploy and test
- [ ] Submit new sitemap to Google & Yandex
- [ ] Monitor rankings for 3-6 months

---

## Sources
- [Google Change of Address Tool](https://support.google.com/webmasters/answer/9370220)
- [GitHub Pages 301 Redirect Trick](https://github.com/orgs/community/discussions/22407)
- [Site Migration Guide](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [REG.RU Pricing](https://help.reg.ru/support/domains/prodleniye-domena/kak-uznat-stoimost-prodleniya-domena)
- [Yandex Metrika Nuxt Module](https://github.com/nuxt-community/yandex-metrika-module)
