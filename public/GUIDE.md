# PORTFOLIO SITE — GUIDE

## კოდის სტანდარტი
- კოდი სუფთა და პროფესიონალური სტილით.
- UI/ანიმაციები ძირითადად Tailwind კლასებით კომპონენტებში.
- `globals.css` გამოიყენება გლობალური სტილისთვის და ზოგადი keyframes-ებისთვის.

## Stack
Next.js 16 App Router · TypeScript · Tailwind CSS v4 · MongoDB Atlas (Database) · Cloudinary (Storage)

## გაშვება
```bash
npm.cmd run dev   # Windows (რეკომენდირებული)
npm run dev       # Mac/Linux
```
→ საიტი: http://localhost:3000  
→ ადმინ პანელი: http://localhost:3000/admin/login

## გარემოს ცვლადები (.env.local)
სისტემის სრულყოფილი მუშაობისთვის აუცილებელია შემდეგი ცვლადები:
```env
ADMIN_PASSWORD=kukuznaki99
ADMIN_SESSION_SECRET=your-random-secret
CLOUDINARY_CLOUD_NAME=dz8y3kd0y
CLOUDINARY_UPLOAD_PRESET=portfolio_unsigned
MONGODB_URI=mongodb+srv://admin:password@cluster...
```

## არქიტექტურა (CMS & Database)
1. **მონაცემთა ბაზა**: მონაცემები ინახება **MongoDB Atlas**-ზე (კოლექცია: `cms_data`). ეს უზრუნველყოფს ინფორმაციის მუდმივ შენახვას Vercel-ზეც.
2. **ადმინ პანელი** (`/admin`):
   - პროფილის ტექსტების, ფოტოს და ბმულების მართვა.
   - ნამუშევრების დამატება/რედაქტირება/წაშლა.
3. **ფაილების საცავი**: სურათები და ZIP ფაილები იტვირთება **Cloudinary**-ზე, ხოლო მათი ლინკები ინახება ბაზაში.

## მთავარი ფაილები
| ფაილი | დანიშნულება |
|-------|-------------|
| `src/app/layout.tsx` | გლობალური layout, ვიდეო ფონი, ფონტების რეზოლუცია და Tab Title ("Developer") |
| `src/lib/cms-store.ts` | MongoDB-სთან კავშირი და მონაცემების წაკითხვა/ჩაწერა |
| `src/components/admin-dashboard.tsx` | ადმინ პანელის მთავარი UI |
| `src/app/api/admin/upload/route.ts` | Cloudinary ატვირთვის ლოგიკა |
| `src/components/site-header.tsx` | ჰედერი, პროფილის modal, მუსიკის toggle |

## UI & UX თავისებურებები
- **Browser Tab Title**: ყველა გვერდზე ფიქსირებულია სათაური "Developer".
- **Welcome Modal**: საიტზე შესვლისას ჩნდება მისალმება, რომლის დახურვის შემდეგ იწყება მუსიკა.
- **Background Video**: ფონად გამოყენებულია `public/video.mp4` მუქი ფენით.
- **Language Switcher**: მხარდაჭერილია ქართული (KA) და ინგლისური (EN) ენები.

## მუსიკის უსაფრთხოება
- მუსიკალური ფაილი დაცულია `src/assets/music/music.mp3` ლოკაციაზე.
- სტრიმინგი ხდება `/api/music-stream` endpoint-ით `blob` ფორმატში, რაც ხელს უშლის ფაილის პირდაპირ გადმოწერას.

## ჰედერის კონტაქტები
- კონტაქტების ღილაკები (`Gmail`, `Facebook`, `Call`) იყენებენ ოპტიმიზირებულ აიქონებს `public/icon`-დან.
- Gmail compose URL გამოიყენება პირდაპირ წერილის მოსაწერად.

## Deploy (Vercel)
- პროექტი სრულად მზად არის Vercel-ზე მუშაობისთვის.
- **მნიშვნელოვანი**: MongoDB Atlas-ში აუცილებელია **Network Access**-ის გახსნა ყველა IP-სთვის (`0.0.0.0/0`), რათა Vercel-მა შეძლოს ბაზასთან დაკავშირება.
- ყველა გარემო ცვლადი (`.env.local`-დან) უნდა იყოს გაწერილი Vercel-ის Project Settings-ში.
