import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { deletePost } from '@/app/actions';

async function PostContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(id)));

  if (!post) {
    notFound();
  }

  const deletePostWithId = deletePost.bind(null, post.id);

  return (
    <>
      <h1>{post.title}</h1>
      <p className="text-muted">
        {post.createdAt
          ? new Date(post.createdAt).toLocaleDateString('id-ID')
          : '-'}
      </p>
      <div className="mt-3">
        <p>{post.content}</p>
      </div>

      <div className="d-flex gap-2 mt-4">
        <Link href="/" className="btn btn-secondary">
          Back
        </Link>
        <Link href={`/edit/${post.id}`} className="btn btn-warning">
          Edit
        </Link>
        <form action={deletePostWithId}>
          <button type="submit" className="btn btn-danger">
            Delete
          </button>
        </form>
      </div>
    </>
  );
}

export default function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="container mt-4">
      <Suspense fallback={<p>Loading post...</p>}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}