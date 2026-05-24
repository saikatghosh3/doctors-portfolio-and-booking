import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';
import { serializeDoc } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const appointmentId = params?.id;
  if (!appointmentId) {
    return NextResponse.json({ error: 'Appointment ID is required.' }, { status: 400 });
  }

  const db = await getMongoDb();
  const appointment = await db.collection('appointments').findOne({ _id: new ObjectId(appointmentId) });
  const invoice = await db.collection('invoices').findOne({ appointment_id: appointmentId });

  if (!appointment || !invoice) {
    return NextResponse.json({ error: 'Invoice not found.' }, { status: 404 });
  }

  return NextResponse.json({ appointment: serializeDoc(appointment), invoice: serializeDoc(invoice) });
}
