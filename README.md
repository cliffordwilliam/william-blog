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
