'use server';

import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// CREATE
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await db.insert(posts).values({
    title,
    content,
    createdAt: new Date().toISOString(),
  });

  revalidatePath('/');
  redirect('/');
}

// UPDATE
export async function updatePost(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await db
    .update(posts)
    .set({ title, content })
    .where(eq(posts.id, id));

  revalidatePath('/');
  revalidatePath(`/post/${id}`);
  redirect(`/post/${id}`);
}

// DELETE
export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath('/');
  redirect('/');
}