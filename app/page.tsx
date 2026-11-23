import Link from 'next/link';
import { db } from '@/db';
import { posts as postsTable } from '@/db/schema';
import { desc } from 'drizzle-orm';

async function getPosts() {
  return await db
    .select()
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt));
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mt-4">
      <h1>Blog Posts</h1>
      <Link href="/create" className="btn btn-primary mb-3">
        Create Post
      </Link>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item">
              <Link href={`/post/${post.id}`}>
                {post.title}
              </Link>
              <span className="text-muted float-end">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString('id-ID')
                  : '-'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}