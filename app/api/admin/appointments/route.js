import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/mongodb';
import { serializeDocs } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await getMongoDb();
  const appointments = await db
    .collection('appointments')
    .find({})
    .sort({ created_at: -1 })
    .toArray();

  return NextResponse.json(serializeDocs(appointments));
}
