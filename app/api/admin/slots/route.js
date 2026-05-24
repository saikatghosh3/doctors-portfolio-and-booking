import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';
import { serializeDocs } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const url = new URL(req.url);
  const available = url.searchParams.get('available');
  const filter = available === 'true' ? { is_available: true } : {};

  const db = await getMongoDb();
  const slots = await db
    .collection('time_slots')
    .find(filter)
    .sort({ date: 1, time: 1 })
    .toArray();

  return NextResponse.json(serializeDocs(slots));
}

export async function POST(req) {
  const body = await req.json();
  const date = body?.date?.trim();
  const time = body?.time?.trim();

  if (!date || !time) {
    return NextResponse.json({ error: 'Date and time are required.' }, { status: 400 });
  }

  const db = await getMongoDb();
  const result = await db.collection('time_slots').insertOne({
    date,
    time,
    is_available: true,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ id: result.insertedId.toString(), date, time, is_available: true }, { status: 201 });
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const slotId = url.searchParams.get('id');

  if (!slotId) {
    return NextResponse.json({ error: 'Slot id is required.' }, { status: 400 });
  }

  const db = await getMongoDb();
  await db.collection('time_slots').deleteOne({ _id: new ObjectId(slotId) });

  return NextResponse.json({ success: true });
}
