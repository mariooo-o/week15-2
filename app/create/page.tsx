import Link from 'next/link';
import { createPost } from '@/app/actions';

export default function CreatePostPage() {
  return (
    <main className="container mt-4">
      <h1>Create Post</h1>
      <form action={createPost}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea name="content" rows={5} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>
        <Link href="/" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </main>
  );
}