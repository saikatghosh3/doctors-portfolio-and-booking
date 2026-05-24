import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const username = body?.username?.trim();
    const password = body?.password?.trim();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }

    const db = await getMongoDb();
    const admins = db.collection('admin');
    const existingAdmin = await admins.findOne({ username });

    if (existingAdmin) {
      return NextResponse.json({ error: 'Admin account already exists.' }, { status: 409 });
    }

    const result = await admins.insertOne({ username, password });
    return NextResponse.json({ id: result.insertedId.toString(), username }, { status: 201 });
  } catch (err) {
    console.error('Setup route error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
