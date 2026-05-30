# UBH Center Smart Building System

UBH Center-ийн давхарын лавлах, Groq AI туслах, үйлчилгээний хүсэлт, админ хяналтын самбарыг нэгтгэсэн ухаалаг барилгын систем.

## Технологи

- Next.js 14 App Router
- Tailwind CSS
- Framer Motion
- Next.js API Routes
- MySQL + Prisma ORM
- Groq API (`llama3-70b-8192`)
- Recharts
- JWT authentication

## Суулгах

```bash
npm install
npx prisma generate
```

## `.env` тохируулах

`.env.example` файлыг `.env` болгон хуулна.

```bash
cp .env.example .env
```

Жишээ:

```env
GROQ_API_KEY=your_groq_key
GROQ_MODEL="llama-3.3-70b-versatile"
DATABASE_URL="mysql://root:Azzaya0707%401@localhost:3306/ubhcenter"
JWT_SECRET="your_secret"
```

`@` тэмдэгтэй MySQL password ашиглавал URL дотор `%40` гэж encode хийнэ.

## Groq API key авах

1. [Groq Console](https://console.groq.com/) руу орно.
2. API Keys хэсгээс шинэ key үүсгэнэ.
3. `GROQ_API_KEY` дээр оруулна.
4. `GROQ_MODEL` утгыг `llama-3.3-70b-versatile` гэж ашиглана.

## Өгөгдлийн сан

```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

Seed админ:

- Имэйл: `azzayabayartai07@gmail.com`
- Нууц үг: `Azzaya0707@1`

## Ажиллуулах

```bash
npm run dev
```

Нээх хаяг: [http://localhost:3000](http://localhost:3000)

## Үндсэн хуудсууд

- `/` Нүүр хуудас
- `/floors` Давхарын лавлах
- `/company/[id]` Компанийн мэдээлэл
- `/request` Үйлчилгээний хүсэлт
- `/admin` Админ нэвтрэлт
- `/admin/dashboard` Админ dashboard

## API

- `GET /api/companies`
- `POST /api/companies`
- `GET /api/companies/:id`
- `PUT /api/companies/:id`
- `DELETE /api/companies/:id`
- `GET /api/requests`
- `POST /api/requests`
- `PATCH /api/requests/:id`
- `POST /api/auth`
- `POST /api/chat`
