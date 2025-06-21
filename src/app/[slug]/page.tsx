import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const url = 'https://api.sujal.info/api/url/' + slug;
  console.log(url)
  redirect(url);
}
