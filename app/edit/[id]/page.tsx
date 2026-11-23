import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { updatePost } from '@/app/actions'; // sesuaikan jika di '@/app/actions'

async function EditForm({
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

  const updatePostWithId = updatePost.bind(null, post.id);

  return (
    <form action={updatePostWithId}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          name="content"
          rows={5}
          defaultValue={post.content}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">
        Update
      </button>
      <Link href={`/post/${post.id}`} className="btn btn-secondary">
        Cancel
      </Link>
    </form>
  );
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="container mt-4">
      <h1>Edit Post</h1>
      <Suspense fallback={<p>Loading form...</p>}>
        <EditForm params={params} />
      </Suspense>
    </main>
  );
}