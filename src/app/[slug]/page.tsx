import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const slug = (await params).slug;
  const url = api + '/api/url/' + slug;
  console.log(url)
  redirect(url);
}
