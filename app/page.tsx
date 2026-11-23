import { Suspense } from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { posts as postsTable } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { deletePost } from '@/app/actions';

async function PostList() {
  const posts = await db
    .select()
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt));

  if (posts.length === 0) {
    return <p>No posts yet.</p>;
  }

  return (
    <ul className="list-group">
      {posts.map((post) => (
        <li
          key={post.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <Link href={`/post/${post.id}`} className="fw-bold text-decoration-none">
              {post.title}
            </Link>
            <small className="text-muted d-block">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString('id-ID')
                : '-'}
            </small>
          </div>
          <div className="d-flex gap-2">
            <Link href={`/edit/${post.id}`} className="btn btn-sm btn-warning">
              Edit
            </Link>
            <form action={deletePost.bind(null, post.id)}>
              <button type="submit" className="btn btn-sm btn-danger">
                Delete
              </button>
            </form>
          </div>
          <div className="d-flex gap-2">
            <Link href={`/edit/${post.id}`} className="btn btn-sm btn-warning">
              Edit
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="container mt-4">
      <h1>Blog Posts</h1>
      <Link href="/create" className="btn btn-primary mb-3">
        Create Post
      </Link>
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostList />
      </Suspense>
    </main>
  );
}