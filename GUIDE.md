# PORTFOLIO SITE — GUIDE

## კოდის სტანდარტი
- კოდი სუფთა და პროფესიონალური სტილით.
- UI/ანიმაციები ძირითადად Tailwind კლასებით კომპონენტებში.
- `globals.css` გამოიყენება გლობალური სტილისთვის და ზოგადი keyframes-ებისთვის.

## Stack
Next.js 16 App Router · TypeScript · Tailwind CSS v4 · JSON-based CMS · Cloudinary

## გაშვება
```bash
npm.cmd run dev   # Windows (რეკომენდირებული)
npm run dev       # Mac/Linux
```
→ საიტი: http://localhost:3000  
→ ადმინ პანელი: http://localhost:3000/admin/login

## გარემოს ცვლადები (.env.local)
სისტემამ სრულად რომ იმუშაოს (ადმინი + ატვირთვები), ლოკალურად გჭირდება `.env.local`:
```env
ADMIN_PASSWORD=567123
ADMIN_SESSION_SECRET=local-portfolio-admin-session-secret-change-this
CLOUDINARY_CLOUD_NAME=dz8y3kd0y
CLOUDINARY_UPLOAD_PRESET=portfolio_unsigned
```

## არქიტექტურა (CMS & Admin)
1. მონაცემები ინახება `data/cms.json`-ში (ფაილური CMS).
2. ადმინ პანელიდან (`/admin`) შესაძლებელია:
   - პროფილის ტექსტების, ფოტოს და ბმულების მართვა.
   - ნამუშევრების დამატება/რედაქტირება/წაშლა.
3. ფაილების ატვირთვა ხდება Cloudinary-ზე და URL ინახება JSON-ში.

## მთავარი ფაილები
| ფაილი | დანიშნულება |
|-------|-------------|
| `src/app/layout.tsx` | გლობალური layout + ვიდეო ფონი (`/video.mp4`) |
| `src/components/site-header.tsx` | ჰედერი, პროფილის modal, საკონტაქტო ღილაკები, მუსიკის toggle, კატეგორიების guide-trigger |
| `src/components/background-music.tsx` | Welcome modal + ფონური მუსიკის მართვა |
| `src/app/api/music-stream/route.ts` | მუსიკის private stream endpoint |
| `src/assets/music/music.mp3` | private მუსიკის ფაილი (public-დან გადმოტანილი) |
| `src/components/admin-dashboard.tsx` | ადმინ პანელის მთავარი UI |
| `src/lib/cms-store.ts` | CMS JSON წამკითხავი/ჩამწერი |
| `src/app/api/admin/upload/route.ts` | Cloudinary ატვირთვის ლოგიკა |
| `data/cms.json` | მთელი საიტის აქტიური კონტენტი |

## Routes
`/` → `/ka`  
`/[locale]` (მთავარი)  
`/[locale]/work`  
`/[locale]/about`  
`/[locale]/contact`  
`/admin`  
`/admin/login`

## მიმდინარე UI (რეალური მდგომარეობა)
- საიტზე შესვლისას ჩნდება Welcome modal; დახურვის შემდეგ იწყება მუსიკა.
- `/admin` როუტებზე მუსიკა და Welcome modal არ მუშაობს.
- ფონად დგას ვიდეო `public/video.mp4` მუქ overlay-თან ერთად.
- ჰედერში არის language switcher (`KA/EN`) და play/pause აიქონ-ღილაკი (`/public/icon/play-static.svg`, `/public/icon/pause-static.svg`).
- მთავარ გვერდზე 3 კატეგორიის ბარათია: Web / Android / Desktop.

## მუსიკის უსაფრთხოება (განახლებული)
- მუსიკა აღარ მოდის პირდაპირ `/public/music/music.mp3`-დან.
- ფაილი გადატანილია private ლოკაციაზე: `src/assets/music/music.mp3`.
- front-end იყენებს `/api/music-stream` endpoint-ს და აუდიო იტვირთება `blob`-ად მხოლოდ ჩართვისას.
- `preload="none"` გამოიყენება, რათა წინასწარი ჩამოტვირთვა არ მოხდეს.

## ჰედერის კონტაქტები (განახლებული)
- Profile modal-ის კონტაქტების იკონები ახლა მოდის `public/icon`-დან:
  - `gmail.png`
  - `facbook.png`
  - `call.png`
- იკონები გადიდებულია და გაძლიერებულია (`contrast/brightness`) უკეთესი მკაფიოობისთვის.
- მარჯვენა მხარეს `გახსნა` დარჩენილია იგივე სტილით (font-display).
- ტელეფონის ხაზზე ტექსტად ჩანს ნომერი (`profile.phone`) `ტელეფონი`-ს ნაცვლად.
- კონტაქტები `<a>`-ს ნაცვლად `<button>`-ზეა, ამიტომ ბრაუზერი ქვედა ზოლში `tel:`/`mailto:` preview-ს აღარ აჩვენებს.
- გახსნა ხდება JS-ით:
  - `mailto:` გარდაიქმნება Gmail compose URL-ად.
  - `http/https` იხსნება ახალ ტაბში.
  - `tel:` იხსნება `window.location.href`-ით (სისტემის მხარდაჭერის მიხედვით).

## ნავიგაცია და კატეგორიების ანიმაცია
- ჰედერში `პროექტები` ლინკი ჩადის `#categories` სექციაზე.
- კლიკზე კატეგორიების ბარათებს ედება `animate-wave` კლასი და მოძრაობა რესტარტდება იძულებით (`animation none + reflow`).
- Keyframes დევს `globals.css`-ში: `category-wave-rise`, `category-wave-fall`.

## პროფილის modal
- სათაური: `ჩემს შესახებ` (KA) / `About me` (EN)
- შიგნით ჩანს: ავატარი, სახელი, როლი, bio და კონტაქტების ბლოკი (ყველაფერი დინამიურად მოდის `data/cms.json`-დან).

## მიმდინარე კონტენტი (CMS)
- Email label ახლა არის `Gmail` (`data/cms.json`-ში განახლებულია).
- Profile links:
  - Gmail (`mailto:...`)
  - Facebook (https://...)
  - ტელეფონი (`tel:...`)

## Deploy (Vercel)
- პროექტი ისევ ფაილურ CMS-ზეა (`data/cms.json`), ამიტომ serverless გარემოში ფაილური ცვლილებები persistent არ არის.
- სტაბილური production admin-save-სთვის საჭიროა გარე DB (მაგ. Supabase/Postgres).
- Vercel-ზე environment variables უნდა გაიწეროს (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `CLOUDINARY_*`).
