import Image from 'next/image';
import {getReview, getSlugs} from "@/lib/reviews";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  return {
    title: review.title,
  };
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);

  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-center pb-2">
        <p className="italic">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image src={review.image} alt="" priority width="640" height="360" className="mb-2 rounded" />
      <article dangerouslySetInnerHTML={{ __html: review.body }} className="max-w-screen-sm prose prose-slate" />
    </>
  );
}
