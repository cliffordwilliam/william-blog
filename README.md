This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

# create nextjs app

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

# run app

```bash
npm run dev
```

# init shadcn

```bash
npx shadcn-ui@latest init
```

# try shadcn button

```bash
npx shadcn-ui@latest add button
```

# purge root page & try shadcn button

type like this to get auto import

`<Butto...`

# html, body, root 100% height

global.css

```css
html,
body,
:root {
  height: 100%;
}
```

# clerk

clerk.com

create acc

create app

google + mail

in dashboard go find api key and insert inthe the .env.local

```.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxx
CLERK_SECRET_KEY=xxx
```

npm i sdk

```bash
npm install @clerk/nextjs
```

provider

wrap root layout

```tsx
import { ClerkProvider } from "@clerk/nextjs";

return (
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  </ClerkProvider>
);
```

middleware - in src

protect all routes (NOT sign-in/out)

```tsx
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

# re arrange folder

- app
  - (auth)
    - (routes)
      - sign in/out pages
  - (dashboard)
    - (routes)
      - root page

create sign-in/out pages

https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#update-your-environment-variables

`/app/sign-in/[[...sign-in]]/page.tsx`

```tsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}
```

`/app/sign-up/[[...sign-up]]/page.[jsx/tsx]`

```tsx
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp />;
}
```

# userbutton

import and put in root for now for complete auth cycle

UserButton from clerk/nextjs

for auto completion

`<UserBu..`

```tsx
import { UserButton } from "@clerk/nextjs";

<UserButton afterSignOutUrl="/" />;
```

# layout auth to center clerks

create a layout sibling to routes to apply

# create a blog FE

https://ui.shadcn.com/docs/components/form

prepare a way for frontend to POST a blog - title only

the rest of blog detail you PATCH yourself

get shadcn

```bash
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
```

get axios

```bash
npm i axios
```

1. imports - "use client";

```tsx
import * as zod from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

2. formSchema

```tsx
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});
```

3. useForm hook

setting the useForm arg input as whatever it is the formSchema datatype is

in that hook you need to pass 2 obj:

- resolver -> use the zodResolver and pass the formSchema
- default -> values for the rows

```tsx
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { title: "" },
});
```

4. form states

```tsx
const { isSubmitting, isValid } = form.formState;
```

5. callback

```tsx
const onSubmit = (values: z.infer<typeof formSchema>) => {
  console.log(values);

  // try {
  //   const response = await axios.post("/api/blogs", values);
  //   router.push(`/writer/blogs/${response.data.id}`);
  //   toast.success("Blog post created successfully!");
  // } catch (error) {
  //   toast.error("Failed to create blog post. Please try again later.");
  }
};
```

6. render

it always look like this, spread and pass and adjust the fields, this one is particular is for a text input title

```tsx
<div className="h-full p-6 max-w-5xl mx-auto flex items-center justify-center">
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g 'Title'" {...field} />
            </FormControl>
            <FormDescription>This is your title.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
</div>
```

# react-hot-toast

```bash
npm i react-hot-toast
```

i want to import only once, then share it with all pages

to do this just create a provider - same as any regular pages

but include it in root layout

imagine it like a header, that has imports, so if header in root is everywhere so does its imports right

1. create provider

- components
  - providers
    - ToasterProvider.ts

same as page, just return the toaster

```tsx
import { Toaster } from "react-hot-toast";
```

# intermezzo

wtf is this? <z.infer<typeof formSchema>>

this will:

```tsx
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});
```

evaluates into a big fuk, i do not want to write an interface for it

my useForm needs to take that big fuk as an arg

```tsx
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { title: "" },
});
```

but this is ts i need to tell it what datatype the arg is right?

so i infer whatever typeof formSchema is to it

doing formSchema directly with typeof might not match the exact shape of formSchema

but whatever this works too, but then i guess its safer to be explicit

```tsx
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: { title: "" },
});
```

what about this?

```tsx
<Form {...form}>
```

thats just how u pass faster, same as this

```tsx
<Form resolver={form.resolver} defaultValues={form.defaultValues} />
```

# prisma

npm

```bash
npm i -D prisma
```

init

```bash
npx prisma init
```

new stuff added:

- schema
- .env landlord string

go here to rent free room

https://www.elephantsql.com/

login, create new instance, get the url

# update env

replcae the database url in env

btw, since .env is created by prisma, just del the .env.local and move everything to .env

# update schema.prisma

make sure to add prisma in the relationMode

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

# create db

npm

```bash
npm i @prisma/client
```

this allows us to talk to landlord db using prisma

create a client that can return you db

this will use the .env file that you set with the landlord string

- lib
  - db.ts

there are things to consider when making a client

you do not want to do this

```ts
export const db = new PrismaClient();
```

there is a `hot reload` -> everytime you save in development, a new prisma client is created -> overflow and crash development

we are using globalThis -> this obj is not affected by hot reload

the whole thing looks like this

```ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
```

declare global -> this thing will be available anywhere in my project

but why use var?

- compatibility, global scope is accessed everywhere so using var ensures older js can know
- thats how u declare global scope var - become part of the global obj
- hoisted - accessed even before declaration
- convention, everyone does it this way

basically, set db and export it, global exists? use it, no? make new one CLIENT

not inproduction? set global to const db just now

why do that?

we want to reassign the global to db NOT IN PROD - ensure that NOT IN PROD glob is always correct

it is a sure fire way to make sure that on every hot reload, NOT IN PROD will always have correct db set to global

# models

go schema.prisma

before making models install this extention in vscode to add syntax highlight -> prisma extention

the plan here is that 1 tag can have many blog
and 1 blog can have many attachment

lets create category model

```prisma
model Tag {
  id String @id @default(uuid())
  name String @unique
  blogs Blog[]
}

model Blog {
  id String @id @default(uuid())
  userId String
  title String
  imageUrl String? @db.Text
  content String? @db.Text
  isPublished Boolean @default(false)
  tagId String?
  tag Tag? @relation(fields:[tagId],references:[id])
  attachments Attachment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Attachment {
  id String @id @default(uuid())
  url String @de.Text
  name String
  blogId String
  blog Blog @relation(fields:[blogId],references:[id],onDelete:Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([blogId])
}
```

blog being the owners of attachments. and the thing that connects them is the field and ref

@relation is to be written at the thing being owned

the field is the thing that determine connection from the thing being owned

while the ref is the thing that determines connection from the owner?

@@index([blogId]) -> makes FK faster but adds mem overhead

ok if done - can edit later btw no prob

edit schema?

locally add

```bash
npx prisma generate
```

- npx prisma generate -> model added to db.ts -> db.course is possible autocompletion

- regenerate the Prisma Client -> code has access to the latest schema

push to landlord

```bash
npx prisma db push
```

- npx prisma db push

# make the api routes

POST `api/blogs`

routes are in

- app
  - api
    - blogs

basic route POST

```ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { title } = await req.json();
    const blog = await db.blog.create({ data: { userId, title } });
    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOGS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
```

log error with square bracket to add label to the log

post ok? how do i see my tables? in prisma?

```bash
npx prisma studio
```
